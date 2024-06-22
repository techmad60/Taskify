import Image from "next/image";
import { interFont, poppinsFont, stylex } from "../fonts/fonts";

export default function Main() {
    return (
        <main className={`${interFont.className}`}>
        <section className="flex flex-col items-center text-center bg-color-one p-4 justify-center sm:p-8 lg:flex-row-reverse lg:px-16">
          <div>
            <Image 
              className="lg:w-[454px] h-[424px]"
              src={"/images/hero-img.svg"}
              alt="hero-img"
              width={275}
              height={275}/>
          </div>
          <div className="flex flex-col items-center lg:items-start lg:text-start">
            <h1 className={`font-bold text-[32px] text-primary-color sm:px-12 lg:px-0 lg:w-[431px]`}>Stay Organized, Achieve More with Taskify</h1>
            <p className={`${poppinsFont.className} text-sm text-slate-200 font-normal py-6 sm:px-12 lg:px-0 lg:w-[424px]`} >Taskify is your ultimate task management tool designed to help you stay on top of your to-do list. Effortlessly add, manage, and complete tasks with our intuitive interface. Sign up now to start boosting your productivity!</p>
            <button className="bg-primary-color text-color-one py-1 px-2 rounded-sm text-lg font-bold lg:mt-4 ">
              Get started
            </button>
          </div>
        </section>

        <section className="bg-hero-vector bg-no-repeat flex flex-col items-center p-4 features sm:p-8 lg:bg-desktop-hero lg:px-16">
        <h2 className="font-bold text-2xl mt-24 text-color-one sm:mt-28">Why Choose Taskify</h2>
          <article className="mt-8 flex flex-col items-center lg:flex-row">
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

          <article className="mt-8 flex flex-col items-center lg:flex-row-reverse">
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
          <article className="mt-8 flex flex-col items-center lg:flex-row">
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
        <section className="bg-no-repeat flex flex-col items-center p-4 bg-color-two mt-16">
          <h2 className="font-bold text-2xl  text-white py-12">What Our Users Say</h2>
          <div className="overflow-x-auto flex space-x-4">
            <div className="flex flex-col items-start bg-[#D9D9D9] w-[275px] h-[370px] p-8 rounded-md mt-4 mb-12">
              <p className={`${stylex.className} text-6xl text-color-one`}>&quot;</p>
              <p className={`${poppinsFont.className} text-center pb-8 text-sm`}>Taskify transformed my hectic pharmacy school schedule into a well-organized plan, helping me manage classes, assignments, and study sessions effortlessly.</p>
              <div className="flex justify-between items-center gap-8">
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
        </section>
        <section className="flex flex-col items-center pt-20 p-4 bg-testimonial-vector bg-no-repeat justify-center lg:bg-desktop-testimonial lg:flex-row">
          <Image 
            src={"/images/try-taskify.svg"}
            alt="Try Taskify Illustration"
            width={300}
            height={200}
            className="sm:mt-28"
            />
            <div className="flex flex-col items-center text-center">
              <h2 className="font-bold text-2xl  text-color-one pt-12">Try Taskify Today!</h2>
              <p className={`${poppinsFont.className} text-slate-700 text-sm px-16 py-4`}> Taskify - Organize your life, achieve more.</p>
              <button className="inline-flex items-center bg-primary-color text-color-one p-2 rounded-sm text-sm">
                Let&apos;s Go
                <Image 
                src={"/images/arrow-right.svg"}
                alt="arrow-icon"
                width={20}
                height={24}/>
              </button>
            </div>
        </section>
      </main>
    )
}