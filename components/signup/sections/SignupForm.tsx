// "use client"
    
// import Link from "next/link";
//     import { useState } from "react"
    
//     const SignupForm = () => {
//       const [show, setShow] = useState(false);
//       return (
//         <div className="flex flex-col gap-6 px-6 lg:px-36">
//             <h4 className="text-(--primary) font-semibold text-center text-xl mb-10">Welcome to Lilies!</h4>
    
//             {/* First name */}
//             <div>
//                 <input 
//                     type="text"
//                     placeholder="Your first name"
//                     className="border border-[#FBDDBB] p-4 w-full rounded-md"
//                 />
//             </div>

//             {/* Email Address */}
//             <div>
//                 <input 
//                     type="text"
//                     placeholder="Your email address"
//                     className="border border-[#FBDDBB] p-4 w-full rounded-md"
//                 />
//             </div>
//             {/* Password */}
//             <div className="relative">
//                 <input 
//                     type={show ? "string" : "password"}
//                     placeholder="Your password"
//                     className="border border-[#FBDDBB] p-4 w-full rounded-md"
//                 />
//                 <p onClick={() => setShow(show => !show)} className="absolute font-semibold cursor-pointer top-4 right-3">{show ? "Hide" : "Show"}</p>
//             </div>
    
//             <button className="bg-[#00302E] p-4 w-full min-w-120 rounded-md text-[#FBDDBB] font-semibold">SIGNUP</button>
    
//             <div className="mt-4 flex justify-center w-full">
//                 <p className="text-(--primary)">Already have an account? <Link href="/login" className="font-semibold">LOGIN</Link></p>
//             </div>
//         </div>
//       )
//     }
    
//     export default SignupForm



"use client"

import Link from "next/link";
import { useState } from "react"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SignupForm = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async () => {
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      toast.error(data.error || "Something went wrong");
    } else {
    toast.success("Signed up successfully!")
      setTimeout(() => {
          router.push("/login");
        }, 2000)
    }
  };

  return (
    <div className="flex flex-col gap-6 px-6 lg:px-36">
      <h4 className="text-(--primary) font-semibold text-center text-xl mb-10">Welcome to Lilies!</h4>

      {error && (
        <p className="text-red-500 text-sm text-center">{error}</p>
      )}

      {/* First name */}
      <div>
        <input
          type="text"
          placeholder="Your first name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-[#FBDDBB] p-4 w-full rounded-md"
        />
      </div>

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
        onClick={handleSignup}
        disabled={loading}
        className="bg-[#00302E] p-4 w-full rounded-md text-[#FBDDBB] font-semibold disabled:opacity-60"
      >
        {loading ? "Creating account..." : "SIGNUP"}
      </button>

      <div className="mt-4 flex justify-center w-full">
        <p className="text-(--primary)">Already have an account? <Link href="/login" className="font-semibold">LOGIN</Link></p>
      </div>
    </div>
  )
}

export default SignupForm