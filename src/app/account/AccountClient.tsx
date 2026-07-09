"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User, Package, MapPin, LogOut, ChevronRight,
  ShoppingBag, Clock, CheckCircle, XCircle, Truck, AlertCircle,
  ArrowLeft
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Order {
  id: string;
  name: string;
  orderNumber: number;
  processedAt: string;
  fulfillmentStatus: string;
  financialStatus: string;
  currentTotalPrice: { amount: string; currencyCode: string };
  lineItems: { edges: { node: { title: string; quantity: number; variant?: { image?: { url: string; altText?: string }; price: { amount: string; currencyCode: string }; selectedOptions: { name: string; value: string }[] } } }[] };
}

interface Address {
  id: string;
  firstName?: string;
  lastName?: string;
  address1?: string;
  address2?: string;
  city?: string;
  province?: string;
  country?: string;
  zip?: string;
  phone?: string;
}

interface Customer {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  createdAt?: string;
  orders: { edges: { node: Order }[] };
  addresses: { edges: { node: Address }[] };
  defaultAddress?: { id: string };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  FULFILLED: { label: "Delivered", icon: <CheckCircle size={14} />, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30" },
  UNFULFILLED: { label: "Processing", icon: <Clock size={14} />, color: "text-amber-600 bg-amber-50 dark:bg-amber-950/30" },
  PARTIALLY_FULFILLED: { label: "Partially Shipped", icon: <Truck size={14} />, color: "text-blue-600 bg-blue-50 dark:bg-blue-950/30" },
  IN_TRANSIT: { label: "In Transit", icon: <Truck size={14} />, color: "text-blue-600 bg-blue-50 dark:bg-blue-950/30" },
  PAID: { label: "Paid", icon: <CheckCircle size={14} />, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30" },
  PENDING: { label: "Pending", icon: <Clock size={14} />, color: "text-amber-600 bg-amber-50 dark:bg-amber-950/30" },
  REFUNDED: { label: "Refunded", icon: <XCircle size={14} />, color: "text-red-600 bg-red-50 dark:bg-red-950/30" },
  CANCELLED: { label: "Cancelled", icon: <XCircle size={14} />, color: "text-gray-500 bg-gray-100 dark:bg-gray-900/50" },
};

function StatusBadge({ status }: { status: string }) {
  const config = STATUS_CONFIG[status] ?? { label: status, icon: <AlertCircle size={14} />, color: "text-gray-500 bg-gray-100" };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${config.color}`}>
      {config.icon} {config.label}
    </span>
  );
}

function formatCurrency(amount: string, currencyCode: string) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: currencyCode, maximumFractionDigits: 0 }).format(Number(amount));
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

// ─── Section Components ───────────────────────────────────────────────────────

function ProfileSection({ customer }: { customer: Customer }) {
  return (
    <section id="profile" className="account-section">
      <div className="account-section__header">
        <User size={18} className="account-section__icon" />
        <h2 className="account-section__title">Profile</h2>
      </div>
      <div className="account-section__body">
        <div className="account-profile-grid">
          <div>
            <p className="account-label">First Name</p>
            <p className="account-value">{customer.firstName || "—"}</p>
          </div>
          <div>
            <p className="account-label">Last Name</p>
            <p className="account-value">{customer.lastName || "—"}</p>
          </div>
          <div>
            <p className="account-label">Email</p>
            <p className="account-value">{customer.email || "—"}</p>
          </div>
          <div>
            <p className="account-label">Phone</p>
            <p className="account-value">{customer.phone || "—"}</p>
          </div>
          {customer.createdAt && (
            <div>
              <p className="account-label">Member Since</p>
              <p className="account-value">{formatDate(customer.createdAt)}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function OrdersSection({ orders }: { orders: Order[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (orders.length === 0) {
    return (
      <section id="orders" className="account-section">
        <div className="account-section__header">
          <Package size={18} className="account-section__icon" />
          <h2 className="account-section__title">Orders</h2>
        </div>
        <div className="account-section__body account-empty">
          <ShoppingBag size={40} className="account-empty__icon" />
          <p className="account-empty__title">No orders yet</p>
          <p className="account-empty__sub">When you place an order, it will appear here.</p>
          <Link href="/collections/all-products" className="account-btn account-btn--primary">Shop Now</Link>
        </div>
      </section>
    );
  }

  return (
    <section id="orders" className="account-section">
      <div className="account-section__header">
        <Package size={18} className="account-section__icon" />
        <h2 className="account-section__title">Orders</h2>
        <span className="account-section__count">{orders.length}</span>
      </div>
      <div className="account-orders">
        {orders.map((order) => {
          const isOpen = expanded === order.id;
          const items = order.lineItems.edges.map(e => e.node);
          return (
            <div key={order.id} className="account-order">
              <button
                onClick={() => setExpanded(isOpen ? null : order.id)}
                className="account-order__header"
              >
                <div className="account-order__meta">
                  <span className="account-order__number">Order {order.name}</span>
                  <span className="account-order__date">{formatDate(order.processedAt)}</span>
                </div>
                <div className="account-order__right">
                  <span className="account-order__total">
                    {formatCurrency(order.currentTotalPrice.amount, order.currentTotalPrice.currencyCode)}
                  </span>
                  <StatusBadge status={order.fulfillmentStatus} />
                  <ChevronRight size={16} className={`account-order__chevron ${isOpen ? "rotate-90" : ""}`} />
                </div>
              </button>
              {isOpen && (
                <div className="account-order__items">
                  {items.map((item, i) => (
                    <div key={i} className="account-order__item">
                      {item.variant?.image?.url && (
                        <img
                          src={item.variant.image.url}
                          alt={item.variant.image.altText ?? item.title}
                          className="account-order__item-img"
                        />
                      )}
                      <div className="account-order__item-info">
                        <p className="account-order__item-title">{item.title}</p>
                        {item.variant?.selectedOptions?.filter(o => o.name !== "Title").map(opt => (
                          <p key={opt.name} className="account-order__item-option">{opt.name}: {opt.value}</p>
                        ))}
                        <p className="account-order__item-price">
                          {item.variant ? formatCurrency(item.variant.price.amount, item.variant.price.currencyCode) : ""} × {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className="account-order__footer">
                    <StatusBadge status={order.financialStatus} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function AddressesSection({ addresses, defaultAddressId }: { addresses: Address[]; defaultAddressId?: string }) {
  if (addresses.length === 0) {
    return (
      <section id="addresses" className="account-section">
        <div className="account-section__header">
          <MapPin size={18} className="account-section__icon" />
          <h2 className="account-section__title">Addresses</h2>
        </div>
        <div className="account-section__body account-empty">
          <MapPin size={40} className="account-empty__icon" />
          <p className="account-empty__title">No saved addresses</p>
          <p className="account-empty__sub">Addresses you use during checkout will appear here.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="addresses" className="account-section">
      <div className="account-section__header">
        <MapPin size={18} className="account-section__icon" />
        <h2 className="account-section__title">Addresses</h2>
        <span className="account-section__count">{addresses.length}</span>
      </div>
      <div className="account-addresses">
        {addresses.map((addr) => (
          <div key={addr.id} className="account-address">
            {addr.id === defaultAddressId && (
              <span className="account-address__default">Default</span>
            )}
            <p className="account-address__name">{addr.firstName} {addr.lastName}</p>
            <p className="account-address__line">{addr.address1}</p>
            {addr.address2 && <p className="account-address__line">{addr.address2}</p>}
            <p className="account-address__line">{[addr.city, addr.province, addr.zip].filter(Boolean).join(", ")}</p>
            <p className="account-address__line">{addr.country}</p>
            {addr.phone && <p className="account-address__line">{addr.phone}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Main Client Component ────────────────────────────────────────────────────

export default function AccountClient({ customer }: { customer: Customer }) {
  const router = useRouter();
  const orders = customer.orders.edges.map(e => e.node);
  const addresses = customer.addresses.edges.map(e => e.node);

  const handleLogout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }, [router]);

  return (
    <main className="account-page">
      {/* Back to shop */}
      <div className="account-page__back">
        <Link href="/" className="account-back-link">
          <ArrowLeft size={16} /> Back to Shop
        </Link>
      </div>

      {/* Page header */}
      <div className="account-page__hero">
        <div className="account-page__avatar">
          {`${customer.firstName?.[0] ?? ""}${customer.lastName?.[0] ?? ""}`.toUpperCase() || "U"}
        </div>
        <div>
          <h1 className="account-page__name">{customer.firstName} {customer.lastName}</h1>
          <p className="account-page__email">{customer.email}</p>
        </div>
        <button onClick={handleLogout} className="account-logout-btn" id="account-logout-btn">
          <LogOut size={15} /> Sign Out
        </button>
      </div>

      {/* Quick nav */}
      <nav className="account-nav">
        <a href="#profile" className="account-nav__link"><User size={14} /> Profile</a>
        <a href="#orders" className="account-nav__link"><Package size={14} /> Orders ({orders.length})</a>
        <a href="#addresses" className="account-nav__link"><MapPin size={14} /> Addresses</a>
      </nav>

      {/* Sections */}
      <div className="account-sections">
        <ProfileSection customer={customer} />
        <OrdersSection orders={orders} />
        <AddressesSection addresses={addresses} defaultAddressId={customer.defaultAddress?.id} />
      </div>
    </main>
  );
}
