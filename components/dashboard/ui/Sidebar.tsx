// import Image from "next/image";
// import React from "react";
// import { AiOutlineClose } from "react-icons/ai";
// import { MdOutlineShoppingCart } from "react-icons/md";
// import { RiLogoutCircleRLine } from "react-icons/ri";
// import { TbLayoutDashboard } from "react-icons/tb";
// import { LuCreditCard } from "react-icons/lu";
// import { FaCircleUser } from "react-icons/fa6";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useCartStore } from "@/store/useCartStore";

// interface SidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// interface MenuItem {
//   id: string;
//   label: string;
//   icon: React.ReactNode;
//   href: string;
//   exact?: boolean;
// }

// export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
//   const pathname = usePathname();
//   const totalItems = useCartStore((state) => state.totalItems());

//   const menuItems: MenuItem[] = [
//     {
//       id: "dashboard",
//       label: "Dashboard",
//       icon: <TbLayoutDashboard size={22} />,
//       href: "/dashboard",
//       exact: true,
//     },
//     {
//       id: "profile",
//       label: "Your Profile",
//       icon: <FaCircleUser size={22} />,
//       href: "/dashboard/profile",
//     },
//     {
//       id: "orders",
//       label: "Your Orders",
//       icon: <LuCreditCard size={22} />,
//       href: "/dashboard/orders",
//     },
//     {
//       id: "cart",
//       label: "Your Cart",
//       icon: <MdOutlineShoppingCart size={22} />,
//       href: "/dashboard/cart",
//     },
//     {
//       id: "logout",
//       label: "Logout",
//       icon: <RiLogoutCircleRLine size={22} />,
//       href: "/logout",
//       exact: true,
//     },
//   ];

//   const activePath = pathname === "/" ? "/dashboard" : pathname;

//   const isItemActive = (item: MenuItem): boolean => {
//     if (item.exact) {
//       return activePath === item.href;
//     }
//     return activePath === item.href || activePath.startsWith(`${item.href}/`);
//   };

//   return (
//     <>
//       {/* Mobile Overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 bg-opacity-50 z-40 lg:hidden"
//           onClick={onClose}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`
//           fixed inset-y-0 left-0 z-50
//           bg-[#f2f2f2]
//           transform transition-all duration-300 ease-in-out
//           w-64 flex flex-col
//           ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
//         `}
//       >
//         {/* Logo Section */}
//         <div className="mt-10 transition-all duration-300 ease-in-out px-6 py-4">
//           <div className="flex justify-center items-start flex-row">
//             {/* Logo + Text */}
//             <div className="flex gap-2 transition-all duration-300 ease-in-out items-center">
//               <div className="relative h-12 lg:h-18 w-12 lg:w-18">
//                 <Image
//                   src="/lilies-logo.svg"
//                   fill
//                   alt="lilies logo image"
//                   className="object-contain transition-transform duration-300 ease-in-out scale-100"
//                 />
//               </div>
//               <h1 className="text-xl font-semibold my-3">Lilies</h1>
//             </div>

//             {/* Mobile close button */}
//             <button
//               onClick={onClose}
//               className="lg:hidden absolute top-4 right-3 p-2 bg-gray-800 text-white rounded-lg"
//             >
//               <AiOutlineClose size={20} />
//             </button>
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 overflow-y-auto px-4 py-4">
//           <ul className="space-y-2">
//             {menuItems.map((item) => {
//               const isActive = isItemActive(item);

//               return (
//                 <li key={item.id}>
//                   <Link
//                     href={item.href}
//                     onClick={() => {
//                       if (window.innerWidth < 1024) onClose();
//                     }}
//                     className={`
//                       flex items-center px-4 py-3 rounded-lg
//                       transition-all duration-200 space-x-3
//                       ${
//                         isActive
//                           ? "bg-[#00302E] text-white font-medium shadow-lg"
//                           : "hover:bg-[#00302E] hover:text-white"
//                       }
//                     `}
//                   >
//                     <span className={isActive ? "text-white" : ""}>
//                       {item.icon}
//                     </span>
//                     <span className="block">{item.label}</span>
//                     {/* Badge — only on cart */}
//                     {item.id === "cart" && totalItems > 0 && (
//                       <span className="bg-[#06E775] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
//                         {totalItems > 9 ? "9+" : totalItems}
//                       </span>
//                     )}
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>
//         </nav>
//       </aside>
//     </>
//   );
// };



"use client";

import Image from "next/image";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineShoppingCart } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { TbLayoutDashboard } from "react-icons/tb";
import { LuCreditCard } from "react-icons/lu";
import { FaCircleUser } from "react-icons/fa6";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { signOut } from "next-auth/react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  exact?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const totalItems = useCartStore((state) => state.totalItems());

  const menuItems: MenuItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <TbLayoutDashboard size={22} />,
      href: "/dashboard",
      exact: true,
    },
    {
      id: "profile",
      label: "Your Profile",
      icon: <FaCircleUser size={22} />,
      href: "/dashboard/profile",
    },
    {
      id: "orders",
      label: "Your Orders",
      icon: <LuCreditCard size={22} />,
      href: "/dashboard/orders",
    },
    {
      id: "cart",
      label: "Your Cart",
      icon: <MdOutlineShoppingCart size={22} />,
      href: "/dashboard/cart",
    },
  ];

  const activePath = pathname === "/" ? "/dashboard" : pathname;

  const isItemActive = (item: MenuItem): boolean => {
    if (item.exact) return activePath === item.href;
    return activePath === item.href || activePath.startsWith(`${item.href}/`);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          bg-[#f2f2f2]
          transform transition-all duration-300 ease-in-out
          w-64 flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="mt-10 px-6 py-4">
          <div className="flex justify-center items-center flex-row relative">
            <div className="flex gap-2 items-center">
              <div className="relative h-12 lg:h-18 w-12 lg:w-18">
                <Image
                  src="/lilies-logo.svg"
                  fill
                  alt="lilies logo"
                  className="object-contain"
                />
              </div>
              <h1 className="text-xl font-semibold">Lilies</h1>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden absolute top-0 right-0 p-2 bg-gray-800 text-white rounded-lg"
            >
              <AiOutlineClose size={20} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = isItemActive(item);
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={() => {
                      if (window.innerWidth < 1024) onClose();
                    }}
                    className={`
                      flex items-center px-4 py-3 rounded-lg
                      transition-all duration-200 space-x-3
                      ${isActive
                        ? "bg-[#00302E] text-white font-medium shadow-lg"
                        : "hover:bg-[#00302E] hover:text-white"
                      }
                    `}
                  >
                    <span className={isActive ? "text-white" : ""}>{item.icon}</span>
                    <span className="block">{item.label}</span>
                    {item.id === "cart" && totalItems > 0 && (
                      <span className="bg-[#06E775] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {totalItems > 9 ? "9+" : totalItems}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout at bottom */}
        <div className="px-4 py-6 border-t border-gray-200">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 space-x-3 hover:bg-red-50 hover:text-red-500 text-gray-500"
          >
            <RiLogoutCircleRLine size={22} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};