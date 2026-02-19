// import { DashboardLayout } from "@/components/dashboard/ui/DashboardLayout";

// export default function Cart() {
//     return (
//         <DashboardLayout>
//             Cart Page
//         </DashboardLayout>
//     )
// }


"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { DashboardLayout } from "@/components/dashboard/ui/DashboardLayout";

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

  const formatPrice = (amount: number) =>
    `₦${amount.toLocaleString("en-NG")}`;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="text-6xl">🛒</div>
        <h2 className="text-xl font-semibold text-(--primary)">Your cart is empty</h2>
        <p className="text-gray-500 text-sm">Add some delicious meals to get started</p>
        <Link
          href="/dashboard"
          className="mt-2 px-6 py-3 bg-[#06E775] text-white rounded-md font-semibold text-sm"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-(--primary)">Your Cart</h1>
        <button
          onClick={clearCart}
          className="text-sm text-red-400 hover:text-red-600 transition-colors"
        >
          Clear all
        </button>
      </div>

      {/* Cart Items */}
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl shadow-sm bg-white"
          >
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
              <h3 className="font-semibold text-(--primary) text-sm truncate">{item.name}</h3>
              <p className="text-gray-500 text-xs mt-0.5">{item.price} each</p>
            </div>

            {/* Quantity controls */}
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1">
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
              <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="text-gray-500 hover:text-black font-bold text-base w-5 text-center"
              >
                +
              </button>
            </div>

            {/* Item total */}
            <p className="text-sm font-semibold text-(--primary) w-20 text-right">
              {formatPrice(parsePrice(item.price) * item.quantity)}
            </p>

            {/* Remove */}
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-gray-300 hover:text-red-400 transition-colors ml-1 text-lg"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="mt-8 border border-gray-100 rounded-xl p-6 bg-white shadow-sm">
        <h2 className="font-semibold text-(--primary) text-base mb-4">Order Summary</h2>

        <div className="flex flex-col gap-3 text-sm">
          <div className="flex justify-between text-gray-500">
            <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
            <span className="font-medium text-gray-700">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Delivery fee</span>
            <span className="font-medium text-gray-700">{formatPrice(deliveryFee)}</span>
          </div>
          <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-base text-(--primary)">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>

        {/* Checkout Button — wire up Paystack here later */}
        <button
          className="mt-6 w-full bg-[#06E775] hover:bg-[#04c862] transition-colors text-white font-semibold py-4 rounded-xl text-sm"
          onClick={() => {
            // TODO: integrate Paystack here
            alert("Proceeding to checkout...");
          }}
        >
          Proceed to Checkout · {formatPrice(total)}
        </button>

        <Link
          href="/dashboard"
          className="mt-3 block text-center text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          ← Continue shopping
        </Link>
      </div>
    </DashboardLayout>
  );
}