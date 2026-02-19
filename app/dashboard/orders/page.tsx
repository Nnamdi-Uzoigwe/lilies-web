// import { DashboardLayout } from "@/components/dashboard/ui/DashboardLayout";

// export default function Orders() {
//     return (
//         <DashboardLayout>
//             Orders page
//         </DashboardLayout>
//     )
// }


"use client";

import { useEffect, useState } from "react";
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

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const paymentSuccess = searchParams.get("payment") === "success";

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const formatPrice = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-NG", {
      day: "numeric", month: "short", year: "numeric",
    });

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center text-gray-400 py-20">Loading orders...</div>
      </DashboardLayout>
    );
  }

  if (orders.length === 0) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="text-6xl">🧾</div>
          <h2 className="text-xl font-semibold text-(--primary)">No orders yet</h2>
          <p className="text-gray-500 text-sm">Your completed orders will appear here</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-(--primary)">Your Orders</h1>
        <span className="text-sm text-gray-400">{orders.length} order{orders.length !== 1 ? "s" : ""}</span>
      </div>

      {paymentSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
          🎉 Payment successful! Your order has been placed.
        </div>
      )}

      <div className="flex flex-col gap-6">
        {orders.map((order) => (
          <div key={order._id} className="border border-gray-100 rounded-xl p-5 shadow-sm">
            {/* Order Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-gray-400">Order placed</p>
                <p className="text-sm font-medium text-(--primary)">{formatDate(order.createdAt)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Reference</p>
                <p className="text-xs font-mono text-gray-500">{order.reference}</p>
              </div>
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full capitalize">
                {order.status}
              </span>
            </div>

            {/* Order Items */}
            <div className="flex flex-col gap-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-3">
                  <div className="w-12 h-12 relative shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain rounded-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-(--primary) text-sm truncate">{item.name}</h3>
                    <p className="text-gray-400 text-xs mt-0.5">x{item.quantity} · {item.price} each</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Total */}
            <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between items-center">
              <span className="text-sm text-gray-500">Total paid</span>
              <span className="font-bold text-(--primary)">{formatPrice(order.total)}</span>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}