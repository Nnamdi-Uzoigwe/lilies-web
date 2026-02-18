"use client"

import { usePathname } from "next/navigation"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

const HIDDEN_LAYOUT_PATHS = ["/login", "/signup", "/dashboard"]

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const hideLayout = HIDDEN_LAYOUT_PATHS.includes(pathname)

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  )
}

export default ClientLayout