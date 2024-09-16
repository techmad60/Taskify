// /app/signup/page.tsx
import { poppinsFont } from "@/fonts/fonts";
import Darklogo from "@/components/Darklogo";
import HorizontalLine from "@/components/HorizontalLine";
import GoogleButton from "@/components/GoogleButton";
export default function SignupPage() {
    return (
      <div className={`${poppinsFont.className} flex flex-col justify-center items-center font-light text-sm text-color-one`}>
        <Darklogo />
        <form className={`flex flex-col justify-center border border-color-one px-12 rounded-[10px] w-72`}>
          <label className="pt-6 pb-1">Name</label>
          <input type="text" name="name" required className="border border-color-one rounded-[10px] py-1"/>
          
          <label className="pt-6 pb-1">Email</label>
          <input type="email" name="email" required className="border border-color-one rounded-[10px] py-1"/>
          
          <label className="pt-6 pb-1">Password</label>
          <input type="password" name="password" required className="border border-color-one rounded-[10px] py-1"/>

          <label className="pt-6 pb-1">Repeat password</label>
          <input type="password" name="repeatpassword" required className="border border-color-one rounded-[10px] py-1"/>
  
          <button type="submit" className="flex justify-center self-center text-sm bg-primary-color my-6 py-2 px-3 rounded-sm">Sign up</button>
        </form>
        <HorizontalLine />
        <GoogleButton text = "Sign up"/>
        <p className="mt-8">Already have an account? 
            <span className="text-primary-color"> Login</span></p>
      </div>
    );
  }
  