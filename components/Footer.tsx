import Image from "next/image";
import { interFont, poppinsFont, } from "../fonts/fonts";
export default function Footer() {
    return(
        <footer className="bg-color-one flex flex-col items-center mt-16 p-4 py-12">
        <div className="flex items-center">
          <Image 
          className=""
          src={"/images/logo.svg"}
          alt="Taskify-logo"
          width={35}
          height={35}/>
        <p className={`${interFont.className} text-white text-lg font-semibold`}>Taskify</p>
        </div>
        <nav className="text-center text-white py-12">
          <ul>
            <li className="py-2"><a href="">Home</a></li>
            <li className="py-2"><a href="">Features</a></li>
            <li className="py-2"><a href="">Testimonials</a></li>
            <li className="py-2"><a href="">Contact Us</a></li>
          </ul>
        </nav>
        <div className="flex space-x-6">
          <a href="">
            <Image 
              className=""
              src={"/images/facebook-logo.svg"}
              alt="facebook-logo"
              width={30}
              height={30}/>
          </a>
          <a href="">
            <Image 
              className=""
              src={"/images/x-logo.svg"}
              alt="X-logo"
              width={30}
              height={30}/>
          </a>
          <a href="">
            <Image 
              className=""
              src={"/images/github-logo.svg"}
              alt="Github-logo"
              width={30}
              height={30}/>
          </a>
          <a href="">
            <Image 
              className=""
              src={"/images/linkedin-logo.svg"}
              alt="LinkedIn-logo"
              width={30}
              height={30}/>
          </a>
        </div>
        <p className={`${poppinsFont.className} text-center text-xs text-white mt-12`}>Designed and built with love by <span className="text-primary-color">Techmad</span> </p>
      </footer>
    )
}