import Image from "next/image";
import { interFont, poppinsFont } from "../fonts/fonts";

export default function Home() {
  return (
    <>
      <header className="flex flex-col bg-color-one p-4">
        <div className="flex justify-between items-center">
          <div className="flex ">
              <Image 
              className=""
              src={"/images/logo.svg"}
              alt="Taskify-logo"
              width={24}
              height={24}/>
            <p className={`${interFont.className} text-white`}>Taskify</p>
          </div>
          <div>
            <Image 
              className=""
              src={"/images/bars.svg"}
              alt="Bars"
              width={24}
              height={24}/>
          </div>
        </div>
      </header>

      <main className={`${interFont.className}`}>
        <section className="flex flex-col items-center text-center bg-color-one p-4">
          <div>
            <Image 
              className=""
              src={"/images/hero-img.svg"}
              alt="hero-img"
              width={275}
              height={275}/>
          </div>
          <div>
            <h1 className={`font-bold text-[32px] text-primary-color`}>Stay Organized, Achieve More with Taskify</h1>
            <p className={`${poppinsFont.className} text-sm text-white font-normal py-6`}>Taskify is your ultimate task management tool designed to help you stay on top of your to-do list. Effortlessly add, manage, and complete tasks with our intuitive interface. Sign up now to start boosting your productivity!</p>
            <button className="bg-primary-color text-color-one py-1 px-2 rounded-md">
            <a className={`text-lg rounded-sm font-bold`}>Get started</a>
            </button>
          </div>
        </section>

        <section className="bg-hero-vector bg-no-repeat flex flex-col items-center">
        <h2 className="font-bold text-2xl mt-24 text-color-one">Why Choose Taskify</h2>
        </section>
      </main>
    </>
    
  );
}
