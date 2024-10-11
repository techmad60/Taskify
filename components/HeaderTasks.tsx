import NavbarTasks from "./NavbarTask";
export default function HeaderTasks() {
    return (
      <header className="bg-color-two flex flex-col p-4 lg:p-0 lg:px-16 lg:items-center">
          <div className="max-w-5xl w-full">
            <NavbarTasks/>
          </div>
        
      </header>
    )
}