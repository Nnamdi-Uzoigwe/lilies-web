// // export default function CheckoutSuccess() {
// //     return (
// //         <div>
// //             Checkout Success Page
// //         </div>
// //     )
// // }


// "use client";

// import Link from "next/link";
// import { useCartStore } from "@/store/useCartStore";
// import { useEffect } from "react";

// export default function CheckoutSuccess() {
//   const clearCart = useCartStore((state) => state.clearCart);

//   useEffect(() => {
//     clearCart(); // clear cart after successful payment
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
//       <div className="text-6xl">🎉</div>
//       <h2 className="text-2xl font-bold text-(--primary)">Order Placed!</h2>
//       <p className="text-gray-500 text-sm">Your payment was successful.</p>
//       <Link
//         href="/dashboard"
//         className="mt-2 px-6 py-3 bg-[#06E775] text-white rounded-md font-semibold text-sm"
//       >
//         Back to Dashboard
//       </Link>
//     </div>
//   );
// }


"use client";

import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function CheckoutSuccess() {
  const clearCart = useCartStore((state) => state.clearCart);
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");

  useEffect(() => {
    const reference = searchParams.get("reference");
    if (!reference) {
      setStatus("failed");
      return;
    }

    const verify = async () => {
      const res = await fetch("/api/paystack/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference }),
      });

      if (res.ok) {
        clearCart();
        setStatus("success");
      } else {
        setStatus("failed");
      }
    };

    verify();
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#00302E] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#00302E] font-medium text-sm">Confirming your payment...</p>
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center">
          <div className="text-5xl mb-4">😞</div>
          <h2 className="text-xl font-bold text-[#00302E] mb-2">Payment Failed</h2>
          <p className="text-gray-400 text-sm mb-8">We couldn't confirm your payment. Please try again.</p>
          <Link
            href="/dashboard/cart"
            className="w-full block bg-[#00302E] text-[#FBDDBB] font-semibold py-3 rounded-xl text-sm hover:opacity-90 transition"
          >
            Back to Cart
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center">

        {/* Icon */}
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-[#00302E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Text */}
        <h2 className="text-2xl font-bold text-[#00302E] mb-2">Order Confirmed!</h2>
        <p className="text-gray-400 text-sm mb-1">
          Thank you{session?.user?.name ? `, ${session.user.name.split(" ")[0]}` : ""}!
        </p>
        <p className="text-gray-400 text-sm mb-8">Your food is being prepared and will be on its way soon. 🍽️</p>

        {/* Divider */}
        <div className="border-t border-gray-100 mb-8" />

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link
            href="/dashboard/orders"
            className="w-full block bg-[#00302E] text-[#FBDDBB] font-semibold py-3 rounded-xl text-sm hover:opacity-90 transition"
          >
            View My Orders
          </Link>
          <Link
            href="/dashboard"
            className="w-full block border border-gray-200 text-gray-500 font-semibold py-3 rounded-xl text-sm hover:bg-gray-50 transition"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}