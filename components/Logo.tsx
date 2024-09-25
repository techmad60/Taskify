import Image from "next/image";
import { interFont } from "@/fonts/fonts";

export default function Logo({ src = "", alt = "logo", logoText = "Taskify", textColor = "text-color-one" }) {
    return (
        <div className="flex items-center">
            <Image 
              className=""
              src={src} 
              alt={alt} 
              width={20}
              height={20}
            />
            <p className={`${interFont.className} text-sm font-light ${textColor}`}>
              {logoText}
            </p>
        </div>
    );
}
