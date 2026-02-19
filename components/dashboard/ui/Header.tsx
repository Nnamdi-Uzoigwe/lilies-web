import React from 'react'
import { AiOutlineMenu } from 'react-icons/ai';


interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
<div className='h-23 bg-[#f2f2f2] px-4 flex items-center border-b border-gray-200'>
         {/* Left Section */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 bg-gray-800 rounded-lg transition-colors"
        >
          <AiOutlineMenu size={24} className="text-[#F4F4F5]" />
        </button>
      </div>
    </div>
  )
}

export default Header