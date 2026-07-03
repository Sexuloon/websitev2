"use client";

import { atom, useAtom } from "jotai";
import { fetchGraphQL } from "@/shopify/client";
import {
  ADD_TO_CART,
  UPDATE_CART_ITEMS,
  REMOVE_FROM_CART,
  GET_CART,
  CREATE_CART,
} from "@/graphql/cart";
import { CartLineInput, CartLineUpdateInput } from "@/types/shopify-graphql";

// ─── Types ──────────────────────────────────────────────────────────────────

type PackVariantNode = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: { amount: string; currencyCode: string };
  compareAtPrice?: { amount: string; currencyCode: string } | null;
  selectedOptions: Array<{ name: string; value: string }>;
};

export type CartState = {
  id: string;
  checkoutUrl: string;
  note: string;
  cost: {
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalTaxAmount: {
      amount: string;
      currencyCode: string;
    } | null;
  };
  lines: {
    edges: Array<{
      node: {
        cost: {
          totalAmount: {
            amount: string;
            currencyCode: string;
          };
        };
        id: string;
        quantity: number;
        merchandise: {
          selectedOptions: Array<{ name: string; value: string }>;
          id: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          compareAtPrice?: {
            amount: string;
            currencyCode: string;
          } | null;
          title: string;
          product: {
            description: string;
            id: string;
            title: string;
            vendor: string;
            handle: string;
            images: {
              edges: Array<{
                node: {
                  url: string;
                  altText: string;
                  height: number;
                  width: number;
                };
              }>;
            };
            variants: {
              edges: Array<{
                node: PackVariantNode;
              }>;
            };
          };
        };
      };
    }>;
  };
  totalQuantity: number;
};

// ─── Atoms ──────────────────────────────────────────────────────────────────

const initialCartState: CartState = {
  id: "",
  checkoutUrl: "",
  note: "",
  cost: {
    subtotalAmount: { amount: "0.0", currencyCode: "XXX" },
    totalAmount: { amount: "0.0", currencyCode: "XXX" },
    totalTaxAmount: null,
  },
  lines: { edges: [] },
  totalQuantity: 0,
};

const cartAtom = atom<CartState>(initialCartState);

/** Controls whether the cart drawer is open. Set to true to open it from anywhere. */
export const cartDrawerOpenAtom = atom<boolean>(false);

/** True while a brand-new item (not yet in cart) is being added via the API. */
export const cartDrawerLoadingAtom = atom<boolean>(false);

// ─── Helpers ────────────────────────────────────────────────────────────────

function calculateLineItemCost(
  price: number,
  quantity: number,
  currencyCode: string
) {
  return {
    amount: (price * quantity).toFixed(2),
    currencyCode,
  };
}

function calculateCartTotals(lines: CartState["lines"]) {
  let subtotal = 0;
  let totalQuantity = 0;
  const currencyCode =
    lines.edges[0]?.node.merchandise.price.currencyCode || "USD";

  const updatedEdges = lines.edges.map(({ node }) => {
    const price = parseFloat(node.merchandise.price.amount);
    const quantity = node.quantity;
    subtotal += price * quantity;
    totalQuantity += quantity;
    return {
      node: {
        ...node,
        cost: {
          totalAmount: calculateLineItemCost(
            price,
            quantity,
            node.merchandise.price.currencyCode
          ),
        },
      },
    };
  });

  return {
    subtotalAmount: { amount: subtotal.toFixed(2), currencyCode },
    totalAmount: { amount: subtotal.toFixed(2), currencyCode },
    totalTaxAmount: null,
    totalQuantity,
    updatedEdges,
  };
}

// ─── API Helpers ────────────────────────────────────────────────────────────

async function addToCart(cartId: string, lines: CartLineInput[]) {
  try {
    await fetchGraphQL(ADD_TO_CART, { cartId, lines });
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
}

async function updateCartItems(cartId: string, lines: CartLineUpdateInput[]) {
  try {
    await fetchGraphQL(UPDATE_CART_ITEMS, { cartId, lines });
  } catch (error) {
    console.error("Error updating cart items:", error);
  }
}

async function removeFromCart(cartId: string, lineIds: string[]) {
  try {
    await fetchGraphQL(REMOVE_FROM_CART, { cartId, lineIds });
  } catch (error) {
    console.error("Error removing from cart:", error);
  }
}

async function createCart() {
  try {
    const response = await fetchGraphQL(CREATE_CART, { lineItems: [] });
    return response.cartCreate.cart;
  } catch (error) {
    console.error("Error creating cart:", error);
    throw error;
  }
}

// ─── Hook ───────────────────────────────────────────────────────────────────

export const useCartActions = () => {
  const [cart, setCart] = useAtom(cartAtom);
  const [, setCartDrawerOpen] = useAtom(cartDrawerOpenAtom);
  const [, setCartDrawerLoading] = useAtom(cartDrawerLoadingAtom);

  const addItem = async (merchandiseId: string, quantity: number) => {
    // Auto-open the cart drawer the instant an item is added
    setCartDrawerOpen(true);

    const existingLineItem = cart.lines.edges.findIndex(
      (edge) => edge.node.merchandise.id === merchandiseId
    );

    if (existingLineItem >= 0) {
      // Existing item — optimistic update, instant UI
      const existingLine = cart.lines.edges[existingLineItem];
      const updatedEdges = cart.lines.edges.map((edge, index) =>
        index === existingLineItem
          ? {
              ...edge,
              node: {
                ...edge.node,
                quantity: edge.node.quantity + quantity,
              },
            }
          : edge
      );

      await updateCartItems(cart.id, [
        {
          id: existingLine.node.id,
          quantity: existingLine.node.quantity + quantity,
        },
      ]);

      const {
        subtotalAmount,
        totalAmount,
        totalTaxAmount,
        totalQuantity,
        updatedEdges: edgesWithCost,
      } = calculateCartTotals({ edges: updatedEdges });

      setCart({
        ...cart,
        lines: { edges: edgesWithCost },
        cost: { subtotalAmount, totalAmount, totalTaxAmount },
        totalQuantity,
      });
    } else {
      // Brand-new item — show loading state while round-tripping Shopify
      setCartDrawerLoading(true);
      try {
        await addToCart(cart.id, [{ merchandiseId, quantity }]);
        const { cart: updatedCart } = await fetchGraphQL(GET_CART, {
          cartId: cart.id,
        });
        if (updatedCart) setCart(updatedCart);
      } catch (err) {
        console.error("Error adding new item to cart:", err);
      } finally {
        setCartDrawerLoading(false);
      }
    }
  };

  const updateItem = async (merchandiseId: string, quantity: number) => {
    if (quantity <= 0) {
      const lineToRemove = cart.lines.edges.find(
        (edge) => edge.node.merchandise.id === merchandiseId
      );
      if (lineToRemove) {
        const updatedEdges = cart.lines.edges.filter(
          (edge) => edge.node.merchandise.id !== merchandiseId
        );
        await removeFromCart(cart.id, [lineToRemove.node.id]);

        const {
          subtotalAmount,
          totalAmount,
          totalTaxAmount,
          totalQuantity,
          updatedEdges: edgesWithCost,
        } = calculateCartTotals({ edges: updatedEdges });

        setCart({
          ...cart,
          lines: { edges: edgesWithCost },
          cost: { subtotalAmount, totalAmount, totalTaxAmount },
          totalQuantity,
        });
      }
      return;
    }

    const lineToUpdate = cart.lines.edges.find(
      (edge) => edge.node.merchandise.id === merchandiseId
    );
    if (lineToUpdate) {
      const updatedEdges = cart.lines.edges.map((edge) =>
        edge.node.merchandise.id === merchandiseId
          ? { ...edge, node: { ...edge.node, quantity } }
          : edge
      );

      await updateCartItems(cart.id, [{ id: lineToUpdate.node.id, quantity }]);

      const {
        subtotalAmount,
        totalAmount,
        totalTaxAmount,
        totalQuantity,
        updatedEdges: edgesWithCost,
      } = calculateCartTotals({ edges: updatedEdges });

      setCart({
        ...cart,
        lines: { edges: edgesWithCost },
        cost: { subtotalAmount, totalAmount, totalTaxAmount },
        totalQuantity,
      });
    }
  };

  const removeItem = async (merchandiseId: string) => {
    const lineToRemove = cart.lines.edges.find(
      (edge) => edge.node.merchandise.id === merchandiseId
    );
    if (lineToRemove) {
      const updatedEdges = cart.lines.edges.filter(
        (edge) => edge.node.merchandise.id !== merchandiseId
      );
      await removeFromCart(cart.id, [lineToRemove.node.id]);

      const {
        subtotalAmount,
        totalAmount,
        totalTaxAmount,
        totalQuantity,
        updatedEdges: edgesWithCost,
      } = calculateCartTotals({ edges: updatedEdges });

      setCart({
        ...cart,
        lines: { edges: edgesWithCost },
        cost: { subtotalAmount, totalAmount, totalTaxAmount },
        totalQuantity,
      });
    }
  };

  /**
   * Swaps the variant of a cart line item (e.g. 1-pack → 3-pack).
   * Removes the existing line and re-adds with the new variant, same quantity.
   */
  const swapVariant = async (
    oldMerchandiseId: string,
    newMerchandiseId: string
  ) => {
    const lineToReplace = cart.lines.edges.find(
      (edge) => edge.node.merchandise.id === oldMerchandiseId
    );
    if (!lineToReplace) return;

    const quantity = lineToReplace.node.quantity;

    // Remove old line, then add the new variant
    await removeFromCart(cart.id, [lineToReplace.node.id]);
    await addToCart(cart.id, [{ merchandiseId: newMerchandiseId, quantity }]);

    // Refetch full cart so we get accurate variant data / prices from Shopify
    const { cart: updatedCart } = await fetchGraphQL(GET_CART, {
      cartId: cart.id,
    });
    setCart(updatedCart);
  };

  const initializeCart = async () => {
    try {
      let cartId = localStorage.getItem("cartId");
      if (!cartId) {
        const newCart = await createCart();
        cartId = newCart.id;
        if (cartId) localStorage.setItem("cartId", cartId);
      }
      const { cart: fetchedCart } = await fetchGraphQL(GET_CART, { cartId });
      setCart(fetchedCart);
    } catch (error) {
      console.error("Error initializing cart:", error);
    }
  };

  return {
    cart,
    addItem,
    updateItem,
    removeItem,
    swapVariant,
    initializeCart,
  };
};
