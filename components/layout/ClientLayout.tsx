"use client"

import { usePathname } from "next/navigation"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const hideLayout = pathname.startsWith("/dashboard") || ["/login", "/signup"].includes(pathname)

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  )
}

export default ClientLayout