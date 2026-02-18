import MenuCard from "../ui/MenuCard";

const SpecialMeals = () => {
  const menuData = [
    {
      id: 1,
      title: "Stir Fry Pasta",
      description: "Stir fry pasta yada yada yada because of Sesan",
      image: "/pasta-img.svg"
    },
    {
      id: 2,
      title: "Meat Balls",
      description: "Stir fry pasta yada yada yada because of Sesan",
      image: "/meatball-img.svg"
    },
    {
      id: 3,
      title: "Burger Meal",
      description: "Stir fry pasta yada yada yada because of Sesan",
      image: "burgermeal-img.svg"
    },
  ];

  return (
    <div className="py-6 lg:py-10 px-6 lg:px-50">
      <div className="flex flex-col mx-auto items-center">
        <h3 className="text-white text-center text-3xl font-semibold">Special Meals of the day!</h3>
        <p className="text-center text-sm w-full lg:w-1/2  mt-3 text-white">
            Check our sepecials of the day and get discounts on all our meals and
            swift delivery to what ever location within Lagos.
        </p>
      </div>

      {/* Selected Menu */}
      <div className="mt-14 grid grid-cols-1 justify-items-center lg:grid-cols-3">
        {menuData.map((item) => (
          <MenuCard 
            key={item.id}
            title={item.title}
            description={item.description}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default SpecialMeals;
