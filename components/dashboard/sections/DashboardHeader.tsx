
const DashboardHeader = () => {
    const username = "Nnamdi"
  return (
    <div className="flex justify-between items-center">
        {/* User name and greeting */}
        <div className="flex flex-col gap-3">
            <h4 className="text-(--primary) font-semibold text-lg lg:text-2xl">Good morning, {username}!</h4>
            <p className="text-gray-600 text-sm lg:text-md">What delicious meal are you craving today?</p>
        </div>

        {/* User Avatar */}
        <div className="bg-[#00302E] h-10 w-10 rounded-full flex justify-center items-center">
            <p className="text-white">{username.slice(0,2).toUpperCase()}</p>
        </div>
    </div>
  )
}

export default DashboardHeader