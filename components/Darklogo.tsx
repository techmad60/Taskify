import Image from "next/image";
import { interFont } from "@/fonts/fonts";
export default function Darklogo() {
    return (
        <div className="flex items-center mb-4">
            <Image 
              className=""
              src={"/images/dark-logo.svg"}
              alt="dark-logo"
              width={20}
              height={20}/>
            <p className={`${interFont.className} text-sm font-light text-color-one`}>Taskify</p>
            
        </div>
    )
}