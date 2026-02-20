"use client"

import Link from "next/link";
import { useState } from "react"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Spinner from "@/components/layout/Spinner";

const LoginForm = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password");
      toast.error("Invalid email or password");
    } else {
      toast.success("Logged in successfully!");
      setTimeout(() => {
          router.push("/dashboard"); 
        }, 2000)
    }
  };

  return (
    <div className="flex flex-col gap-6 px-6 lg:px-36">
      <h4 className="text-(--primary) text-center font-semibold text-xl mb-10">Welcome Back!</h4>

      {error && (
        <p className="text-red-500 text-sm text-center">{error}</p>
      )}

      {/* Email Address */}
      <div>
        <input
          type="text"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-[#FBDDBB] p-4 w-full rounded-md"
        />
      </div>

      {/* Password */}
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-[#FBDDBB] p-4 w-full rounded-md"
        />
        <p onClick={() => setShow(show => !show)} className="absolute font-semibold cursor-pointer top-4 right-3">
          {show ? "Hide" : "Show"}
        </p>
      </div>

      <button
        onClick={handleLogin}
        disabled={loading}
        className="bg-[#00302E] p-4 w-full flex justify-center rounded-md text-[#FBDDBB] font-semibold disabled:opacity-60"
      >
        {loading ? <Spinner /> : "LOGIN"}
      </button>

      <div className="mt-4 flex justify-between items-center w-full">
        <Link href="/signup" className="text-(--primary) font-semibold">Create an account</Link>
      </div>
    </div>
  )
}

export default LoginForm