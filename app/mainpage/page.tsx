"use client"
import { useState } from "react";
import Image from "next/image";
import { interFont } from "@/fonts/fonts";
import Logo from "@/components/Logo";
import Circle from "@/components/Circl";

// Define the Task interface
interface Task {
    title: string;
    id: string;
    // Add other properties such as description, priority, etc. if needed
}

export default function MainPage() {
    // State to manage overlay visibility and tasks
    const [showOverlay, setShowOverlay] = useState(false);
    const [taskTitle, setTaskTitle] = useState(''); // To capture input
    const [tasks, setTasks] = useState<Task[]>([]); // Task array with defined type

    // Function to toggle overlay visibility
    const toggleOverlay = () => {
        setShowOverlay(!showOverlay);
    };

    // Function to handle task creation
    const createTask = async () => {
        // Data validation - only create if title is not empty
        if (!taskTitle) {
            alert("Task title is required!");
            return;
        }

        try {
            // Send POST request to backend
            const response = await fetch('http://localhost:5000/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: taskTitle }), // Send only the title for now
            });

            if (response.ok) {
                const newTask: Task = await response.json(); // Get the created task response
                setTasks([...tasks, newTask]); // Add the new task to the tasks list
                setTaskTitle(''); // Clear the input field
                setShowOverlay(false); // Close overlay
            } else {
                console.error("Error creating task");
            }
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    return (
        <div className={`${interFont.className} flex flex-col`}>
            {/* Header */}
            <div className="flex items-center bg-color-two py-4 px-8">
                <Logo 
                    src="/images/logo.svg" 
                    alt="logo" 
                    logoText="Taskify" 
                    textColor="text-white"
                />
            </div>

             {/* Render Created Tasks */}
            <div className="mt-4 flex flex-col items-center ">
                {tasks.map((task) => (
                    <div key={task.id} className="p-4 bg-color-zero rounded-[4px] shadow-md w-[82%] h-auto flex items-center justify-between mt-4">
                        <div className="flex-shrink-0">
                          <Circle />
                        </div>
                        <p className="text-md text-center flex-grow break-words">{task.title}</p>
                        <button className="cursor-pointer flex justify-end flex-shrink-0" onClick={toggleOverlay}>
                            <Image
                                src={"/images/cancel-task.svg"}
                                alt="Cancel task Button"
                                width={20}
                                height={20}
                            />
                        </button>
                    </div>
                ))}
            </div>

            {/* Main Content */}
            <div className="flex flex-col justify-center items-center " style={{ height: 'calc(100vh - 400px)' }}>
                <button 
                    onClick={toggleOverlay} // Show overlay on click
                    className="duration-200 hover:bg-color-one rounded-full"
                >
                    <Image
                        src={"/images/create-task.svg"}
                        alt="Create task Button"
                        width={60}
                        height={60}
                    />
                </button>
                <p className="text-center text-color-two text-sm ">Create a task</p>
            </div>

           

            {/* Conditional Overlay */}
            {showOverlay && (
                <div className="fixed z-30 inset-0 bg-black bg-opacity-50 flex justify-center min-h-screen items-center">
                    <div className="bg-white p-4 rounded-lg flex flex-col h-[205px] justify-around overlay" >
                        <button className="cursor-pointer flex justify-end" onClick={toggleOverlay}>
                            <Image
                                src={"/images/cancel-task.svg"}
                                alt="Cancel task Button"
                                width={20}
                                height={20}
                            />
                        </button>
                        <textarea 
                            placeholder="Add Task Title..." 
                            className="text-center placeholder:text-xl font-semibold outline-none resize-none" 
                            maxLength= {30}
                            rows={3}
                            value={taskTitle} // Bind input value
                            onChange={(e) => setTaskTitle(e.target.value)} // Update state on input change
                        />
                        <button 
                            onClick={createTask} // Create the task on button click
                            className="duration-200 hover:bg-color-one rounded-full flex self-center"
                        >
                            <Image
                                src={"/images/create-task.svg"}
                                alt="Create task Button"
                                width={50}
                                height={50}
                            />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
