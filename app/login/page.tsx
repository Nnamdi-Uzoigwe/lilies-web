import LoginForm from "@/components/login/sections/LoginForm";
import Image from "next/image";

export default function Login() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen h-auto gap-0">
      {/* Image Container */}
      <div className="hidden lg:block relative  w-full">
        <Image src="/login-image.png" fill alt="Login image" />
      </div>
      
      {/* Login Form */}
      <LoginForm />
    </div>
  );
}
