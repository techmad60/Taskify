"use client"
import { useState } from "react";
import Logo from "@/components/Logo";
import Image from "next/image";
import { interFont } from "@/fonts/fonts";

export default function MainPage() {
    // State to manage overlay visibility
    const [showOverlay, setShowOverlay] = useState(false);

    // Function to toggle overlay visibility
    const toggleOverlay = () => {
        setShowOverlay(!showOverlay);
    };

    return (
        <div className={`${interFont.className} relative flex flex-col`}>
            {/* Header */}
            <div className="flex items-center bg-color-two py-4 px-8">
                <Logo 
                    src="/images/logo.svg" 
                    alt="logo" 
                    logoText="Taskify" 
                    textColor="text-white"
                />
            </div>

            {/* Main Content */}
            <div className="flex flex-col justify-center items-center min-h-screen absolute inset-0">
                <button 
                    onClick={toggleOverlay} // Show overlay on click
                    className="duration-200 hover:bg-color-one rounded-full"
                >
                    <Image
                        src={"/images/create-task.svg"}
                        alt="Create task Button"
                        width={60}
                        height={60}
                    />
                </button>
                <p className="text-center text-color-two text-sm">Create a task</p>
            </div>

            {/* Conditional Overlay */}
            {showOverlay && (
                <div className="absolute z-30 inset-0 bg-black bg-opacity-50 flex justify-center min-h-screen items-center">
                    <div className="bg-white p-4 rounded-lg flex flex-col h-[205px] justify-around" >
                        <button className="cursor-pointer flex justify-end" onClick={toggleOverlay}>
                            <Image
                                src={"/images/cancel-task.svg"}
                                alt="Cancel task Button"
                                width={20}
                                height={20}
                            />
                        </button>
                        <input type="text" placeholder="Add Task Title..." className="text-center text-xl font-semibold outline-none"/>
                        <button 
                            onClick={toggleOverlay}
                            className="duration-200 hover:bg-color-one rounded-full flex self-center">
                            <Image
                                src={"/images/create-task.svg"}
                                alt="Create task Button"
                                width={50}
                                height={50}
                            />
                    </button>
                    </div>
                </div>
            )}
        </div>
    );
}
