import Navbar from "./Navbar";
export default function Header() {
    return (
        <header className="bg-color-one flex flex-col p-4 sm:p-8 lg:px-16   lg:items-center">
            <div className="max-w-5xl w-full">
              <Navbar/>
            </div>
        
      </header>
    )
}