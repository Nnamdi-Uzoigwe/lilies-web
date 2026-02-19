"use client"

import { useSession } from "next-auth/react"

const DashboardHeader = () => {
    const { data: session } = useSession();
  return (
    <div className="flex justify-between items-center">
        {/* User name and greeting */}
        <div className="flex flex-col gap-3">
            <h4 className="text-(--primary) font-semibold text-lg lg:text-2xl">Good morning, {session?.user?.name}!</h4>
            <p className="text-gray-600 text-sm lg:text-md">What delicious meal are you craving today?</p>
        </div>
    </div>
  )
}

export default DashboardHeader