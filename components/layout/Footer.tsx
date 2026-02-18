import Image from "next/image"
import { FaInstagram, FaYoutube } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"


const Footer = () => {
  return (
    <section className="bg-[#0B0D17] text-white ">

        <div className="py-10 px-6 lg:px-50 flex flex-col lg:flex-row justify-between">
            <div>
                <h4 className="text-lg font-semibold mb-6">Company</h4>
                
                <div className="flex flex-col gap-2">
                    <p>About Us</p>
                    <p>Careers</p>
                    <p>Contact Us</p>
                </div>
            </div> 

            <div>
                <h4 className="text-lg font-semibold mb-6">Support</h4>
                
                <div>
                    <p>Help Center</p>
                    <p>Safety Center</p>
                </div>
            </div> 

            <div>
                <h4 className="text-lg font-semibold mb-6">Legal</h4>
                
                <div>
                    <p>Cookies Policy</p>
                    <p>Privacy Policy</p>
                    <p>Terms of Service</p>
                    <p>Dispute Resolution</p>
                </div>
            </div> 

            <div>
                <h4 className="text-lg font-semibold mb-6">Install App</h4>
                
                <div className="flex flex-col gap-4">

                    <Image 
                        src="/playstore-badge.svg"
                        height={120}
                        width={120}
                        alt="Playstore badge"
                    />
                
                    <Image 
                        src="/appstore-badge.svg"
                        height={120}
                        width={120}
                        alt="Appstore badge"
                        />
                        </div>
            
            </div> 
        </div>

        <div className="border-t border-gray-600 py-6 px-6 lg:px-50 flex justify-between items-center">
            <p className="text-sm">
                &copy; 2026 LILIES, All rights reserved
            </p>

            <div className="flex gap-6 items-center">
                <div className="bg-[#626060] w-8 h-8 rounded-full flex justify-center items-center">
                    <FaInstagram />
                </div>
                <div className="bg-[#626060] w-8 h-8 rounded-full flex justify-center items-center">
                    <FaXTwitter />
                </div>
                <div className="bg-[#626060] w-8 h-8 rounded-full flex justify-center items-center">
                    <FaYoutube />
                </div>
            </div>
        </div>
    </section>
  )
}

export default Footer