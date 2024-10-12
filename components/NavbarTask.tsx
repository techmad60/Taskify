'use client';
import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { interFont } from "@/fonts/fonts";
import { usePathname } from 'next/navigation';
import { FaTimes, FaEye, FaBell, FaSignOutAlt, FaMagic } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Logo from './Logo';

interface Task {
  _id: string;
  title: string;
  timeLeft: number;
}

export default function NavbarTasks() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [tasksDueSoon, setTasksDueSoon] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const pathname = usePathname();

  const handleToggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const router = useRouter()

  // Function to determine if a link is active
  const isActiveLink = (href: string) => pathname === href;

  // Fetch tasks from the API
  useEffect(() => {
    
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/tasks', { // Replace with your API endpoint
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }

        const tasks = await response.json();
        const tasksDueIn24Hours = tasks.filter((task: Task) => task.timeLeft <= 24 && task.timeLeft > 0);
        setTasksDueSoon(tasksDueIn24Hours);

        setShowNotification(tasksDueIn24Hours.length > 0);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks(); // Fetch tasks when the component mounts
  }, []);

  const handleNotificationClick = () => {
    if (isNavOpen) {
      handleToggleNav(); // Close navbar if it's open (mobile mode)
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setShowNotification(false);
  };

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    if (isNavOpen) {
      body.style.overflow = 'hidden';
      html.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'visible';
      html.style.overflow = 'visible';
    }
    return () => {
      body.style.overflow = 'visible';
      html.style.overflow = 'visible';
    };
  }, [isNavOpen]);

  // const handleLogout = async () => {
  //   try {
  //     // Call the backend logout API
  //     const response = await fetch('http://localhost:5000/api/logout', { // Replace with your actual logout endpoint
  //       method: 'POST',
  //       credentials: 'include', // Send the cookie with the request
  //     });

  //     if (response.ok) {
  //       // Clear any client-side cookies if necessary (if not handled by the server)
  //       // Redirect to login page
  //       router.push('/login');
  //     } else {
  //       console.error('Logout failed');
  //     }
  //   } catch (error) {
  //     console.error('Error during logout:', error);
  //   }
  // };
  return (
    <nav className={`${interFont.className} lg:flex justify-between lg:self-center items-center`}>
      <div className="flex justify-between items-center">
        <Logo src='/images/logo.svg' logoText='Taskify' textColor='text-white'/>
        <div className="cursor-pointer lg:hidden" onClick={handleToggleNav}>
          <Image src={"/images/bars.svg"} alt="Bars" width={24} height={24}/>
        </div>
      </div>
      {isNavOpen && (
        <div className="fixed top-0 left-0 w-[25vw] min-h-screen bg-black opacity-50 z-50 lg:hidden" onClick={handleToggleNav} />
      )}
      <div className={`bg-color-two absolute top-0 right-0 h-screen flex flex-col items-center p-4 sm:p-8 w-3/4 lg:w-auto lg:flex-row lg:static lg:h-auto lg:bg-transparent lg:p-0 ${isNavOpen ? 'fixed' : 'hidden lg:flex'}`}>
        <button onClick={handleToggleNav} className="lg:hidden">
          <FaTimes size={24} className='text-white'/>
        </button>
        <div className="flex flex-col text-center my-8 lg:flex-row text-sm lg:text-h2-color">
          <div className='flex flex-col justify-between items-center flex-grow space-y-10 lg:space-y-0 lg:flex-row lg:space-x-16 xl:space-x-24'>
            <Link href="/mainpage" className={`${isActiveLink('/mainpage') ? 'text-[#786F21] border-b border-[#786F21]' : ''} hover:text-[#786F21] transition duration-150 hover:ease-in nav-title flex items-center gap-2 text-white`}>
              <p>Main Page</p>
            </Link>
            <Link href="/scheduled-page" className={`${isActiveLink('/scheduled-page') ? 'text-[#786F21] border-b border-[#786F21]' : ''} hover:text-[#786F21] transition duration-150 hover:ease-in nav-title flex items-center gap-2 text-white`}>
              <FaMagic />
              <p>Magic Button</p>
            </Link>
            <Link href="/taskdetails" className={`${isActiveLink('/taskdetails') ? 'text-[#786F21] border-b border-[#786F21]' : ''} hover:text-[#786F21] transition duration-150 hover:ease-in nav-title flex items-center gap-2 text-white`}>
              <FaEye />
              <p>Tasks Details</p>
            </Link>
            <button onClick={handleNotificationClick} className="relative flex items-center gap-2 text-white">
              <FaBell />
              <p>Notifications</p>
              {showNotification && (
                <span className="absolute -top-[0.01rem] right-[5.7rem] w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
            <Link href="/login" className={`${isActiveLink('/login') ? 'text-[#786F21] border-b border-[#786F21]' : ''} hover:text-[#786F21] transition duration-150 hover:ease-in nav-title flex items-center gap-2 text-red-500`}>
              <p>Log out</p>
              <FaSignOutAlt />
            </Link>
          </div>
        </div>
      </div>

      {/* Modal for Notifications */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center min-h-screen">
          <div className="bg-white p-6 rounded-lg shadow-md text-center w-[17rem]">
            <p className="text-lg font-semibold">
              You have {tasksDueSoon.length} task{tasksDueSoon.length > 1 ? 's' : ''} due in less than 24 hours. 
            </p>
            <p className='py-4'>Check the tasks details page for more details.</p>
            <button onClick={closeModal} className="mt-4 bg-color-one text-white px-4 py-2 rounded">
              Close
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
