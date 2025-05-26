import React, { useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCartActions } from "@/lib/atoms/cart";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

function CartView() {
  const { cart, initializeCart, updateItem, removeItem } = useCartActions();

  useEffect(() => {
    if (!cart?.id) {
      initializeCart();
    }
  }, [cart?.id, initializeCart]);

  const totalItems = cart?.lines.edges.length || 0;
  const subtotal = cart?.cost.subtotalAmount.amount || "0.00";
  const totalAmount = cart?.cost?.totalAmount.amount || "0.00";
  const totalTax = cart?.cost?.totalTaxAmount?.amount || "0.00";
  const currency = cart?.cost?.subtotalAmount?.currencyCode || "INR";
  const cartItems = cart?.lines?.edges || [];

  const handleQuantityChange = async (
    merchandiseId: string,
    newQuantity: number
  ) => {
    if (newQuantity < 0) return;
    try {
      await updateItem(merchandiseId, newQuantity);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleRemoveItem = async (merchandiseId: string) => {
    try {
      await removeItem(merchandiseId);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const formatPrice = (amount: string) => {
    const numAmount = parseFloat(amount);
    return numAmount.toFixed(2);
  };

  return (
    <div className="relative">
      <Sheet>
        <SheetTrigger asChild>
          <div className="relative">
            <Button variant="ghost" className="relative">
              <ShoppingCart className="h-10 w-10" />
              {cart?.lines.edges.length > 0 && (
                <Badge variant="default" className="absolute -top-2 right-0">
                  {cart.lines.edges.length}
                </Badge>
              )}
            </Button>
          </div>
        </SheetTrigger>

        <SheetContent className="w-full sm:max-w-lg flex flex-col">
          <SheetHeader className="pb-4">
            <SheetTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Shopping Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
            </SheetTitle>
            <SheetDescription>
              Review your items and proceed to checkout
            </SheetDescription>
          </SheetHeader>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-500">
                  Add some products to get started
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => {
                  const product = item.node.merchandise.product;
                  const variant = item.node.merchandise;
                  const quantity = item.node.quantity;
                  const unitPrice = variant.price.amount;
                  const lineTotal =
                    item.node.cost?.totalAmount?.amount ||
                    (parseFloat(unitPrice) * quantity).toFixed(2);
                  const imageUrl = product.images.edges[0]?.node?.url;

                  return (
                    <div
                      key={item.node.id}
                      className="flex gap-4 p-4 border rounded-lg bg-white shadow-sm"
                    >
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={product.title}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <ShoppingCart className="h-6 w-6" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate mb-1">
                          {product.title}
                        </h4>
                        <p className="text-xs text-gray-500 mb-1">
                          {product.vendor}
                        </p>

                        {/* Unit Price */}
                        <p className="text-xs text-gray-600 mb-2">
                          {currency} {formatPrice(unitPrice)} each
                        </p>

                        {/* Variant Options */}
                        {variant.selectedOptions &&
                          Array.isArray(variant.selectedOptions) &&
                          variant.selectedOptions.map((option) => (
                            <p
                              key={option.name}
                              className="text-xs text-gray-500"
                            >
                              {option.name}: {option.value}
                            </p>
                          ))}

                        <div className="flex items-center justify-between mt-3">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                handleQuantityChange(variant.id, quantity + 1)
                              }
                              disabled={quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>

                            <span className="w-8 text-center text-sm font-medium">
                              {quantity}
                            </span>

                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                handleQuantityChange(variant.id, quantity + 1)
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* Price and Remove */}
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">
                              {currency} {formatPrice(lineTotal)}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-500 hover:text-red-700"
                              onClick={() => handleRemoveItem(variant.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Cart Summary and Checkout */}
          {cartItems.length > 0 && (
            <div className="border-t pt-4 mt-4 space-y-4 bg-gray-50 -mx-6 px-6 pb-6">
              {/* Order Summary */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>
                    {currency} {formatPrice(subtotal)}
                  </span>
                </div>

                {parseFloat(totalTax) > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>
                      {currency} {formatPrice(totalTax)}
                    </span>
                  </div>
                )}

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>
                    {currency} {formatPrice(totalAmount)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button
                  className="w-full h-12 text-base font-medium"
                  onClick={() => {
                    if (cart?.checkoutUrl) {
                      window.open(cart.checkoutUrl, "_blank");
                    }
                  }}
                  disabled={!cart?.checkoutUrl}
                >
                  Proceed to Checkout
                </Button>

                <Button variant="outline" className="w-full h-10">
                  Continue Shopping
                </Button>
              </div>

              {/* Cart ID for debugging (remove in production) */}
              {process.env.NODE_ENV === "development" && cart?.id && (
                <p className="text-xs text-gray-400 text-center">
                  Cart ID: {cart.id.split("/").pop()}
                </p>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default CartView;
