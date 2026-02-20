"use client";

import { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import { DashboardLayout } from "@/components/dashboard/ui/DashboardLayout";
import { useSearchParams } from "next/navigation";

interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: string;
  quantity: number;
}

interface Order {
  _id: string;
  items: OrderItem[];
  total: number;
  reference: string;
  status: string;
  createdAt: string;
}

function OrdersContent() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const paymentSuccess = searchParams.get("payment") === "success";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders");

        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }

        const data = await res.json();
        if (!Array.isArray(data)) {
          console.error("Unexpected response from /api/orders:", data);
          throw new Error("Unexpected response format");
        }

        setOrders(data);
      } catch (err: any) {
        console.error("Failed to fetch orders:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatPrice = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-2xl bg-gray-100 animate-pulse h-40" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 px-4">
        <div className="text-5xl">⚠️</div>
        <h2 className="text-lg font-semibold text-[#00302E]">Failed to load orders</h2>
        <p className="text-gray-400 text-sm text-center">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-5 py-2 bg-[#00302E] text-[#F3C294] rounded-xl text-sm font-semibold"
        >
          Try again
        </button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4">
        <div className="text-6xl">🧾</div>
        <h2 className="text-xl font-semibold text-[#00302E]">No orders yet</h2>
        <p className="text-gray-500 text-sm text-center">
          Your completed orders will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 lg:py-10">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs uppercase tracking-widest text-[#00302E] font-semibold mb-1">
          History
        </p>
        <div className="flex items-end justify-between">
          <h1 className="text-3xl font-bold text-[#00302E]">Your Orders</h1>
          <span className="text-sm text-gray-400 mb-1">
            {orders.length} order{orders.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {paymentSuccess && (
        <div className="mb-6 bg-[#00302E] text-[#F3C294] px-4 py-3 rounded-xl text-sm font-medium">
          🎉 Payment successful! Your order has been placed.
        </div>
      )}

      <div className="flex flex-col gap-5">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-gray-50 rounded-2xl p-5"
          >
            {/* Order meta */}
            <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Order placed</p>
                <p className="text-sm font-semibold text-[#00302E] mt-0.5">
                  {formatDate(order.createdAt)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Reference</p>
                <p className="text-xs font-mono text-gray-500 mt-0.5">{order.reference}</p>
              </div>
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full capitalize self-start">
                {order.status}
              </span>
            </div>

            {/* Items */}
            <div className="flex flex-col divide-y divide-gray-100">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 py-3">
                  <div className="w-12 h-12 relative shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain rounded-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#00302E] text-sm truncate">
                      {item.name}
                    </h3>
                    <p className="text-gray-400 text-xs mt-0.5">
                      x{item.quantity} · {item.price} each
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between items-center">
              <span className="text-sm text-gray-400">Total paid</span>
              <span className="font-bold text-[#00302E]">{formatPrice(order.total)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Orders() {
  return (
    <DashboardLayout>
      <Suspense
        fallback={
          <div className="max-w-2xl mx-auto px-4 py-10 space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-2xl bg-gray-100 animate-pulse h-40" />
            ))}
          </div>
        }
      >
        <OrdersContent />
      </Suspense>
    </DashboardLayout>
  );
}