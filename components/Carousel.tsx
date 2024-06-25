import Image from "next/image";
import { poppinsFont, stylex } from "../fonts/fonts";

export default function Carousel() {
    return (
        <div className="flex flex-col lg:flex-row lg:space-x-4 lg:gap-16">
            <div className="flex flex-col items-start bg-[#D9D9D9] w-[275px] h-[370px] p-8 rounded-md mt-4 mb-12">
            <p className={`${stylex.className} text-6xl text-color-one`}>&quot;</p>
            <p className={`${poppinsFont.className} text-center pb-8 text-sm`}>Taskify transformed my hectic pharmacy school schedule into a well-organized plan, helping me manage classes, assignments, and study sessions effortlessly.</p>
                <div className="flex justify-between items-center gap-4">
                    <Image 
                    src={"/images/avatar-one.png"}
                    alt="Avatar"
                    width={50}
                    height={50}
                    />
                    <div>
                    <p className="font-bold text-sm text-color-one">Favour Nnabuife</p>
                    <p className="text-sm">Pharmacy, 300lvl.</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-start bg-[#D9D9D9] w-[275px] h-[370px] p-8 rounded-md mt-4 mb-12">
            <p className={`${stylex.className} text-6xl text-color-one`}>&quot;</p>
            <p className={`${poppinsFont.className} text-center pb-8 text-sm`}>Taskify transformed my hectic pharmacy school schedule into a well-organized plan, helping me manage classes, assignments, and study sessions effortlessly.</p>
                <div className="flex justify-between items-center gap-4">
                    <Image 
                    src={"/images/avatar-one.png"}
                    alt="Avatar"
                    width={50}
                    height={50}
                    />
                    <div>
                    <p className="font-bold text-sm text-color-one">Favour Nnabuife</p>
                    <p className="text-sm">Pharmacy, 300lvl.</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-start bg-[#D9D9D9] w-[275px] h-[370px] p-8 rounded-md mt-4 mb-12">
            <p className={`${stylex.className} text-6xl text-color-one`}>&quot;</p>
            <p className={`${poppinsFont.className} text-center pb-8 text-sm`}>Taskify transformed my hectic pharmacy school schedule into a well-organized plan, helping me manage classes, assignments, and study sessions effortlessly.</p>
                <div className="flex justify-between items-center gap-4">
                    <Image 
                    src={"/images/avatar-one.png"}
                    alt="Avatar"
                    width={50}
                    height={50}
                    />
                    <div>
                    <p className="font-bold text-sm text-color-one">Favour Nnabuife</p>
                    <p className="text-sm">Pharmacy, 300lvl.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}