"use client"

import { useEffect, useMemo, useState } from "react"
import { getCart } from "@/lib/checkout"
import {
  getAddresses,
  addAddress,
} from "@/lib/addresses"

import { createOrder, verifyPayment, cancelPaymentOrder } from "@/lib/orders"

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

interface Address {
  id: string
  user_id: string
  full_name: string
  phone_number: string
  address_line_1: string
  address_line_2: string | null
  city: string
  state: string
  postal_code: string
  country: string
  address_type: string
  is_default: boolean
}

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function checkOutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [selectedPayment, setSelectedPayment] = useState("Card")
  const [loading, setLoading] = useState(true)
  const [addressOpen, setAddressOpen] = useState(false)
  const [paymentOpen, setPaymentOpen] = useState(false)

  const [addresses, setAddresses] = useState<Address[]>([])
  const [selectedAddress, setSelectedAddress] =
    useState<Address | null>(null)

  const [addressLoading, setAddressLoading] = useState(true)
  const [savingAddress, setSavingAddress] = useState(false)

  const [newAddress, setNewAddress] = useState({
    full_name: "",
    phone_number: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "Nepal",
    address_type: "Home",
    is_default: false,
  })

  const [placingOrder, setPlacingOrder] = useState(false)

  useEffect(() => {
    const script = document.createElement("script")

    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  useEffect(() => {
    const loadAddresses = async () => {
      try {
        setAddressLoading(true)

        const response = await getAddresses()

        const data: Address[] = response.data || response

        setAddresses(data)

        const defaultAddress = data.find(
          (address) => address.is_default
        )

        if (defaultAddress) {
          setSelectedAddress(defaultAddress)
        } else if (data.length > 0) {
          setSelectedAddress(data[0])
        }
      } catch (error) {
        console.error("Failed to load addresses:", error)
      } finally {
        setAddressLoading(false)
      }
    }

    loadAddresses()
  }, [])

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      alert("Please select a shipping address.")
      return
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty.")
      return
    }

    try {
      setPlacingOrder(true)

      const response = await createOrder(
        selectedAddress.id,
        selectedPayment
      )

      const order = response.data

      console.log("Order created:", order)
      console.log("Selected payment:", selectedPayment)
      console.log("Razorpay Key:", process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID)
      console.log("Razorpay object:", window.Razorpay)
      console.log("Razorpay Order ID:", order.razorpay_order_id)

      if (selectedPayment === "UPI payment") {

        if (!window.Razorpay) {
          throw new Error(
            "Razorpay Checkout failed to load"
          )
        }

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

          amount: Math.round(order.total_amount * 100),

          currency: "INR",

          name: "ManMohey",

          description: `Order ${order.order_number}`,

          order_id: order.razorpay_order_id,

          handler: async function (response: any) {

            try {

              console.log(
                "Razorpay payment successful:",
                response
              );

              const verification = await verifyPayment({
                order_id: order.id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              });

              console.log(
                "Payment verification successful:",
                verification
              );

              alert("Payment successful!");

              // Later we can redirect to the order details page here.

            } catch (error: any) {

              console.error(
                "Payment verification failed:",
                error
              );

              alert(
                error.message ||
                "Payment verification failed"
              );

            }

          },

          payment_failed: function (response: any) {
            console.error(
              "Razorpay payment failed:",
              response
            );

            alert(
              "Payment failed. Please try again."
            );
          },

          prefill: {
            name: selectedAddress.full_name,
            contact: selectedAddress.phone_number,
          },

          theme: {
            color: "#f87171",
          },

          modal: {
            ondismiss: async function () {
              try {
                console.log("Razorpay payment popup closed");

                await cancelPaymentOrder(order.id);

                console.log(
                  "Unpaid order cancelled successfully"
                );

                alert(
                  "Payment was not completed. Your order has been cancelled."
                );

              } catch (error: any) {

                console.error(
                  "Failed to cancel unpaid order:",
                  error
                );

                alert(
                  error.message ||
                  "Payment was not completed."
                );
              }
            },
          },
        }

        const razorpay = new window.Razorpay(options)

        razorpay.open()
      }

    } catch (error) {
      console.error(
        "Failed to place order:",
        error
      )

      alert(
        error instanceof Error
          ? error.message
          : "Failed to place order"
      )
    } finally {
      setPlacingOrder(false)
    }
  }

  const handleSaveAddress = async () => {
    try {
      setSavingAddress(true)

      const response = await addAddress(newAddress)

      const savedAddress: Address =
        response.data || response

      setAddresses((prev) => [
        ...prev,
        savedAddress,
      ])

      setSelectedAddress(savedAddress)

      setAddressOpen(false)

      setNewAddress({
        full_name: "",
        phone_number: "",
        address_line_1: "",
        address_line_2: "",
        city: "",
        state: "",
        postal_code: "",
        country: "Nepal",
        address_type: "Home",
        is_default: false,
      })

    } catch (error) {
      console.error(
        "Failed to save address:",
        error
      )

      alert("Failed to save address")
    } finally {
      setSavingAddress(false)
    }
  }


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
                {stepCards.map((step) => {
                  const isAddressStep =
                    step.title === "Add Shipping Address"

                  const isPaymentStep =
                    step.title === "Add Payment Method"

                  return (
                    <button
                      key={step.title}
                      type="button"
                      onClick={() => {
                        if (isAddressStep) {
                          setAddressOpen(true)
                        }

                        if (isPaymentStep) {
                          setPaymentOpen(true)
                        }
                      }}
                      className="flex w-full items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-left transition hover:border-slate-300 hover:bg-white"
                    >
                      <div>
                        <div className="flex items-center gap-2 text-base font-semibold text-slate-900">

                          <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-sm">
                            <i
                              className={
                                isAddressStep && selectedAddress
                                  ? "bi bi-check text-base text-emerald-600"
                                  : isPaymentStep
                                    ? "bi bi-check text-base text-emerald-600"
                                    : "bi bi-plus text-base"
                              }
                              aria-hidden="true"
                            />
                          </span>

                          {step.title}

                        </div>

                        {isAddressStep && selectedAddress ? (

                          <div className="mt-2 text-sm text-slate-600">
                            <p className="font-medium text-slate-900">
                              {selectedAddress.full_name}
                            </p>

                            <p>
                              {selectedAddress.address_line_1}
                            </p>

                            {selectedAddress.address_line_2 && (
                              <p>
                                {selectedAddress.address_line_2}
                              </p>
                            )}

                            <p>
                              {selectedAddress.city},{" "}
                              {selectedAddress.state}{" "}
                              {selectedAddress.postal_code}
                            </p>

                            <p>
                              {selectedAddress.country}
                            </p>

                            <p className="mt-1">
                              Phone: {selectedAddress.phone_number}
                            </p>
                          </div>

                        ) : isPaymentStep ? (

                          <p className="mt-1 text-sm text-slate-500">
                            Selected:{" "}
                            <span className="font-medium text-slate-700">
                              {selectedPayment}
                            </span>
                          </p>

                        ) : (

                          <p className="mt-1 text-sm text-slate-500">
                            {step.subtitle}
                          </p>

                        )}
                      </div>

                      <i
                        className="bi bi-chevron-right text-xl text-slate-400"
                        aria-hidden="true"
                      />

                    </button>
                  )
                })}
              </div>

              <div className="mt-6 rounded-3xl bg-slate-100 p-4 text-sm text-slate-600">
                <div className="flex items-center gap-2 font-medium text-slate-900">
                  <i className="bi bi-shield-lock text-emerald-600 text-base" aria-hidden="true" />
                  Earn 8% back with Prime Visa and an eligible Prime membership.
                </div>
              </div>

              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={
                  placingOrder ||
                  !selectedAddress ||
                  cartItems.length === 0
                }
                className="mt-6 w-full rounded-3xl bg-rose-400 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {placingOrder
                  ? "Placing Order..."
                  : "Place Order"}
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

                {/* Country */}
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Country
                  </label>

                  <select
                    value={newAddress.country}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        country: e.target.value,
                      })
                    }
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                  >
                    <option value="Nepal">Nepal</option>
                    <option value="India">India</option>
                  </select>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Full Name
                  </label>

                  <input
                    value={newAddress.full_name}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        full_name: e.target.value,
                      })
                    }
                    placeholder="Satyam Mittal"
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Address
                  </label>

                  <input
                    value={newAddress.address_line_1}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        address_line_1: e.target.value,
                      })
                    }
                    placeholder="Dhobighat Sunrise Tower"
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                  />
                </div>

                {/* Address Line 2 */}
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Address Line 2
                  </label>

                  <input
                    value={newAddress.address_line_2}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        address_line_2: e.target.value,
                      })
                    }
                    placeholder="Apartment, floor, landmark..."
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                  />
                </div>

                {/* City + State */}
                <div className="grid gap-4 sm:grid-cols-2">

                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      City
                    </label>

                    <input
                      value={newAddress.city}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          city: e.target.value,
                        })
                      }
                      placeholder="Lalitpur"
                      className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      State
                    </label>

                    <input
                      value={newAddress.state}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          state: e.target.value,
                        })
                      }
                      placeholder="Bagmati"
                      className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                    />
                  </div>

                </div>

                {/* Postal + Phone */}
                <div className="grid gap-4 sm:grid-cols-2">

                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Zip/Postal Code
                    </label>

                    <input
                      value={newAddress.postal_code}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          postal_code: e.target.value,
                        })
                      }
                      placeholder="44600"
                      className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Phone Number
                    </label>

                    <input
                      value={newAddress.phone_number}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          phone_number: e.target.value,
                        })
                      }
                      placeholder="9818998213"
                      className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                    />
                  </div>

                </div>

                {/* Address Type */}
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Address Type
                  </label>

                  <select
                    value={newAddress.address_type}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        address_type: e.target.value,
                      })
                    }
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
                  >
                    <option value="Home">Home</option>
                    <option value="Work">Work</option>
                  </select>
                </div>

                {/* Default Address */}
                <label className="flex items-center gap-3 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={newAddress.is_default}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        is_default: e.target.checked,
                      })
                    }
                    className="h-4 w-4 rounded"
                  />

                  Set as default address
                </label>

              </div>

              <button
                type="button"
                onClick={handleSaveAddress}
                disabled={savingAddress}
                className="w-full rounded-3xl bg-rose-400 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {savingAddress ? "Saving..." : "Save & Continue"}
              </button>
            </div>
          </div>
        </div>

      ) : null
      }

      {
        paymentOpen ? (
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
                        className={`w-full rounded-3xl border px-5 py-4 text-left text-sm font-semibold transition ${selectedPayment === option
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
        ) : null
      }
    </main >
  )
}
