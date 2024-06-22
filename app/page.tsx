// import Image from "next/image";
// import { interFont, poppinsFont, stylex } from "../fonts/fonts";
import Header from "@/components/Header";
import Main from "@/components/Main";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="grid ">
      <Header />
      <Main />
      <Footer />
    </div>
    
  );
}
