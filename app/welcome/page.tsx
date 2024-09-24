import Image from "next/image";
import { pixelify } from "@/fonts/fonts";
import Logo from "@/components/Logo";
import Button from "@/components/Button";


export default function WelcomePage () {
    return (
        <div className=" flex flex-col items-center bg-color-two rounded-[10px] h-[552px] w-[552px] lg:w-[650px] justify-around">
            <Logo 
                src="/images/logo.svg" 
                alt="logo" 
                logoText="Taskify" 
                textColor="text-white" 
            />
            <Image
                src={"/images/welcome.svg"}
                alt="Welcome Image"
                width={209}
                height={152}
                className=""
            />
            {/* <Image
                src={"/images/welcome-desktop.svg"}
                alt="Welcome Image"
                width={418}
                height={304}
                className="hidden lg:flex"
            /> */}
            <div className={`${pixelify.className} flex flex-col justify-center items-center text-color-zero`}>
                <h1 className="font-medium text-2xl">Welcome Techmad!</h1>
                <p>Let&apos;s do great things!</p>
            </div>
            <Button/>
        </div>
    )
}