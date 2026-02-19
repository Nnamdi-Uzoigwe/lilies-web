import { productData } from "@/app/data/products"
import FoodCard from "../ui/FoodCard"
const DashboardFoods = () => {
  return (
    <div className="mt-20 grid grid-cols-1 justify-items-center lg:grid-cols-3 gap-6">
        {productData.map((item) => (
          <FoodCard 
            key={item.id}
            image={item.image}
            name={item.name}
            shortDescription={item.shortDescription}
            price={item.price}
          />

        ))}
    </div>
  )
}

export default DashboardFoods