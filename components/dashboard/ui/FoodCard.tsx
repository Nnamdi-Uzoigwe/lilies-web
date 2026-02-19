import Image from "next/image";
import Link from "next/link";

interface FoodCardProps {
    image: string;
    name: string;
    shortDescription: string;
    price: string;
}

const FoodCard = ({ image, name, shortDescription, price }: FoodCardProps) => {
  return (
    <Link href="/" className="border border-gray-200 h-auto max-h-80 p-4 rounded-md flex flex-col gap-3 items-center">
        <Image 
            src={image}
            width={120}
            height={120}
            alt="image"
        />
        <h3 className="text-lg text-(--primary) font-semibold">{name}</h3>
        <p className="text-gray-600 text-sm text-center">
            {shortDescription}
        </p>

        <div className="mt-6 flex w-full justify-between items-center">
            <p className="font-semibold text-sm text-(--primary)">{price}</p>

            {/* Add to Cart button */}
            <button className="text-sm font-semibold text-[#06E775]">
                Add to Cart
            </button>
        </div>
    </Link>

  )
}

export default FoodCard