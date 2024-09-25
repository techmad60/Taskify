// /app/login/layout.tsx
import { poppinsFont } from "@/fonts/fonts";
export default function WecomeLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="welcome-container min-h-screen flex flex-col justify-center items-center bg-color-zero">
        {children}
        <p className={`${poppinsFont.className} mt-8 text-color-two`}>Built with love by <span className="text-secondary-color hover:text-primary-color"><a href="#">Techmad</a></span> &copy; 2024</p>

      </div>
    );
  }
  