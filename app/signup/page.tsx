// /app/signup/page.tsx
import { poppinsFont } from "@/fonts/fonts";
import Darklogo from "@/components/Darklogo";
export default function SignupPage() {
    return (
      <div className="flex flex-col justify-center items-center">
        <Darklogo />
        <form className={`${poppinsFont.className} flex flex-col justify-center border border-color-one px-12 rounded-[10px] w-72`}>
          <label className="text-sm text-color-one font-light pt-6 pb-1">Name</label>
          <input type="text" name="name" required className="border border-color-one rounded-[10px] py-1"/>
          
          <label className="text-sm text-color-one font-light pt-6 pb-1">Email</label>
          <input type="email" name="email" required className="border border-color-one rounded-[10px] py-1"/>
          
          <label className="text-sm text-color-one font-light pt-6 pb-1">Password</label>
          <input type="password" name="password" required className="border border-color-one rounded-[10px] py-1"/>

          <label className="text-sm text-color-one font-light pt-6 pb-1">Repeat Password</label>
          <input type="password" name="repeatpassword" required className="border border-color-one rounded-[10px] py-1"/>
  
          <button type="submit" className="flex justify-center self-center text-sm text-color-one font-light bg-primary-color my-6 p-2 rounded-sm">Sign up</button>
        </form>
      </div>
    );
  }
  