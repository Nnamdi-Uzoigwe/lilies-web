import SignupForm from "@/components/signup/sections/SignupForm";
import Image from "next/image";

export default function Signup() {
    return (
        <div className="flex justify-center items-center h-screen gap-0">
              {/* Image Container */}
              <div className="hidden lg:block relative h-screen w-full">
                <Image src="/signup-image.png" fill alt="Login image" />
              </div>
              
              {/* Login Form */}
              <div className="w-full">
                <SignupForm />
              </div>
            </div>
    )
}