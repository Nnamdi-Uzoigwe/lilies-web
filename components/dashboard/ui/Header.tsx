"use client"

import { useSession } from 'next-auth/react';
import { AiOutlineMenu } from 'react-icons/ai';


interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const { data: session } = useSession();
  return (
<div className='h-23 bg-[#f2f2f2] px-4 flex items-center justify-between border-b border-gray-200'>
         {/* Left Section */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 bg-gray-800 rounded-lg transition-colors"
        >
          <AiOutlineMenu size={24} className="text-[#F4F4F5]" />
        </button>
      </div>

      <div className='flex justify-end'>
          <div>
            <div className="bg-[#00302E] h-10 w-10 rounded-full flex justify-center items-center">
            <p className="text-white">{session?.user?.name?.slice(0,2).toUpperCase()  || "G"}</p>
        </div>
          </div>
      </div>
    </div>
  )
}

export default Header