"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { DashboardLayout } from "@/components/dashboard/ui/DashboardLayout";
import { useState } from "react";
import Spinner from "@/components/layout/Spinner";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart } = useCartStore();

  const parsePrice = (price: string) =>
    parseFloat(price.replace(/[^0-9.]/g, ""));

  const subtotal = items.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.quantity,
    0
  );

  const deliveryFee = items.length > 0 ? 500 : 0;
  const total = subtotal + deliveryFee;

  const formatPrice = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

  const handleCheckout = async () => {
    const res = await fetch("/api/paystack/initialize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "user@example.com",
        amount: total,
      }),
    });

    const data = await res.json();

    if (data.authorization_url) {
      window.location.href = data.authorization_url;
    } else {
      alert("Something went wrong. Please try again.");
    }
  };

  if (items.length === 0) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4 px-4">
          <div className="text-6xl">🛒</div>
          <h2 className="text-xl font-semibold text-[#00302E] text-center">
            Your cart is empty
          </h2>
          <p className="text-gray-500 text-sm text-center">
            Add some delicious meals to get started
          </p>
          <Link
            href="/dashboard"
            className="mt-2 px-6 py-3 bg-[#00302E] text-[#F3C294] rounded-xl font-semibold text-sm"
          >
            Browse Menu
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto px-4 py-6 lg:py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#00302E] font-semibold mb-1">
              Review
            </p>
            <h1 className="text-3xl font-bold text-[#00302E]">Your Cart</h1>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-red-400 hover:text-red-600 transition-colors font-medium border border-red-100 hover:border-red-300 px-3 py-2 rounded-lg"
          >
            Clear all
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex flex-col divide-y divide-gray-100">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3 py-4">

              {/* Food Image */}
              <div className="w-14 h-14 relative shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain rounded-full"
                />
              </div>

              {/* Name + Price */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[#00302E] text-sm leading-tight truncate">
                  {item.name}
                </h3>
                <p className="text-gray-400 text-xs mt-0.5">{item.price} each</p>

                {/* Quantity controls — below name on mobile */}
                <div className="flex items-center gap-2 mt-2 w-fit border border-gray-200 rounded-lg px-3 py-1">
                  <button
                    onClick={() =>
                      item.quantity === 1
                        ? removeFromCart(item.id)
                        : updateQuantity(item.id, item.quantity - 1)
                    }
                    className="text-gray-500 hover:text-black font-bold text-base w-5 text-center"
                  >
                    −
                  </button>
                  <span className="text-sm font-semibold w-4 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="text-gray-500 hover:text-black font-bold text-base w-5 text-center"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Item total + remove */}
              <div className="flex flex-col items-end gap-2 shrink-0">
                <p className="text-sm font-bold text-[#00302E]">
                  {formatPrice(parsePrice(item.price) * item.quantity)}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-300 hover:text-red-400 transition-colors text-sm"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="mt-8 bg-gray-50 rounded-2xl p-5">
          <h2 className="font-bold text-[#00302E] text-base mb-4">
            Order Summary
          </h2>

          <div className="flex flex-col gap-3 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>
                Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)
              </span>
              <span className="font-medium text-gray-700">
                {formatPrice(subtotal)}
              </span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Delivery fee</span>
              <span className="font-medium text-gray-700">
                {formatPrice(deliveryFee)}
              </span>
            </div>
            <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-base text-[#00302E]">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="mt-5 w-full bg-[#00302E] text-[#F3C294] font-semibold py-4 rounded-xl text-sm hover:opacity-90 transition cursor-pointer"
          >
            Proceed to Checkout
          </button>

          <Link
            href="/dashboard"
            className="mt-3 block text-center text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            ← Continue shopping
          </Link>
        </div>

      </div>
    </DashboardLayout>
  );
}