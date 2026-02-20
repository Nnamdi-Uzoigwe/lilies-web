import Image from "next/image";

const Hero = () => {
  return (
    <div className="py-10 flex flex-col-reverse lg:flex-row items-center px-6 lg:px-50 justify-between">
      {/* Content */}
      <div className="flex flex-col gap-4 mt-4 lg:mt-0">
        <h1 className="text-white text-center lg:text-left font-semibold text-2xl lg:text-5xl w-full lg:w-[80%]">
          Order <span className="text-[#FBDDBB]">food</span> anywhere, anytime
        </h1>
        <p className="w-full lg:w-[70%] text-center lg:text-left  mb-0 pb-0 text-white">
          Browse from our list of specials to place your order and have food
          delivered to you in no time. Affordable, tasty and fast!
        </p>

        {/* badges */}
        <div className="mt-0 pt-0 flex gap-2 justify-center lg:justify-start items-center">
            <Image
              src="/playstore-badge.png"
              height={120}
              width={160}
              alt="Playstore badge image"
            />
   
            <Image src="/appstore-badge.png" height={120} width={160} alt="Appstore badge image" />
        </div>
      </div>
      {/* Image */}
      <div className="relative h-60 lg:h-100 w-60 lg:w-100">
        <Image src="/hero-image.png" fill alt="hero image" />
      </div>
    </div>
  );
};

export default Hero;
