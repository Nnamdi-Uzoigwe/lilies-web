import Image from "next/image"

interface MenuCardProps {
    image: string,
    title: string,
    description: string
}

const MenuCard = ({ image, title, description }: MenuCardProps) => {
  return (
    <div className="flex flex-col gap-3 items-center mb-8">
        {/* Image */}
        <div className="relative h-50 w-50">
            <Image
                src={image}
                fill
                alt="food image"
            />
        </div>
        <h3 className="text-lg font-semibold text-center text-[#FBDDBB]">{title}</h3>
        <p className="text-white text-center">{description}</p>
    </div>
  )
}

export default MenuCard