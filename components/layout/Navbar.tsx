import Image from "next/image"
import Link from "next/link"

const Navbar = () => {
  return (
    <div className="bg-(--primary) px-50 py-20 h-22.5 flex justify-between items-center">
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

        {/* links */}
        <div>
            <Link href="/">
                Home
            </Link>

            <Link href="/login">
                Login
            </Link>

            <Link href="/signup">
                Signup
            </Link>
        </div>
    </div>
  )
}

export default Navbar