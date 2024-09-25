import Image from "next/image";
import { interFont, poppinsFont, stylex } from "../fonts/fonts";
import Button from "./Button";
import Carousel from "./Carousel";
import Link from "next/link";

export default function Main() {
    return (
      <main className={`${interFont.className}`}>
        <section className="flex flex-col items-center text-center bg-color-one p-4 justify-center sm:p-8 lg:flex-row-reverse lg:px-16 xl:gap-28">
          <div>
            <Image 
              className="lg:w-[454px]"
              src={"/images/hero-img.svg"}
              alt="hero-img"
              width={275}
              height={275}/>
          </div>
          <div className="flex flex-col items-center lg:items-start lg:text-start">
            <h1 className={`font-bold text-[32px] text-primary-color sm:px-12 lg:px-0 lg:w-[431px]`}>Stay Organized, Achieve More with Taskify</h1>
            <p className={`${poppinsFont.className} text-sm text-slate-200 font-normal py-6 sm:px-12 lg:px-0 lg:w-[424px]`} >Taskify is your ultimate task management tool designed to help you stay on top of your to-do list. Effortlessly add, manage, and complete tasks with our intuitive interface. Sign up now to start boosting your productivity!</p>
            <Link href="/signup" className="bg-primary-color text-color-one py-2 px-2 rounded-sm text-lg font-semibold lg:mt-4 ">
              Get started
            </Link>
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
              <Button href="/signup" />
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
              <Button href="/signup" />
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
              <Button href="/signup" />
            </div>
          </article>
        </section>
        <section className="bg-no-repeat flex flex-col items-center p-4 bg-color-two mt-16">
          <h2 className="font-bold text-2xl  text-white py-12">What Our Users Say</h2>
          <Carousel />
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
              <Button href="/signup" />
            </div>
        </section>
      </main>
    )
}