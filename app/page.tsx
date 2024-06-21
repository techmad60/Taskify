import Image from "next/image";
import { interFont, poppinsFont, poller } from "../fonts/fonts";

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
            <p className={`${poppinsFont.className} text-sm text-slate-200 font-normal py-6`}>Taskify is your ultimate task management tool designed to help you stay on top of your to-do list. Effortlessly add, manage, and complete tasks with our intuitive interface. Sign up now to start boosting your productivity!</p>
            <button className="bg-primary-color text-color-one py-1 px-2 rounded-sm text-lg font-bold">
              Get started
            </button>
          </div>
        </section>

        <section className="bg-hero-vector bg-no-repeat flex flex-col items-center p-4 features">
        <h2 className="font-bold text-2xl mt-24 text-color-one">Why Choose Taskify</h2>
          <article className="mt-8">
            <div>
              <Image 
              src={"/images/add-tasks.svg"}
              alt="Add-tasks Illustration"
              width={375}
              height={269}
              />
            </div>

            <div className="flex flex-col items-center text-center py-4">
              <h3 className="font-bold text-xl text-color-one">Easy task creation</h3>
              <p className={`${poppinsFont.className} px-16 py-4 text-slate-700 text-sm`}> Quickly add tasks with our intuitive interface.</p>
              <button className="inline-flex items-center bg-primary-color text-color-one p-2 rounded-sm text-sm">
                Let&apos;s Go
                <Image 
                src={"/images/arrow-right.svg"}
                alt="arrow-icon"
                width={20}
                height={24}/>
              </button>
            </div>
          </article>

          <article className="mt-8">
            <div>
              <Image 
              src={"/images/manage-tasks.svg"}
              alt="Manage-tasks Illustration"
              width={347}
              height={314}
              />
            </div>

            <div className="flex flex-col items-center text-center py-4">
              <h3 className="font-bold text-xl text-color-one">Efficient Task Management</h3>
              <p className={`${poppinsFont.className} px-16 py-4 text-slate-700 text-sm`}> Manage tasks effortlessly with Taskify.</p>
              <button className="inline-flex items-center bg-primary-color text-color-one p-2 rounded-sm text-sm">
                Let&apos;s Go
                <Image 
                src={"/images/arrow-right.svg"}
                alt="arrow-icon"
                width={20}
                height={24}/>
              </button>
            </div>
          </article>
          <article className="mt-8">
            <div>
              <Image 
              src={"/images/authentication.svg"}
              alt="Aunthentication Illustration"
              width={374}
              height={289}
              />
            </div>

            <div className="flex flex-col items-center text-center py-4">
              <h3 className="font-bold text-xl text-color-one">Secure Aunthentication</h3>
              <p className={`${poppinsFont.className} px-16 py-4 text-slate-700 text-sm`}> Keep your tasks safe and accessible.</p>
              <button className="inline-flex items-center bg-primary-color text-color-one p-2 rounded-sm text-sm">
                Let&apos;s Go
                <Image 
                src={"/images/arrow-right.svg"}
                alt="arrow-icon"
                width={20}
                height={24}/>
              </button>
            </div>
          </article>
        </section>
        <section className="bg-no-repeat flex flex-col items-center p-4 bg-color-two">
          <h2 className="font-bold text-2xl  text-white">What Our Users Say</h2>
          <div className="flex flex-col items-start">
            <p className={`${poller.className}`}>"</p>
            <p className="text-center">Taskify transformed my hectic pharmacy school schedule into a well-organized plan, helping me manage classes, assignments, and study sessions effortlessly</p>
            <div className="flex justify-between items-center">
              <Image 
                src={"/images/avatar-one.png"}
                alt="Avatar"
                width={70}
                height={70}
                />
              <div>
                <p>Favour Nnabuife</p>
                <p>Pharmacy, 300lvl.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
    
  );
}
