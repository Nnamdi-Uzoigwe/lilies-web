"use client"
    
import Link from "next/link";
    import { useState } from "react"
    
    const SignupForm = () => {
      const [show, setShow] = useState(false);
      return (
        <div className="flex flex-col justify-center items-center gap-6 px-6 lg:px-36">
            <h4 className="text-(--primary) font-semibold text-xl mb-10">Welcome to Lilies!</h4>
    
            {/* First name */}
            <div>
                <input 
                    type="text"
                    placeholder="Your first name"
                    className="border border-[#FBDDBB] p-4 w-full min-w-120 rounded-md"
                />
            </div>

            {/* Email Address */}
            <div>
                <input 
                    type="text"
                    placeholder="Your email address"
                    className="border border-[#FBDDBB] p-4 w-full min-w-120 rounded-md"
                />
            </div>
            {/* Password */}
            <div className="relative">
                <input 
                    type={show ? "string" : "password"}
                    placeholder="Your password"
                    className="border border-[#FBDDBB] p-4 w-full min-w-120 rounded-md"
                />
                <p onClick={() => setShow(show => !show)} className="absolute font-semibold cursor-pointer top-4 right-3">{show ? "Hide" : "Show"}</p>
            </div>
    
            <button className="bg-[#00302E] p-4 w-full min-w-120 rounded-md text-[#FBDDBB] font-semibold">SIGNUP</button>
    
            <div className="mt-4 flex justify-center w-full">
                <p className="text-(--primary)">Already have an account? <Link href="/login" className="font-semibold">LOGIN</Link></p>
            </div>
        </div>
      )
    }
    
    export default SignupForm