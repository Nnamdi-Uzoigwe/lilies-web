"use client"

import { usePathname } from "next/navigation"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { SessionProvider, useSession } from "next-auth/react"
import { useCartStore } from "@/store/useCartStore"
import { useEffect } from "react"
import { Toaster } from "react-hot-toast";

function CartHydrator() {
  const { data: session } = useSession();
  const hydrateCart = useCartStore((s) => s.hydrateCart);

  useEffect(() => {
    if (session?.user) hydrateCart();
  }, [session]);

  return null;
}

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const hideLayout = pathname.startsWith("/dashboard") || ["/login", "/signup"].includes(pathname)

  return (
    <SessionProvider>
      <CartHydrator />
      <Toaster position="top-right" />
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </SessionProvider>
  )
}

export default ClientLayout