'use client'
import {useState, useEffect} from 'react';
import Link from "next/link";
import Image from "next/image";
import { interFont } from "@/fonts/fonts";

export default function Navbar () {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const handleToggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

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
    <nav className={`${interFont.className} bg-primary lg:flex justify-between lg:self-center items-center lg:static `} >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
            <Image 
            className=""
            src={"/images/logo.svg"}
            alt="Taskify-logo"
            width={24}
            height={24}/>
          <p className={`${interFont.className} text-white`}>Taskify</p>
        </div>
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
      <div className={`bg-[#D9D9D9] absolute top-0 right-0 h-screen flex flex-col items-center p-4 sm:p-8 w-3/4 lg:w-auto lg:flex-row lg:static lg:h-auto lg:bg-transparent lg:p-0 ${isNavOpen ? 'fixed' : 'hidden lg:flex'} `}>
        <button onClick={handleToggleNav} className="lg:hidden">
          <Image
            className="" 
            src={"/images/close-bar.svg"}
            alt="Close-Bar"
            width={30}
            height={30}/>
        </button>
        
        <div className="flex flex-col text-center leading-[60px] my-12 text-color-one text-xl lg:flex-row lg:text-base lg:space-x-6 lg:static lg:text-white">
          <Link href="/" className=" hover:text-primary-color transition duration-150 hover:ease-in border-primary-color">
            Home
          </Link>
          <Link href="/about" className="  hover:text-primary-color transition duration-150 hover:ease-in border-primary-color">
            Features
          </Link>
          <Link href="/contact" className="  hover:text-primary-color transition duration-150 hover:ease-in border-primary-color">
            Testimonials
          </Link>
          <Link href="/contact" className="  hover:text-primary-color transition duration-150 hover:ease-in border-primary-color">
            Contact Us
          </Link>
        </div>

        <div className="flex flex-col lg:hidden">
          <Link href="/login" className="bg-primary-color px-4 py-2 mb-6  text-color-one rounded-md hover:bg-sky-400 transition duration-150 hover:ease-in text-center text-xl">
            Login
          </Link>
          <Link href="/signup" className=" text-primary-color border-2 border-primary-color rounded-md px-4 py-2  hover:border-sky-400 hover:text-sky-400 transition duration-150 hover:ease-in text-xl">
            Signup
          </Link>
        </div>
      </div>


      <div className="hidden  lg:flex lg:flex-row lg:space-x-6 lg:static lg:items-center ">
        <Link href="/login" className="bg-primary-color px-4 py-1  text-color-one rounded-sm hover:bg-sky-400 transition duration-150 hover:ease-in">
          Login
        </Link>
        <Link href="/signup" className=" text-primary-color border-2 border-primary-color rounded-sm px-4 py-1  hover:border-sky-400 hover:text-sky-400 transition duration-150 hover:ease-in">
          Signup
        </Link>
      </div>
    </nav>
  )
}