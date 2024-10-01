"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import { interFont } from "@/fonts/fonts";
import Logo from "@/components/Logo";
import Circle from "@/components/Circle";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Task {
    title: string;
    _id: string;
    checked: boolean;
    startDate?: Date;
    endDate?: Date;
}

export default function MainPage() {
    const [showOverlay, setShowOverlay] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isEditing, setIsEditing] = useState(false); // New state to track if editing
    const [taskToEdit, setTaskToEdit] = useState<Task | null>(null); // Store the task being edited
    const [dueDate, setDueDate] = useState<Date | null>(null); // Store selected due date
    const [showDatePicker, setShowDatePicker] = useState(false); // Toggle date picker visibility
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);


    const toggleOverlay = () => {
        setShowOverlay(!showOverlay);
        if (!showOverlay) {
            setIsEditing(false); // Reset editing state when overlay is toggled off
        }
    };

    const toggleCheck = (taskId: string) => {
        setTasks(tasks.map(task =>
            task._id === taskId ? { ...task, checked: !task.checked } : task
        ));
    };

    const createTask = async () => {
        if (!taskTitle) {
            alert("Task title is required!");
            return;
        }

        try {
            const response = await fetch(`https://taskify-backend-nq1q.onrender.com/api/tasks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    title: taskTitle,
                    startDate: startDate ? startDate.toISOString() : undefined, // Store the full date with time
                    endDate: endDate ? endDate.toISOString() : undefined // Store the full date with time

                }),
            });

            if (response.ok) {
                const newTask: Task = await response.json();
                setTasks([...tasks, newTask]);
                setTaskTitle('');
                setShowOverlay(false);
                setStartDate(null); // Reset start date
                setEndDate(null); // Reset end dat
            } else {
                console.error("Error creating task");
            }
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    const deleteTask = async (taskId: string) => {
        try {
            const response = await fetch(`https://taskify-backend-nq1q.onrender.com/api/tasks/${taskId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setTasks(tasks.filter(task => task._id !== taskId));
            } else {
                const errorData = await response.json();
                console.error("Error deleting task:", errorData.message || "No message");
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleEditTaskClick = (task: Task) => {
        setTaskToEdit(task); // Set the task to be edited
        setTaskTitle(task.title); // Pre-fill the title input with the task's current title
        setIsEditing(true); // Indicate that we are in edit mode
        setShowOverlay(true); // Show the overlay for editing
        setStartDate(null); // Reset start date
        setEndDate(null); // Reset end date
    };

    const updateTask = async () => {
        if (!taskTitle || !taskToEdit) {
            alert("Task title is required!");
            return;
        }

        try {
            const response = await fetch(`https://taskify-backend-nq1q.onrender.com/api/tasks/${taskToEdit._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    title: taskTitle,
                    startDate: startDate ? startDate.toISOString() : undefined, // Store the full date with time
                    endDate: endDate ? endDate.toISOString() : undefined // Store the full date with time
                
                }),
               
               
            });

            if (response.ok) {
                const updatedTask = await response.json();
                setTasks(tasks.map(task => task._id === updatedTask._id ? updatedTask : task));
                setTaskToEdit(null);
                setTaskTitle('');
                setShowOverlay(false);
                setIsEditing(false);
            } else {
                console.error("Error updating task");
            }
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch(`https://taskify-backend-nq1q.onrender.com/api/tasks`);
            const data = await response.json();
            setTasks(data);
        };

        fetchTasks();
    }, []);

    return (
        <div className={`${interFont.className} flex flex-col`}>
            <div className="flex items-center bg-color-two py-4 px-8">
                <Logo src="/images/logo.svg" alt="logo" logoText="Taskify" textColor="text-white" />
            </div>

            <div className="mt-4 flex flex-col items-center">
                {tasks.map((task) => (
                    <div key={task._id} className="p-4 bg-color-zero rounded-[4px] shadow-md w-[82%] sm:w-[70%] h-auto flex items-center justify-between mt-4">
                        <div className="flex-shrink-0 cursor-pointer" onClick={() => toggleCheck(task._id)}>
                            {task.checked ? (
                                <Image src={"/images/check-task.svg"} alt="Checked task" width={26} height={26} />
                            ) : (
                                <Circle />
                            )}
                        </div>
                        <p className="text-md text-center flex-grow break-words" onClick={() => handleEditTaskClick(task)}>
                            {task.title}
                        </p>
                        <button className="cursor-pointer flex justify-end flex-shrink-0" onClick={() => deleteTask(task._id)}>
                            <Image src={"/images/cancel-task.svg"} alt="Cancel task Button" width={20} height={20} />
                        </button>
                    </div>
                ))}
            </div>

            <div className="flex flex-col justify-center items-center " style={{ height: 'calc(100vh - 400px)' }}>
                <button onClick={toggleOverlay} className="duration-200 hover:bg-color-one rounded-full">
                    <Image src={"/images/create-task.svg"} alt="Create task Button" width={60} height={60} />
                </button>
                <p className="text-center text-color-two text-sm ">Create a task</p>
            </div>

            {showOverlay && (
                <div className="fixed z-30 inset-0 bg-black bg-opacity-50 flex justify-center min-h-screen items-center">
                    <div className="bg-white p-4 rounded-lg flex flex-col h-auto w-[80%] sm:w-[50%] md:w-[40%] lg:w-[35%] justify-around overlay">
                        <button className="cursor-pointer flex justify-end" onClick={toggleOverlay}>
                            <Image src={"/images/cancel-task.svg"} alt="Cancel task Button" width={20} height={20} />
                        </button>
                        <textarea
                            placeholder="Add Task Title..." 
                            className="text-center placeholder:text-xl font-semibold outline-none placeholder:text-[#555855]" 
                            maxLength={30}  
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    isEditing ? updateTask() : createTask();
                                }
                            }}
                        />
                        <input placeholder="Add title description" className="text-xs text-center border-none outline-none placeholder:text-[#555855]"></input>
                       {/* Start Date Picker */}
                        <div className="flex items-center border-b gap-4 p-3 mt-4">
                            <div className="flex items-center gap-4 ">
                                <Image src={"/images/calendar.svg"} alt="Start Date Button" width={20} height={20} />
                                <p className="text-[#555855] text-sm font-semibold">Start Date</p>
                            </div>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                showTimeSelect
                                dateFormat="Pp"
                                placeholderText="Set Start Date"
                                className="outline-none text-sm cursor-pointer"
                            />
                        </div>
                        
                        <div className="flex items-center border-b gap-4 p-3">
                            <div className="flex items-center gap-4">
                                <Image src={"/images/calendar.svg"} alt="End Date Button" width={20} height={20} />
                                <p className="text-[#555855] text-sm font-semibold">End Date</p>
                            </div>
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                showTimeSelect
                                dateFormat="Pp"
                                placeholderText="Set End Date"
                                className="outline-none text-sm cursor-pointer"
                            />
                        </div>
                        {/* End Date Picker */}
                        
                        <div className="flex items-center border-b gap-4 p-4">
                            <button >
                                <Image 
                                src={"/images/priority.svg"} 
                                alt="Priority Button" 
                                width={20} id="set-priority"
                                height={20} />
                            </button>
                            
                            <p className="text-[#555855] text-sm font-semibold">Set priority</p>
                        </div>
                        <div className="flex items-center border-b gap-4 p-4">
                            <button id="set-status">
                                <Image 
                                src={"/images/status.svg"} 
                                alt="Status Button" 
                                width={20} 
                                height={20} />
                            </button>
                            <p className="text-[#555855] text-sm font-semibold">Set status</p>
                        </div>

                        <button onClick={isEditing ? updateTask : createTask} className="duration-200 hover:bg-color-one rounded-full flex self-center mt-2">
                            <Image
                                src={isEditing ? "/images/edit-task.svg" : "/images/create-task.svg"} // Change icon depending on mode
                                alt={isEditing ? "Edit task Button" : "Create task Button"}
                                width={50}
                                height={50}
                            />
                        </button>
                        <p className="text-xs font-light text-center mt-1">
                            {isEditing ? "Edit task" : "Create task"}
                        </p>

                    </div>
                </div>
            )}
        </div>
    );
}
