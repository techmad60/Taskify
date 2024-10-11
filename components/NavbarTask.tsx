'use client'
import {useState, useEffect} from 'react';
import Link from "next/link";
import Image from "next/image";
import { interFont } from "@/fonts/fonts";
import { usePathname } from 'next/navigation';
import {FaTimes, FaEye, FaBell, FaSignOutAlt, FaMagic } from 'react-icons/fa';
import Logo from './Logo';

export default function NavbarTasks () {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname()
  const handleToggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  // Function to determine if a link is active
  const isActiveLink = (href: string) => pathname === href;
  

  useEffect(() => {
    // Add or remove a class to the body and html to disable/enable scrolling
    const body = document.body;
    const html = document.documentElement;

    if (isNavOpen) {
      body.style.overflow = 'hidden';
      html.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'visible';
      html.style.overflow = 'visible';
    }
    // Clean up the effect on component unmount
    return () => {
      body.style.overflow = 'visible';
      html.style.overflow = 'visible';
    };
  }, [isNavOpen])

  
   


  return (
    <nav className={`${interFont.className} lg:flex justify-between lg:self-center items-center`} >
      <div className="flex justify-between items-center">
        <Logo src='/images/logo.svg' logoText='Taskify' textColor='text-white'/>
        <div className="cursor-pointer lg:hidden" onClick={handleToggleNav}>
            <Image 
            src={"/images/bars.svg"}
            alt="Bars"
            width={24}
            height={24}/>
        </div>
      </div>
      {isNavOpen && (
      <div
        className="fixed top-0 left-0 w-[25vw]  min-h-screen bg-black opacity-50 z-50 lg:hidden"
        onClick={handleToggleNav} 
      />
      )}
      <div className={`bg-color-two absolute top-0 right-0 h-screen flex flex-col items-center p-4 sm:p-8 w-3/4 lg:w-auto lg:flex-row lg:static lg:h-auto lg:bg-transparent lg:p-0 ${isNavOpen ? 'fixed' : 'hidden lg:flex'} `}>
        <button onClick={handleToggleNav} className="lg:hidden">
          <FaTimes size={24} className='text-white'/>
        </button>
        
        <div className="flex flex-col text-center leading-[60px] my-12 text-xl lg:flex-row lg:text-sm lg:text-h2-color">
          <div className='flex flex-col justify-between items-center flex-grow space-y-10 lg:space-y-0 lg:flex-row lg:space-x-24'>
            <Link href="/mainpage" className={`${isActiveLink('/mainpage') ? 'text-[#786F21] border-b border-[#786F21]' : ''} hover:text-[#786F21] transition duration-150 hover:ease-in nav-title flex items-center gap-2 text-white`}>
              <p>Main Page</p>
            </Link>

            <Link href="/scheduled-page" className={`${isActiveLink('/scheduled-page') ? 'text-[#786F21] border-b border-[#786F21]' : ''} hover:text-[#786F21] transition duration-150 hover:ease-in nav-title flex items-center gap-2 text-white`}>
              <p><FaMagic/></p>
              <p>Magic Button</p>
            </Link>

            <Link href="/taskdetails" className={`${isActiveLink('/taskdetails') ? 'text-[#786F21] border-b border-[#786F21]' : ''} hover:text-[#786F21] transition duration-150 hover:ease-in nav-title flex items-center gap-2 text-white`}>
              <p><FaEye/></p>
              <p>Tasks Details</p>
            </Link>

            <button className={`${isActiveLink('/services') ? 'text-[#786F21] border-b border-[#786F21]' : ''} hover:text-[#786F21] transition duration-150 hover:ease-in nav-title flex items-center gap-2 text-white`}>
              <p><FaBell/></p>
              <p>Notifications</p>
            </button>

            <Link href="/faqs" className={`${isActiveLink('/faqs') ? 'text-[#786F21] border-b border-[#786F21]' : ''} hover:text-[#786F21] transition duration-150 hover:ease-in nav-title flex items-center gap-2 text-red-500`}>
              <p>Log out</p>
              <p><FaSignOutAlt/></p>
            </Link>
          </div>
          
            {/* <div className="flex flex-col space-y-6 mt-12 lg:flex lg:flex-row lg:space-x-4 lg:space-y-0 lg:items-center lg:mt-0">
              <Link href="/login" className="bg-btn-two-color lg:px-4 lg:py-2 rounded-md transition duration-150 hover:ease-in text-white">
              Login
              </Link>
              <Link href="/signup" className=" text-btn-two-color border border-btn-two-color rounded-md lg:px-4 lg:py-2 transition duration-150 hover:ease-in">
              Signup
              </Link>
            </div> */}
        </div>
      </div>
    </nav>
  )
}