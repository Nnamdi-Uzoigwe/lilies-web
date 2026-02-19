"use client";

import Image from "next/image";
import { useState } from "react";
import { useProductStore } from "@/store/useProductStore";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export default function ProductPanel() {
  const { selectedProduct, closeProduct } = useProductStore();
  const [quantity, setQuantity] = useState(1);


  if (!selectedProduct) return null;

  return (
    <>
      {/* Mobile: full screen */}
      <div className="fixed inset-0 bg-white z-50 overflow-y-auto p-6 lg:hidden">
        <button
          onClick={closeProduct}
          className="text-gray-500 mb-6 flex items-center gap-1"
        >
          ← Back
        </button>
        <PanelContent
          product={selectedProduct}
          quantity={quantity}
          setQuantity={setQuantity}
          onClose={closeProduct}
        />
      </div>

      {/* Desktop: fixed right overlay */}
      <div className="hidden lg:flex flex-col fixed top-0 right-0 h-full w-1/2 bg-white z-50 shadow-2xl border-l border-gray-200 px-10 py-8 overflow-y-auto">
        <button
          onClick={closeProduct}
          className="text-gray-400 hover:text-black text-xl self-end"
        >
          ✕
        </button>
        <PanelContent
          product={selectedProduct}
          quantity={quantity}
          setQuantity={setQuantity}
          onClose={closeProduct}
        />
      </div>
    </>
  );
}

function PanelContent({ product, quantity, setQuantity, onClose }: any) {
  const { addToCart } = useCartStore();

  return (
    <div className="mt-4 flex flex-col items-center">
      <Image
        src={product.image}
        alt={product.name}
        width={220}
        height={220}
        className="mx-auto rounded-full"
      />

      <h2 className="text-2xl font-bold mt-6 text-(--primary)">
        {product.name}
      </h2>
      <p className="text-gray-600 text-sm mt-4 text-center leading-relaxed">
        {product.longDescription}
      </p>

      <div className="flex justify-evenly w-full gap-6 mt-6 text-sm text-gray-500">
        <span className="font-semibold text-(--primary) text-sm lg:text-lg">
          {product.price}
        </span>
        <span className="text-(--primary) font-semibold text-sm lg:text-lg">
          {product.timeToCook}
        </span>
        <span className="text-(--primary) font-semibold text-sm lg:text-lg">
          {product.quantityInStock} Pcs Avail
        </span>
      </div>

      <div className="flex  justify-evenly w-full items-center gap-4 mt-6">
        <div className="flex items-center gap-4  rounded-md px-4 py-2">
          <button
            onClick={() => setQuantity((q: number) => Math.max(1, q - 1))}
            className="text-lg font-bold bg-[#F3C294] px-4 py-6 cursor-pointer"
          >
            <FaMinus />
          </button>
          <span className="font-semibold text-xl text-(--primary)">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q: number) => q + 1)}
            className="text-lg font-bold bg-[#F3C294] px-4 py-6 cursor-pointer"
          >
            <FaPlus />
          </button>
        </div>

        <button
          onClick={() => {
            addToCart({
              id: product.id,
              name: product.name,
              image: product.image,
              price: product.price,
              quantity,
            });
            toast.success(`${product.name} added to cart!`, {
              icon: "🛒",
              duration: 3000,
            });
            onClose();
            // optionally show a toast here
          }}
          className="flex-1 bg-gray-900 text-white py-3 rounded-md font-semibold"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
