"use client";

import Image from "next/image";
import { useProductStore } from "@/store/useProductStore";

interface FoodCardProps {
  id: string;
  image: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  price: string;
  quantityInStock: number;
  timeToCook: string;
}

const FoodCard = ({ id, image, name, shortDescription, longDescription, price, timeToCook, quantityInStock }: FoodCardProps) => {
  const { setSelectedProduct } = useProductStore();

  return (
    <div
      onClick={() => setSelectedProduct({ id, image, name, shortDescription, longDescription, price, timeToCook, quantityInStock })}
      className="border border-gray-200 h-auto max-h-80 p-4 rounded-md flex flex-col gap-3 items-center cursor-pointer hover:shadow-md transition-shadow w-full"
    >
      <Image src={image} width={120} height={120} alt={name} />
      <h3 className="text-lg text-(--primary) font-semibold">{name}</h3>
      <p className="text-gray-600 text-sm text-center">{shortDescription}</p>
      <div className="mt-6 flex w-full justify-between items-center">
        <p className="font-semibold text-sm text-(--primary)">{price}</p>
        <button className="text-sm font-semibold text-[#06E775]">Add to Cart</button>
      </div>
    </div>
  );
};

export default FoodCard;