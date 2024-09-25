import Image from "next/image"
import Link from "next/link"

export default function Button({href="",}) {
    return (
        <Link href={href} className="inline-flex items-center bg-primary-color duration-300 hover:bg-secondary-color text-color-two p-2 rounded-sm text-sm outline outline-offset-2 outline-1 outline-blue-500">
            Let&apos;s Go
            <Image 
            src={"/images/arrow-right.svg"}
            alt="arrow-icon"
            width={20}
            height={24}/>
        </Link>
    )
    
}

