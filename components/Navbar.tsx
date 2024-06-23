import Link from "next/link"
import Image from "next/image"
import { interFont } from "@/fonts/fonts"
export default function Navbar () {
    return (
        <nav className=" bg-primary lg:flex justify-between ">
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
        <div className="space-x-6 hidden lg:flex">
          <Link href="/" className="text-white">
            Home
          </Link>
          <Link href="/about" className=" text-white">
            Features
          </Link>
          <Link href="/contact" className=" text-white">
            Testimonials
          </Link>
          <Link href="/contact" className=" text-white">
            Contact Us
          </Link>
        </div>
        <div className="lg:flex  space-x-6 hidden">
          <Link href="/login" className=" text-white">
            Login
          </Link>
          <Link href="/signup" className=" bg-secondary text-white rounded">
            Signup
          </Link>
        </div>
      </nav>
    )
}