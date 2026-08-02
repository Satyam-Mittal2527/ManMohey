"use client"

import { useEffect, useMemo, useState } from "react"
import { getCart } from "@/lib/checkout"

interface CartItem {
  id: number
  productId: number
  name: string
  variant: string | null
  price: number
  qty: number
  img: string
}

const paymentOptions = ["UPI payment", "Bank", "Card", "Cash on delivery"]

const stepCards = [
  {
    title: "Add Shipping Address",
    subtitle: "Enter your delivery address for this order.",
  },
  {
    title: "Add Payment Method",
    subtitle: "Choose UPI, bank, card, or cash on delivery.",
  },
]

export default function checkOutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [selectedPayment, setSelectedPayment] = useState("Card")
  const [loading, setLoading] = useState(true)
  const [addressOpen, setAddressOpen] = useState(false)
  const [paymentOpen, setPaymentOpen] = useState(false)
  const [address, setAddress] = useState({
    country: "United States",
    fullName: "",
    addressLine: "",
    zip: "",
    phone: "",
    defaultAddress: false,
    saturday: false,
    sunday: false,
  })

  useEffect(() => {
    const loadCart = async () => {
      try {
        setLoading(true)
        const data = await getCart()
        setCartItems(
          data.items.map((item: any) => ({
            id: item.id,
            productId: item.product_id,
            name: item.name,
            variant: item.size,
            price: Number(item.price),
            qty: item.quantity,
            img: item.image,
          }))
        )
      } catch (error) {
        console.error("Failed to load cart:", error)
      } finally {
        setLoading(false)
      }
    }

    loadCart()
  }, [])

  const itemCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.qty, 0), [cartItems])
  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cartItems]
  )
  const shipping = 0
  const total = subtotal + shipping
  const previewItems = cartItems
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(value)

  return (
    <main className="bg-slate-50 min-h-screen py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">FREE shipping and FREE returns</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">Review order</h1>
          </div>
          
        </div>

        <div className="mt-8 grid gap-8 xl:grid-cols-[1.6fr_0.9fr]">
          <section className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Payment method</h2>
                  <p className="mt-2 text-sm text-slate-500">Choose how you'd like to pay for this order.</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="rounded-3xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700">
                    Selected: {selectedPayment}
                  </div>
                  <button
                    type="button"
                    onClick={() => setPaymentOpen(true)}
                    className="inline-flex items-center justify-center rounded-3xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 border border-slate-200 shadow-sm transition hover:bg-slate-50"
                  >
                    Change payment method
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Review Order</h2>
                  <p className="mt-1 text-sm text-slate-500">Complete the final steps before placing your order.</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">{itemCount} items</span>
              </div>

              <div className="mt-6 space-y-4">
                {stepCards.map((step) => (
                  <button
                    key={step.title}
                    type="button"
                    onClick={() => {
                      if (step.title === "Add Shipping Address") {
                        setAddressOpen(true)
                      }
                      if (step.title === "Add Payment Method") {
                        setPaymentOpen(true)
                      }
                    }}
                    className="flex w-full items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-left transition hover:border-slate-300 hover:bg-white"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-base font-semibold text-slate-900">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-sm">
                          <i className="bi bi-plus text-base" aria-hidden="true" />
                        </span>
                        {step.title}
                      </div>
                      <p className="mt-1 text-sm text-slate-500">{step.subtitle}</p>
                    </div>
                    <i className="bi bi-chevron-right text-slate-400 text-xl" aria-hidden="true" />
                  </button>
                ))}
              </div>

              <div className="mt-6 rounded-3xl bg-slate-100 p-4 text-sm text-slate-600">
                <div className="flex items-center gap-2 font-medium text-slate-900">
                  <i className="bi bi-shield-lock text-emerald-600 text-base" aria-hidden="true" />
                  Earn 8% back with Prime Visa and an eligible Prime membership.
                </div>
              </div>

              <button className="mt-6 w-full rounded-3xl bg-rose-400 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-500">
                Place Order
              </button>

              <p className="mt-4 text-center text-xs text-slate-500">
                By placing your order, you agree to Shopbop.com’s privacy notice and condition of use.
              </p>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Order Details</h2>
              <div className="mt-5 space-y-3 text-sm text-slate-600">
                <div className="flex justify-between border-b border-slate-200 pb-3">
                  <span>Products</span>
                  <span>{itemCount}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-3">
                  <span>Shipping &amp; Handling</span>
                  <span className="font-semibold text-emerald-600">FREE</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-3">
                  <span>Total Before Tax</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between pt-3 text-base font-semibold text-slate-900">
                  <span>Order Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">In Your Bag</h3>
                  <p className="mt-1 text-sm text-slate-500">{itemCount} items</p>
                </div>
                <span className="text-sm text-slate-500">{itemCount} Items</span>
              </div>

              <div className="mt-5 space-y-4">
                {loading ? (
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">
                    Loading your bag…
                  </div>
                ) : previewItems.length > 0 ? (
                  previewItems.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-start gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-3xl bg-white">
                        <img src={item.img} alt={item.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="font-semibold text-slate-900">{item.name}</p>
                            <p className="mt-1 text-xs text-slate-500">{item.variant}</p>
                          </div>
                          <button type="button" className="text-slate-400 transition hover:text-slate-700">
                            <i className="bi bi-x-lg text-base" aria-hidden="true" />
                          </button>
                        </div>
                        <div className="mt-3 flex items-center justify-between gap-4 text-sm text-slate-600">
                          <span>Quantity {item.qty}</span>
                          <span className="font-semibold text-slate-900">{formatCurrency(item.price * item.qty)}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">
                    Your bag is empty. Add items in the cart first.
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {addressOpen ? (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm" onClick={() => setAddressOpen(false)}>
          <div className="absolute inset-y-0 left-0 w-full max-w-md">
            <div className="flex h-full flex-col bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between border-b border-slate-200 p-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Add Address</p>
                  <h2 className="mt-2 text-xl font-semibold text-slate-900">Shipping address</h2>
                </div>
                <button
                  type="button"
                  className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                  onClick={() => setAddressOpen(false)}
                >
                  <i className="bi bi-x-lg text-base" aria-hidden="true" />
                </button>
              </div>

              <div className="p-6 space-y-5 overflow-y-auto">
                <label className="block text-sm font-medium text-slate-700">Country</label>
                <select
                  value={address.country}
                  onChange={(e) => setAddress({ ...address, country: e.target.value })}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                >
                  <option>India</option>
                  
                </select>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Full Name</label>
                    <input
                      value={address.fullName}
                      onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                      placeholder="Satyam Mittal"
                      className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">Address or P.O. Box</label>
                    <input
                      value={address.addressLine}
                      onChange={(e) => setAddress({ ...address, addressLine: e.target.value })}
                      placeholder="123 Main St"
                      className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Zip/Postal Code</label>
                      <input
                        value={address.zip}
                        onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                        placeholder="12345"
                        className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Phone Number</label>
                      <input
                        value={address.phone}
                        onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                        placeholder="(555) 123-4567"
                        className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setAddressOpen(false)}
                  className="w-full rounded-3xl bg-rose-400 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-500"
                >
                  Save & Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {paymentOpen ? (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm" onClick={() => setPaymentOpen(false)}>
          <div className="absolute inset-y-0 left-0 w-full max-w-md">
            <div className="flex h-full flex-col bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between border-b border-slate-200 p-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Payment Options</p>
                  <h2 className="mt-2 text-xl font-semibold text-slate-900">Select payment method</h2>
                </div>
                <button
                  type="button"
                  className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                  onClick={() => setPaymentOpen(false)}
                >
                  <i className="bi bi-x-lg text-base" aria-hidden="true" />
                </button>
              </div>

              <div className="p-6 space-y-5 overflow-y-auto">
                <div className="space-y-4">
                  {paymentOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSelectedPayment(option)}
                      className={`w-full rounded-3xl border px-5 py-4 text-left text-sm font-semibold transition ${
                        selectedPayment === option
                          ? "border-rose-400 bg-rose-50 text-rose-700"
                          : "border-slate-200 bg-slate-50 text-slate-900 hover:border-slate-300 hover:bg-slate-100"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setPaymentOpen(false)}
                  className="w-full rounded-3xl bg-rose-400 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-500"
                >
                  Save & Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  )
}
