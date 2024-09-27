import Image from "next/image";
import { pixelify} from "@/fonts/fonts";
import Logo from "@/components/Logo";

export default function Redirect({src="", heading="", paragraph=""}) {
    return (
        <div className=" flex flex-col items-center bg-color-two rounded-[10px] h-[552px] w-[317px] lg:w-[650px] p-8 ">
            <Logo 
                src="/images/logo.svg" 
                alt="logo" 
                logoText="Taskify" 
                textColor="text-white" 
            />
            <div></div>
            <Image
                src={src}
                alt="Redirect Image"
                width={209}
                height={152}
                className="mt-24"
            />
            <div className={`${pixelify.className} flex flex-col justify-center items-center text-color-zero text-center`}>
                <h1 className="font-medium text-2xl">{heading}</h1>
                <p className="mt-4">{paragraph}</p>
            </div>
        </div>
    )
}