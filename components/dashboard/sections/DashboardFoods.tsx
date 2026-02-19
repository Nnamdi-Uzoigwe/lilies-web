"use client";

import { productData } from "@/app/data/products";
import FoodCard from "../ui/FoodCard";
import ProductPanel from "../ui/ProductPanel";
import { useProductStore } from "@/store/useProductStore";

const DashboardFoods = () => {
  const { selectedProduct } = useProductStore();

  return (
    <div className="flex h-full mt-20">
      {/* Product Grid */}
      <div className="w-full mb-20">
        <div className="grid grid-cols-1 justify-items-center lg:grid-cols-3 gap-6">
          {productData.map((item) => (
            <FoodCard
              key={item.id}
              id={item.id}
              image={item.image}
              name={item.name}
              shortDescription={item.shortDescription}
              longDescription={item.longDescription}
              price={item.price}
              quantityInStock={item.quantityInStock}
              timeToCook={item.timeToCook}
            />
          ))}
        </div>
      </div>

      {/* Product Panel */}
      <ProductPanel />
    </div>
  );
};

export default DashboardFoods;