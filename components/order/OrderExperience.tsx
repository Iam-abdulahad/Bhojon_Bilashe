"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import { siteConfig } from "@/data/site-config";
import type { MenuItemData } from "@/lib/menu-service";
import { getDishImage } from "@/lib/dish-images";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

interface OrderLine {
  dish: MenuItemData;
  quantity: number;
}

interface OrderContextValue {
  items: OrderLine[];
  itemCount: number;
  subtotal: number;
  addItem: (dish: MenuItemData) => void;
  setQuantity: (slug: string, quantity: number) => void;
  removeItem: (slug: string) => void;
  isOpen: boolean;
  openOrder: () => void;
  closeOrder: () => void;
}

const OrderContext = createContext<OrderContextValue | null>(null);

export function useOrder() {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error("useOrder must be used within OrderExperience.");
  }

  return context;
}

export function OrderExperience({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<OrderLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((dish: MenuItemData) => {
    if (!dish.isAvailable) return;

    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.dish.slug === dish.slug);

      if (existingItem) {
        return currentItems.map((item) =>
          item.dish.slug === dish.slug
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { dish, quantity: 1 }];
    });
  }, []);

  const setQuantity = useCallback((slug: string, quantity: number) => {
    setItems((currentItems) =>
      quantity < 1
        ? currentItems.filter((item) => item.dish.slug !== slug)
        : currentItems.map((item) =>
            item.dish.slug === slug ? { ...item, quantity } : item
          )
    );
  }, []);

  const removeItem = useCallback((slug: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.dish.slug !== slug)
    );
  }, []);
  const openOrder = useCallback(() => setIsOpen(true), []);
  const closeOrder = useCallback(() => setIsOpen(false), []);

  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  const subtotal = items.reduce(
    (total, item) => total + item.dish.price * item.quantity,
    0
  );

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      addItem,
      setQuantity,
      removeItem,
      isOpen,
      openOrder,
      closeOrder,
    }),
    [
      items,
      itemCount,
      subtotal,
      addItem,
      setQuantity,
      removeItem,
      isOpen,
      openOrder,
      closeOrder,
    ]
  );

  return (
    <OrderContext.Provider value={value}>
      {children}
      <OrderCart />
    </OrderContext.Provider>
  );
}

function formatPrice(price: number) {
  return `৳${price.toLocaleString("en-BD")}`;
}

function OrderCart() {
  const {
    items,
    itemCount,
    subtotal,
    isOpen,
    openOrder,
    closeOrder,
    setQuantity,
    removeItem,
  } = useOrder();
  const prefersReducedMotion = useReducedMotion();
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [fulfillment, setFulfillment] = useState<"pickup" | "delivery">("pickup");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [checkoutError, setCheckoutError] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeOrder();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, closeOrder]);

  function handleCheckout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCheckoutError("");

    const whatsappNumber = siteConfig.contact.whatsapp.replace(/\D/g, "");
    if (!/^\d{8,15}$/.test(whatsappNumber)) {
      setCheckoutError(
        "The restaurant WhatsApp number is not configured. Please contact the restaurant directly."
      );
      return;
    }

    const orderLines = items
      .map(
        ({ dish, quantity }) =>
          `• ${dish.name} × ${quantity} — ${formatPrice(dish.price * quantity)}`
      )
      .join("\n");
    const message = [
      `Hello ${siteConfig.name}! I would like to place an order.`,
      "",
      `Name: ${customerName.trim()}`,
      `Phone: ${customerPhone.trim()}`,
      `Order type: ${fulfillment === "pickup" ? "Pickup" : "Delivery"}`,
      ...(fulfillment === "delivery" ? [`Delivery address: ${address.trim()}`] : []),
      "",
      "Order:",
      orderLines,
      "",
      `Subtotal: ${formatPrice(subtotal)}`,
      "Please confirm availability, delivery fee (if applicable), and estimated preparation time.",
      ...(notes.trim() ? ["", `Notes: ${notes.trim()}`] : []),
    ].join("\n");
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    const whatsappWindow = window.open(whatsappUrl, "_blank");

    if (whatsappWindow) {
      whatsappWindow.opener = null;
    } else {
      window.location.assign(whatsappUrl);
    }
  }

  return (
    <>
      <AnimatePresence>
        {itemCount > 0 && !isOpen && (
          <motion.button
            type="button"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.96 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
            onClick={openOrder}
            className="fixed bottom-5 left-5 z-40 flex min-h-14 items-center gap-3 rounded-full border border-accent/30 bg-bg-elevated/95 px-5 text-cream shadow-[0_12px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-colors hover:border-accent/70 md:bottom-8 md:left-auto md:right-8"
            aria-label={`Open your order, ${itemCount} ${itemCount === 1 ? "item" : "items"}, subtotal ${formatPrice(subtotal)}`}
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white">
              <ShoppingBag className="h-4 w-4" />
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-bg">
                {itemCount}
              </span>
            </span>
            <span className="text-left leading-tight">
              <span className="block text-xs text-muted">Your order</span>
              <span className="block text-sm font-semibold tabular-nums">
                {formatPrice(subtotal)}
              </span>
            </span>
            <span className="ml-1 text-xs font-semibold text-accent">Review</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[70] flex justify-end bg-black/65 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.22 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeOrder();
            }}
            onTouchStart={(event) => {
              if (event.target === event.currentTarget) closeOrder();
            }}
          >
            <motion.section
              role="dialog"
              aria-modal="true"
              aria-labelledby="order-drawer-title"
              data-lenis-prevent
              initial={
                prefersReducedMotion ? { opacity: 0 } : { x: "100%", opacity: 0.8 }
              }
              animate={{ x: 0, opacity: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { x: "100%", opacity: 0.8 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 330, damping: 34 }
              }
              className="flex h-full w-full max-w-xl flex-col overflow-y-auto border-l border-border bg-bg-elevated shadow-2xl"
            >
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-bg-elevated/95 px-5 py-4 backdrop-blur-xl sm:px-8">
                <div>
                  <p className="font-label text-[10px] text-accent">MADE FRESH FOR YOU</p>
                  <h2 id="order-drawer-title" className="font-display text-2xl font-bold text-cream">
                    Your order
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={closeOrder}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-cream transition-colors hover:border-accent hover:text-accent"
                  aria-label="Close order"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 px-5 py-6 sm:px-8">
                {items.length === 0 ? (
                  <div className="flex min-h-56 flex-col items-center justify-center text-center">
                    <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-bg-soft text-accent">
                      <ShoppingBag className="h-6 w-6" />
                    </span>
                    <h3 className="font-display text-xl font-semibold text-cream">
                      Your bag is ready for something delicious
                    </h3>
                    <p className="mt-2 max-w-xs text-sm text-muted">
                      Add a favorite from the menu and it will be waiting here.
                    </p>
                    <button
                      type="button"
                      onClick={closeOrder}
                      className="mt-5 min-h-11 rounded-full border border-border px-5 text-sm font-semibold text-cream transition-colors hover:border-accent"
                    >
                      Explore the menu
                    </button>
                  </div>
                ) : (
                  <>
                    <ul className="space-y-4">
                      {items.map(({ dish, quantity }) => (
                        <li
                          key={dish.slug}
                          className="flex gap-4 rounded-2xl border border-border bg-bg/55 p-3 sm:p-4"
                        >
                          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-bg-soft sm:h-24 sm:w-24">
                            <Image
                              src={getDishImage(dish)}
                              alt={dish.name}
                              fill
                              sizes="96px"
                              className="object-cover"
                            />
                          </div>
                          <div className="flex min-w-0 flex-1 flex-col justify-between">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h3 className="font-display text-sm font-semibold leading-snug text-cream sm:text-base">
                                  {dish.name}
                                </h3>
                                <p className="mt-1 text-xs text-muted">
                                  {formatPrice(dish.price)} each
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeItem(dish.slug)}
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-primary/10 hover:text-primary"
                                aria-label={`Remove ${dish.name} from your order`}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 rounded-full border border-border px-2">
                                <button
                                  type="button"
                                  onClick={() => setQuantity(dish.slug, quantity - 1)}
                                  className="flex h-8 w-7 items-center justify-center text-muted transition-colors hover:text-cream"
                                  aria-label={`Decrease ${dish.name} quantity`}
                                >
                                  <Minus className="h-3.5 w-3.5" />
                                </button>
                                <span className="min-w-4 text-center text-sm font-semibold tabular-nums text-cream">
                                  {quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setQuantity(dish.slug, quantity + 1)}
                                  className="flex h-8 w-7 items-center justify-center text-muted transition-colors hover:text-cream"
                                  aria-label={`Increase ${dish.name} quantity`}
                                >
                                  <Plus className="h-3.5 w-3.5" />
                                </button>
                              </div>
                              <span className="font-display text-sm font-bold text-accent tabular-nums">
                                {formatPrice(dish.price * quantity)}
                              </span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                      <span className="text-sm text-muted">
                        Subtotal{" "}
                        <span className="text-xs">
                          ({itemCount} {itemCount === 1 ? "item" : "items"})
                        </span>
                      </span>
                      <span className="font-display text-xl font-bold text-accent tabular-nums">
                        {formatPrice(subtotal)}
                      </span>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-muted">
                      Delivery fees, if applicable, will be confirmed by the restaurant on WhatsApp.
                    </p>

                    <form onSubmit={handleCheckout} className="mt-7 space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <label className="block text-xs font-medium text-muted">
                          Your name
                          <input
                            required
                            autoComplete="name"
                            value={customerName}
                            onChange={(event) => setCustomerName(event.target.value)}
                            className="mt-1.5 min-h-12 w-full rounded-xl border border-border bg-bg px-4 text-sm text-cream placeholder:text-muted/70 focus:border-accent focus:outline-none"
                            placeholder="Full name"
                          />
                        </label>
                        <label className="block text-xs font-medium text-muted">
                          Phone number
                          <input
                            required
                            type="tel"
                            autoComplete="tel"
                            value={customerPhone}
                            onChange={(event) => setCustomerPhone(event.target.value)}
                            className="mt-1.5 min-h-12 w-full rounded-xl border border-border bg-bg px-4 text-sm text-cream placeholder:text-muted/70 focus:border-accent focus:outline-none"
                            placeholder="+880 1XXX-XXXXXX"
                          />
                        </label>
                      </div>

                      <label className="block text-xs font-medium text-muted">
                        How would you like your order?
                        <select
                          value={fulfillment}
                          onChange={(event) =>
                            setFulfillment(event.target.value as "pickup" | "delivery")
                          }
                          className="mt-1.5 min-h-12 w-full rounded-xl border border-border bg-bg px-4 text-sm text-cream focus:border-accent focus:outline-none"
                        >
                          <option value="pickup">I’ll pick it up</option>
                          <option value="delivery">Deliver to my address</option>
                        </select>
                      </label>

                      {fulfillment === "delivery" && (
                        <label className="block text-xs font-medium text-muted">
                          Delivery address
                          <textarea
                            required
                            autoComplete="street-address"
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                            rows={2}
                            className="mt-1.5 w-full resize-y rounded-xl border border-border bg-bg px-4 py-3 text-sm text-cream placeholder:text-muted/70 focus:border-accent focus:outline-none"
                            placeholder="House, road, area and any directions"
                          />
                        </label>
                      )}

                      <label className="block text-xs font-medium text-muted">
                        Notes for the kitchen <span className="font-normal">(optional)</span>
                        <textarea
                          value={notes}
                          onChange={(event) => setNotes(event.target.value)}
                          rows={2}
                          className="mt-1.5 w-full resize-y rounded-xl border border-border bg-bg px-4 py-3 text-sm text-cream placeholder:text-muted/70 focus:border-accent focus:outline-none"
                          placeholder="Spice preferences, allergies, or other requests"
                        />
                      </label>

                      {checkoutError && (
                        <p role="alert" className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
                          {checkoutError}
                        </p>
                      )}

                      <button
                        type="submit"
                        className="group flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 text-sm font-bold text-[#062c16] shadow-[0_8px_28px_rgba(37,211,102,0.16)] transition-all hover:bg-[#46df7b] hover:shadow-[0_10px_34px_rgba(37,211,102,0.3)] active:scale-[0.99]"
                      >
                        <Check className="h-4 w-4 transition-transform group-hover:scale-110" />
                        Send order on WhatsApp
                      </button>
                      <p className="text-center text-[11px] leading-relaxed text-muted">
                        WhatsApp will open with your order ready to send. Nothing is charged online.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
