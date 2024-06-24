import Link from "next/link"
import Image from "next/image"
import { interFont } from "@/fonts/fonts"
export default function Navbar () {
    return (
        <nav className={`${interFont.className} bg-primary lg:flex justify-between items-center lg:static`} >
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
            <div  className="cursor-pointer lg:hidden">
              <Image 
                src={"/images/bars.svg"}
                alt="Bars"
                width={24}
                height={24}/>
            </div>
          </div>
        <div className="bg-[#D9D9D9] absolute top-0 right-0 h-screen flex flex-col items-center p-4 sm:p-8 w-1/2 lg:w-auto lg:flex-row lg:static lg:h-auto lg:bg-transparent lg:p-0">
          <Image
            className="lg:hidden" 
            src={"/images/close-bar.svg"}
            alt="Close-Bar"
            width={30}
            height={30}/>
          <div className=" flex flex-col lg:flex-row text-center leading-10 my-12 lg:space-x-6 lg:static text-color-one lg:text-white">
            <Link href="/" className=" hover:text-primary-color transition duration-150 hover:ease-in hover:border-b border-primary-color">
              Home
            </Link>
            <Link href="/about" className="  hover:text-primary-color transition duration-150 hover:ease-in hover:border-b border-primary-color">
              Features
            </Link>
            <Link href="/contact" className="  hover:text-primary-color transition duration-150 hover:ease-in hover:border-b border-primary-color">
              Testimonials
            </Link>
            <Link href="/contact" className="  hover:text-primary-color transition duration-150 hover:ease-in hover:border-b border-primary-color">
              Contact Us
            </Link>
          </div>

          <div className="flex flex-col lg:hidden">
            <Link href="/login" className="bg-primary-color px-4 py-1 mb-4  text-color-one rounded-sm hover:bg-sky-400 transition duration-150 hover:ease-in">
              Login
            </Link>
            <Link href="/signup" className=" text-primary-color border-2 border-primary-color rounded-sm px-4 py-1  hover:border-sky-400 hover:text-sky-400 transition duration-150 hover:ease-in">
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