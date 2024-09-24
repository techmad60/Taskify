import Image from "next/image"

export default function Button() {
    return (
        <button className="inline-flex items-center bg-primary-color text-color-one p-2 rounded-sm text-sm">
            Let&apos;s Go
            <Image 
            src={"/images/arrow-right.svg"}
            alt="arrow-icon"
            width={20}
            height={24}/>
        </button>
    )
    
}

