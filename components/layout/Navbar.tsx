"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { IoCloseOutline } from "react-icons/io5"
import { HiMenu } from "react-icons/hi"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-(--primary) px-6 lg:px-50 py-14 h-22.5 flex justify-between items-center relative">
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

      {/* desktop links */}
      <div className="hidden md:flex items-center gap-10">
        <Link href="/" className="text-white">
          Home
        </Link>
        <Link href="/login" className="text-white">
          Login
        </Link>
        <Link href="/signup" className="bg-[#FBDDBB] p-2 font-semibold rounded-md text-(--primary)">
          Signup
        </Link>
      </div>

      {/* hamburger / close button */}
      <button
        className="md:hidden bg-[#FBDDBB] cursor-pointer rounded-md text-(--primary) p-2"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <IoCloseOutline size={30} /> : <HiMenu size={28} />}
      </button>

      {/* mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-(--primary) flex flex-col items-start gap-6 px-8 py-6 md:hidden z-50">
          <Link href="/" className="text-white w-full" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link href="/login" className="text-white w-full" onClick={() => setMenuOpen(false)}>
            Login
          </Link>
          <Link
            href="/signup"
            className="bg-[#FBDDBB] px-4 py-2 font-semibold rounded-md text-(--primary)"
            onClick={() => setMenuOpen(false)}
          >
            Signup
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar