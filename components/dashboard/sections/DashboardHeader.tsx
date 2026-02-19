
const DashboardHeader = () => {
  return (
    <div>
        {/* User name and greeting */}
        <div className="flex flex-col gap-3">
            <h4 className="text-(--primary) text-lg">Good morning, Nnamdi!</h4>
            <p className="text-gray-300">What delicious meal are you craving today?</p>
        </div>
    </div>
  )
}

export default DashboardHeader