import Image from "next/image";
import { interFont, poppinsFont, stylex } from "../fonts/fonts";

export default function Home() {
  return (
    <>
      <header className="flex flex-col bg-color-one p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
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
        <section className="bg-no-repeat flex flex-col items-center p-4 bg-color-two mt-16">
          <h2 className="font-bold text-2xl  text-white py-12">What Our Users Say</h2>
          <div className="overflow-x-auto flex space-x-4">
            <div className="flex flex-col items-start bg-[#D9D9D9] w-[275px] h-[370px] p-8 rounded-md mt-4 mb-12">
              <p className={`${stylex.className} text-6xl text-color-one`}>&quot;</p>
              <p className={`${poppinsFont.className} text-center pb-8 text-sm`}>Taskify transformed my hectic pharmacy school schedule into a well-organized plan, helping me manage classes, assignments, and study sessions effortlessly.</p>
              <div className="flex justify-between items-center gap-4">
                <Image 
                  src={"/images/avatar-one.png"}
                  alt="Avatar"
                  width={70}
                  height={70}
                  />
                <div>
                  <p className="font-bold text-sm text-color-one">Favour Nnabuife</p>
                  <p className="text-sm">Pharmacy, 300lvl.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="flex flex-col items-center pt-20 p-4 bg-testimonial-vector bg-no-repeat">
          <Image 
            src={"/images/try-taskify.svg"}
            alt="Try Taskify Illustration"
            width={300}
            height={200}
            className=""
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
      <footer className="bg-color-one flex flex-col items-center mt-16 p-4 py-12">
        <div className="flex items-center">
          <Image 
          className=""
          src={"/images/logo.svg"}
          alt="Taskify-logo"
          width={35}
          height={35}/>
        <p className={`${interFont.className} text-white text-lg font-semibold`}>Taskify</p>
        </div>
        <nav className="text-center text-white py-12">
          <ul>
            <li className="py-2"><a href="">Home</a></li>
            <li className="py-2"><a href="">Features</a></li>
            <li className="py-2"><a href="">Testimonials</a></li>
            <li className="py-2"><a href="">Contact Us</a></li>
          </ul>
        </nav>
        <div className="flex space-x-6">
          <a href="">
            <Image 
              className=""
              src={"/images/facebook-logo.svg"}
              alt="facebook-logo"
              width={30}
              height={30}/>
          </a>
          <a href="">
            <Image 
              className=""
              src={"/images/x-logo.svg"}
              alt="X-logo"
              width={30}
              height={30}/>
          </a>
          <a href="">
            <Image 
              className=""
              src={"/images/github-logo.svg"}
              alt="Github-logo"
              width={30}
              height={30}/>
          </a>
          <a href="">
            <Image 
              className=""
              src={"/images/linkedin-logo.svg"}
              alt="LinkedIn-logo"
              width={30}
              height={30}/>
          </a>
        </div>
        <p className={`${poppinsFont.className} text-center text-xs text-white mt-12`}>Designed and built with love by <span className="text-primary-color">Techmad</span> </p>
      </footer>
    </>
    
  );
}
