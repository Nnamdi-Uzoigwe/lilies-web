import SignupForm from "@/components/signup/sections/SignupForm";
import Image from "next/image";

export default function Signup() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen h-auto gap-0">
              {/* Image Container */}
              <div className="hidden lg:block relative  w-full">
                <Image src="/signup-image.png" fill alt="Login image" />
              </div>
              
              {/* Login Form */}
              <SignupForm />
            </div>
    )
}