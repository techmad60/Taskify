import Image from "next/image";
import { pixelify} from "@/fonts/fonts";
import Logo from "@/components/Logo";

export default function RedirectPage () {
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
                src={"/images/redirect.svg"}
                alt="Redirect Image"
                width={209}
                height={152}
                className="mt-24"
            />
            <div className={`${pixelify.className} flex flex-col justify-center items-center text-color-zero text-center`}>
                <h1 className="font-medium text-2xl">You&apos;re almost there!</h1>
                <p className="mt-4" >Check your email for a verification token!</p>
            </div>
        </div>
    )
}