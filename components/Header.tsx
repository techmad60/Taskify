import Image from "next/image"
import { interFont} from "../fonts/fonts";
import Navbar from "./Navbar";
export default function Header() {
    return (
        <header className="bg-color-one flex flex-col p-4 sm:p-8 lg:px-16 ">
            <div className="">
              <Navbar/>
            </div>
        
      </header>
    )
}