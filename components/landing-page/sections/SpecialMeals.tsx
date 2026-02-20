import { productData } from "@/app/data/products";
import MenuCard from "../ui/MenuCard";

const SpecialMeals = () => {

  return (
    <div className="py-6 lg:py-10 px-6 lg:px-50">
      <div className="flex flex-col mx-auto items-center">
        <h3 className="text-white text-center text-xl lg:text-3xl font-semibold">Special Meals of the day!</h3>
        <p className="text-center text-sm w-full lg:w-1/2  mt-3 text-white">
            Check our sepecials of the day and get discounts on all our meals and
            swift delivery to what ever location within Lagos.
        </p>
      </div>

      {/* Selected Menu */}
      <div className="mt-14 grid grid-cols-1 justify-items-center lg:grid-cols-3">
        {productData.slice(0,3).map((item) => (
          <MenuCard 
            key={item.id}
            title={item.name}
            description={item.shortDescription}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default SpecialMeals;
