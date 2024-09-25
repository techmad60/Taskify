import Logo from "@/components/Logo";
import Image from "next/image";
export default function MainPage() {
    return (
        <div className="flex flex-col">
            <div className="bg-color-two py-4 px-8">
                <Logo 
                    src="/images/logo.svg" 
                    alt="logo" 
                    logoText="Taskify" 
                    textColor="text-white"
                />
            </div>
            <div className="flex flex-col justify-center items-center min-h-screen absolute inset-0">
                <Image
                    src={"/images/create-task.svg"}
                    alt="Create task Button"
                    width={65}
                    height={65}
                    className=""
                />
                <p className="text-center text-color-two">Create a task</p>
            </div>
            
        </div>
    )
}