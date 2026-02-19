"use client"

import Link from "next/link";
import { useState } from "react"

const LoginForm = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col gap-6 px-6 lg:px-36">
        <h4 className="text-(--primary) text-center font-semibold text-xl mb-10">Welcome Back!</h4>

        {/* Email Address */}
        <div>
            <input 
                type="text"
                placeholder="Your email address"
                className="border border-[#FBDDBB] p-4 w-full rounded-md"
            />
        </div>
        {/* Password */}
        <div className="relative">
            <input 
                type={show ? "string" : "password"}
                placeholder="Your password"
                className="border border-[#FBDDBB] p-4 w-full rounded-md"
            />
            <p onClick={() => setShow(show => !show)} className="absolute font-semibold cursor-pointer top-4 right-3">{show ? "Hide" : "Show"}</p>
        </div>

        <button className="bg-[#00302E] p-4 w-full rounded-md text-[#FBDDBB] font-semibold">LOGIN</button>

        <div className="mt-4 flex justify-between items-center w-full">
            <Link href="/signup" className="text-(--primary) font-semibold">Create an account</Link>
            <p className="text-(--primary) font-semibold">Forgot Password?</p>
        </div>
    </div>
  )
}

export default LoginForm