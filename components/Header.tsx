import Image from "next/image"
import { interFont} from "../fonts/fonts";
export default function Header() {
    return (
        <header className="flex flex-col bg-color-one p-4 sm:p-8 lg:px-16">
        <div className="flex justify-between items-center ">
          <div className="flex items-center">
              <Image 
              className=""
              src={"/images/logo.svg"}
              alt="Taskify-logo"
              width={24}
              height={24}/>
            <p className={`${interFont.className} text-white`}>Taskify</p>
          </div>
          <div>
            <Image 
              className=""
              src={"/images/bars.svg"}
              alt="Bars"
              width={24}
              height={24}/>
          </div>
        </div>
      </header>
    )
}