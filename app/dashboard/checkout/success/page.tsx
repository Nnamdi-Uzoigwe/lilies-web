// export default function CheckoutSuccess() {
//     return (
//         <div>
//             Checkout Success Page
//         </div>
//     )
// }


"use client";

import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { useEffect } from "react";

export default function CheckoutSuccess() {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart(); // clear cart after successful payment
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="text-6xl">🎉</div>
      <h2 className="text-2xl font-bold text-(--primary)">Order Placed!</h2>
      <p className="text-gray-500 text-sm">Your payment was successful.</p>
      <Link
        href="/dashboard"
        className="mt-2 px-6 py-3 bg-[#06E775] text-white rounded-md font-semibold text-sm"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}