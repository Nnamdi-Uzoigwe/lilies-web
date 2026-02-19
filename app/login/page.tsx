import LoginForm from "@/components/login/sections/LoginForm";
import Image from "next/image";

export default function Login() {
  return (
    <div className="flex justify-center items-center h-screen gap-0">
      {/* Image Container */}
      <div className="hidden lg:block relative h-screen w-full">
        <Image src="/login-image.png" fill alt="Login image" />
      </div>
      
      {/* Login Form */}
      <div className="w-full">
      <LoginForm />
      </div>
    </div>
  );
}
