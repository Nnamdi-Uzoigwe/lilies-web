import Image from "next/image"


const Footer = () => {
  return (
    <div className="bg-[#0B0D17] text-white py-10 px-6 lg:px-50">
        {/* logo */}
        <div className="flex gap-2 items-center">
            <Image
            src="/lilies-logo.svg"
            height={50}
            width={50}
            alt="Lilie Logo"
            />
            <span className="text-xl text-white">Lilies</span>
        </div>    
    </div>
  )
}

export default Footer