"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import { interFont } from "@/fonts/fonts";
import Logo from "@/components/Logo";
import Circle from "@/components/Circle";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner"; 

interface Task {
    title: string;
    _id: string;
    checked: boolean;
    startDate?: Date;
    endDate?: Date;
    priority: string;
    status: string;
}

export default function MainPage() {
    const [showOverlay, setShowOverlay] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isEditing, setIsEditing] = useState(false); // New state to track if editing
    const [taskToEdit, setTaskToEdit] = useState<Task | null>(null); // Store the task being edited
    const [showStatusModal, setShowStatusModal] = useState(false); // State for the status modal
    const [selectedStatus, setSelectedStatus] = useState('Not Started'); // Default status
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [showPriorityModal, setShowPriorityModal] = useState(false); // State for the priority modal
    const [selectedPriority, setSelectedPriority] = useState('Medium'); // Default priority
    const [loading, setLoading] = useState(false);

 
    const router = useRouter()

    const toggleOverlay = () => {
        setShowOverlay(!showOverlay);
        if (!showOverlay) {
            setIsEditing(false); // Reset editing state when overlay is toggled off
        }
    };

    const createTask = async () => {

        setLoading(true);

        if (!taskTitle ) {
            alert("Task title is required!");
            return;
        }
        
        if (!startDate || !endDate) {
            alert('Start date and End date are both required');
            return;
        }
        if (startDate && endDate) {
            // Convert to Date objects
            const start = new Date(startDate);
            const end = new Date(endDate);
        
            if (start.getTime() === end.getTime()) {
                alert('Start date and End date cannot be equal');
                return; // Prevent task creation if dates are equal
            }
        
            if (start.getTime() > end.getTime()) {
                alert('Start date cannot be later than the end date.');
                return; // Prevent task creation if dates are invalid
            }
        }
        if (endDate && endDate < new Date()) {
            alert('End date cannot be in the past.');
            return; // Prevent task creation if end date is in the past
        }
    
        
        

        try {
            const response = await fetch(`https://taskify-backend-nq1q.onrender.com/api/tasks`, {
                method: 'POST',
                credentials: "include",
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    title: taskTitle,
                    startDate: startDate ? startDate.toISOString() : undefined, // Store the full date with time
                    endDate: endDate ? endDate.toISOString() : undefined, // Store the full date with time
                    priority: selectedPriority, // Send selected priority
                    status: selectedStatus

                }),
                

            });
            

            if (response.ok) {
                const newTask: Task = await response.json();
                setTasks([...tasks, newTask]);
                setTaskTitle('');
                setShowOverlay(false);
                setStartDate(null); // Reset start date
                setEndDate(null); // Reset end dat
                setSelectedPriority('Medium');
                setSelectedStatus('Not Started');

            } else {
                console.error("Error creating task");
            }
        } catch (error) {
            console.error("Error creating task:", error);
        }
        finally {
            // Stop loading
            setLoading(false);
        }
    };

    const deleteTask = async (taskId: string) => {
        try {
            const response = await fetch(`https://taskify-backend-nq1q.onrender.com/api/tasks/${taskId}`, {
                method: 'DELETE',
                credentials: 'include'
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
        setStartDate(task.startDate ? new Date(task.startDate) : null); // Retain original start date or set to null
        setEndDate(task.endDate ? new Date(task.endDate) : null); // Retain original end date or set to null
        setSelectedPriority(task.priority || 'Medium'); // Retain original priority or default to 'Medium'
        setSelectedStatus(task.status || 'Not Started'); // Retain original status or default to 'Not Started'
    };
    

    const updateTask = async () => {
        setLoading(true);

        if (!taskTitle || !taskToEdit) {
            alert("Task title is required!");
            return;
        }
        
        if (!startDate || !endDate) {
            alert('Start date and End date are both required');
            return;
        }
        if (startDate && endDate) {
            // Convert to Date objects
            const start = new Date(startDate);
            const end = new Date(endDate);
        
            if (start.getTime() === end.getTime()) {
                alert('Start date and End date cannot be equal');
                return; // Prevent task creation if dates are equal
            }
        
            if (start.getTime() > end.getTime()) {
                alert('Start date cannot be later than the end date.');
                return; // Prevent task creation if dates are invalid
            }
        }
        if (endDate && endDate < new Date()) {
            alert('End date cannot be in the past.');
            return; // Prevent task creation if end date is in the past
        }
    
        try {
            const response = await fetch(`https://taskify-backend-nq1q.onrender.com/api/tasks/${taskToEdit._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: "include",
                body: JSON.stringify({ 
                    title: taskTitle,
                    startDate: startDate ? startDate.toISOString() : undefined, // Store the full date with time
                    endDate: endDate ? endDate.toISOString() : undefined ,// Store the full date with time
                    priority: selectedPriority, // Send selected priority
                    status: selectedStatus
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
        finally {
            // Stop loading
            setLoading(false);
        }
    };
    // const handleLogout = async () => {
    //     try {
    //         const response = await fetch('https://your-backend-domain.com/api/logout', {
    //             method: 'POST',
    //             credentials: 'include',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    
    //         console.log('Response Status:', response.status); // Log the status code
    
    //         if (response.ok) {
    //             document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    //             router.push('/login');
    //         } else {
    //             console.error("Failed to logout:", await response.json()); // Log the error response
    //         }
    //     } catch (error) {
    //         console.error("Error logging out:", error);
    //     }
    // };
    
   
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(`https://taskify-backend-nq1q.onrender.com/api/tasks`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                if (!response.ok) {
                    const errorMessage = await response.text(); // Get the response as plain text
                    console.error('Error fetching tasks:', errorMessage);
                    router.push('/login')
                    return;
                    
                }
    
                const data = await response.json();
                
                // Ensure `data` is an array before calling `.map()`
                if (Array.isArray(data)) {
                    setTasks(data);  // Only set tasks if `data` is an array
                } else {
                    console.error('Data is not an array:', data);
                }
            } catch (error) {
                console.error('Error in fetchTasks:', error);
            }
        };
    
        fetchTasks();
    }, [router]);
    
    

    return (
        <div className={`${interFont.className} flex flex-col`}>
            <div className="flex items-center justify-between bg-color-two py-4 px-8 sm:px-24 md:px-28 lg:px-36 xl:px-52">
                <Logo src="/images/logo.svg" alt="logo" logoText="Taskify" textColor="text-white" />
                {/* <button className="p-1 rounded-sm text-sm text-white" onClick={() => handleLogout()}>
                    Log out
                </button> */}
            </div>

            <div className="mt-4 flex flex-col items-center">
                {tasks.map((task) => (
                   <div key={task._id} className="p-4 bg-gray-200 rounded-[4px] shadow-md w-[82%] sm:w-[70%] h-auto flex items-center justify-between mt-4">
                        <div className="flex-shrink-0 cursor-pointer"  onClick={() => handleEditTaskClick(task)}>
                            {task.status === 'Completed' ? (
                                <Image src={"/images/check-task.svg"} alt="Completed task" width={26} height={26} />
                            ) : task.status === 'In Progress' ? (
                                <Image src={"/images/pending.svg"} alt="In Progress task" width={26} height={26} />
                            ) : (
                                <Circle />
                            )}
                        </div>
                        <p className="text-sm ml-4 font-bold flex-grow break-words" onClick={() => handleEditTaskClick(task)}>
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
                            className="text-center placeholder:text-xl font-semibold outline-none placeholder:text-slate-400" 
                            maxLength={30}  
                            value={taskTitle}
                            autoFocus
                            onChange={(e) => setTaskTitle(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    isEditing ? updateTask() : createTask();
                                }
                            }}
                        />
                        <input placeholder="Add title description..." className="text-xs text-center border-none outline-none placeholder:text-slate-500"></input>
                       {/* Start Date Picker */}
                        <div className="flex items-center border-b gap-4 p-3 mt-4">
                            <div className="flex items-center gap-4 ">
                                <button className="">
                                    <Image src={"/images/start-date.svg"} alt="Start Date Button" width={25} height={25} />
                                </button>
                               
                                {/* <p className="text-[#555855] text-xs font-semibold">Start</p> */}
                            </div>
                           
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                showTimeSelect
                                dateFormat="Pp"
                                placeholderText="Set Start Date"
                                className="outline-none text-xs cursor-pointer text-[#555855] font-semibold"
                            />
                           
                            
                        </div>
                        
                        <div className="flex items-center border-b gap-4 p-3">
                            <div className="flex items-center gap-4">
                                <button>
                                    <Image src={"/images/end-date.svg"} alt="End Date Button" width={25} height={25} />
                                </button>
                            </div>

                        
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                showTimeSelect
                                dateFormat="Pp"
                                placeholderText="Set End Date"
                                className="outline-none text-xs cursor-pointer text-[#555855] font-semibold"
                                minDate={new Date()}
                            />
                          
                           
                        </div>
                        {/* End Date Picker */}
                        
                        <div className="flex items-center border-b gap-4 p-4">
                            <button onClick={() => setShowPriorityModal(true)}>
                                <Image 
                                src={"/images/priority.svg"} 
                                alt="Priority Button" 
                                width={20} id="set-priority"
                                height={20} />
                            </button>
                            
                            <p onClick={() => setShowPriorityModal(true)} className="text-[#555855] text-xs font-semibold cursor-pointer">{` ${selectedPriority}`}</p>
                        </div>
                        <div className="flex items-center border-b gap-4 p-4">
                            <button id="set-status" onClick={() => setShowStatusModal(true)}>
                                <Image 
                                src={"/images/status.svg"} 
                                alt="Status Button" 
                                width={25} 
                                height={25} />
                            </button>
                            <p  onClick={() => setShowStatusModal(true)} className="text-[#555855] text-xs font-semibold cursor-pointer">{`${selectedStatus}`}</p>
                        </div>

                        <button onClick={isEditing ? updateTask : createTask} className="duration-200 hover:bg-color-one rounded-full flex self-center mt-2">
                            {loading ? (
                                <LoadingSpinner />
                            ) : (
                                <Image
                                    src={isEditing ? "/images/edit-task.svg" : "/images/create-task.svg"}
                                    alt={isEditing ? "Edit task Button" : "Create task Button"}
                                    width={50}
                                    height={50}
                                />
                            )}
                        </button>
                        <p className="text-xs font-light text-center mt-1">
                        {loading ? "Loading..." : isEditing ? "Edit task" : "Create task"}
                        </p>

                    </div>
                </div>
            )}
            {showPriorityModal && (
                <div className="fixed z-40 inset-0  flex justify-center items-center">
                    <div className="bg-white p-4 shadow-md flex flex-col w-[250px] rounded-md">
                        <button className="cursor-pointer flex justify-end" onClick={() => setShowPriorityModal(false)}>
                            <Image src={"/images/cancel-task.svg"} alt="Close" width={20} height={20} />
                        </button>
                        <h3 className="text-lg font-semibold text-center mb-4 text-color-two">Select Priority</h3>
                        <div className="flex flex-col items-center ">
                            {['Low', 'Medium', 'High'].map((priority) => (
                                <button
                                    key={priority}
                                    className="w-full text-left text-sm p-2 hover:bg-gray-200"
                                    onClick={() => {
                                        setSelectedPriority(priority); // Set selected priority
                                        setShowPriorityModal(false); // Close modal after selection
                                    }}
                                >
                                    {priority}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {showStatusModal && (
                <div className="fixed z-30 inset-0 flex justify-center items-center">
                    <div className="bg-white p-4 shadow-md rounded-md flex flex-col w-[250px]">
                        <button className="cursor-pointer flex justify-end" onClick={() => setShowStatusModal(false)}>
                            <Image src={"/images/cancel-task.svg"} alt="Close" width={20} height={20} />
                        </button>
                        <h3 className="text-lg font-semibold text-center mb-4 text-color-two">Select Status</h3>
                        <div className="flex flex-col items-center">
                            {['Not Started', 'In Progress', 'Completed'].map((status) => (
                                <button
                                    key={status}
                                    className="w-full text-left text-sm p-2 hover:bg-gray-200"
                                    onClick={() => {
                                        setSelectedStatus(status); // Set selected status
                                        setShowStatusModal(false); // Close modal after selection
                                    }}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
// "use client"
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { interFont } from "@/fonts/fonts";
// import Logo from "@/components/Logo";
// import Circle from "@/components/Circle";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { useRouter } from "next/navigation";
// import LoadingSpinner from "@/components/LoadingSpinner"; 

// interface Task {
//     title: string;
//     _id: string;
//     checked: boolean;
//     startDate?: Date;
//     endDate?: Date;
//     priority: string;
//     status: string;
// }

// export default function MainPage() {
//     const [showOverlay, setShowOverlay] = useState(false);
//     const [taskTitle, setTaskTitle] = useState('');
//     const [tasks, setTasks] = useState<Task[]>([]);
//     const [isEditing, setIsEditing] = useState(false); // New state to track if editing
//     const [taskToEdit, setTaskToEdit] = useState<Task | null>(null); // Store the task being edited
//     const [showStatusModal, setShowStatusModal] = useState(false); // State for the status modal
//     const [selectedStatus, setSelectedStatus] = useState('Not Started'); // Default status
//     const [startDate, setStartDate] = useState<Date | null>(null);
//     const [endDate, setEndDate] = useState<Date | null>(null);
//     const [showPriorityModal, setShowPriorityModal] = useState(false); // State for the priority modal
//     const [selectedPriority, setSelectedPriority] = useState('Medium'); // Default priority
//     const [loading, setLoading] = useState(false);

 
//     const router = useRouter()

//     const toggleOverlay = () => {
//         setShowOverlay(!showOverlay);
//         if (!showOverlay) {
//             setIsEditing(false); // Reset editing state when overlay is toggled off
//         }
//     };

//     const createTask = async () => {

//         setLoading(true);

//         if (!taskTitle ) {
//             alert("Task title is required!");
//             return;
//         }
        
//         if (!startDate || !endDate) {
//             alert('Start date and End date are both required');
//             return;
//         }
//         if (startDate && endDate) {
//             // Convert to Date objects
//             const start = new Date(startDate);
//             const end = new Date(endDate);
        
//             if (start.getTime() === end.getTime()) {
//                 alert('Start date and End date cannot be equal');
//                 return; // Prevent task creation if dates are equal
//             }
        
//             if (start.getTime() > end.getTime()) {
//                 alert('Start date cannot be later than the end date.');
//                 return; // Prevent task creation if dates are invalid
//             }
//         }
//         if (endDate && endDate < new Date()) {
//             alert('End date cannot be in the past.');
//             return; // Prevent task creation if end date is in the past
//         }
    
        
        

//         try {
//             const response = await fetch(`https://taskify-backend-nq1q.onrender.com/api/tasks`, {
//                 method: 'POST',
//                 credentials: "include",
//                 headers: { 
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ 
//                     title: taskTitle,
//                     startDate: startDate ? startDate.toISOString() : undefined, // Store the full date with time
//                     endDate: endDate ? endDate.toISOString() : undefined, // Store the full date with time
//                     priority: selectedPriority, // Send selected priority
//                     status: selectedStatus

//                 }),
                

//             });
            

//             if (response.ok) {
//                 const newTask: Task = await response.json();
//                 setTasks([...tasks, newTask]);
//                 setTaskTitle('');
//                 setShowOverlay(false);
//                 setStartDate(null); // Reset start date
//                 setEndDate(null); // Reset end dat
//                 setSelectedPriority('Medium');
//                 setSelectedStatus('Not Started');

//             } else {
//                 console.error("Error creating task");
//             }
//         } catch (error) {
//             console.error("Error creating task:", error);
//         }
//         finally {
//             // Stop loading
//             setLoading(false);
//         }
//     };

//     const deleteTask = async (taskId: string) => {
//         try {
//             const response = await fetch(`https://taskify-backend-nq1q.onrender.com/api/tasks/${taskId}`, {
//                 method: 'DELETE',
//                 credentials: 'include'
//             });

//             if (response.ok) {
//                 setTasks(tasks.filter(task => task._id !== taskId));
//             } else {
//                 const errorData = await response.json();
//                 console.error("Error deleting task:", errorData.message || "No message");
//             }
//         } catch (error) {
//             console.error("Error deleting task:", error);
//         }
//     };

//     const handleEditTaskClick = (task: Task) => {
//         setTaskToEdit(task); // Set the task to be edited
//         setTaskTitle(task.title); // Pre-fill the title input with the task's current title
//         setIsEditing(true); // Indicate that we are in edit mode
//         setShowOverlay(true); // Show the overlay for editing
//         setStartDate(task.startDate ? new Date(task.startDate) : null); // Retain original start date or set to null
//         setEndDate(task.endDate ? new Date(task.endDate) : null); // Retain original end date or set to null
//         setSelectedPriority(task.priority || 'Medium'); // Retain original priority or default to 'Medium'
//         setSelectedStatus(task.status || 'Not Started'); // Retain original status or default to 'Not Started'
//     };
    

//     const updateTask = async () => {
//         setLoading(true);

//         if (!taskTitle || !taskToEdit) {
//             alert("Task title is required!");
//             return;
//         }
        
//         if (!startDate || !endDate) {
//             alert('Start date and End date are both required');
//             return;
//         }
//         if (startDate && endDate) {
//             // Convert to Date objects
//             const start = new Date(startDate);
//             const end = new Date(endDate);
        
//             if (start.getTime() === end.getTime()) {
//                 alert('Start date and End date cannot be equal');
//                 return; // Prevent task creation if dates are equal
//             }
        
//             if (start.getTime() > end.getTime()) {
//                 alert('Start date cannot be later than the end date.');
//                 return; // Prevent task creation if dates are invalid
//             }
//         }
//         if (endDate && endDate < new Date()) {
//             alert('End date cannot be in the past.');
//             return; // Prevent task creation if end date is in the past
//         }
    
//         try {
//             const response = await fetch(`https://taskify-backend-nq1q.onrender.com/api/tasks/${taskToEdit._id}`, {
//                 method: 'PUT',
//                 headers: { 'Content-Type': 'application/json' },
//                 credentials: "include",
//                 body: JSON.stringify({ 
//                     title: taskTitle,
//                     startDate: startDate ? startDate.toISOString() : undefined, // Store the full date with time
//                     endDate: endDate ? endDate.toISOString() : undefined ,// Store the full date with time
//                     priority: selectedPriority, // Send selected priority
//                     status: selectedStatus
//                 }),
               
               
//             });

//             if (response.ok) {
//                 const updatedTask = await response.json();
//                 setTasks(tasks.map(task => task._id === updatedTask._id ? updatedTask : task));
//                 setTaskToEdit(null);
//                 setTaskTitle('');
//                 setShowOverlay(false);
//                 setIsEditing(false);
//             } else {
//                 console.error("Error updating task");
//             }
//         } catch (error) {
//             console.error("Error updating task:", error);
//         }
//         finally {
//             // Stop loading
//             setLoading(false);
//         }
//     };
//     // const handleLogout = async () => {
//     //     try {
//     //         const response = await fetch('https://your-backend-domain.com/api/logout', {
//     //             method: 'POST',
//     //             credentials: 'include',
//     //             headers: {
//     //                 'Content-Type': 'application/json',
//     //             },
//     //         });
    
//     //         console.log('Response Status:', response.status); // Log the status code
    
//     //         if (response.ok) {
//     //             document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//     //             router.push('/login');
//     //         } else {
//     //             console.error("Failed to logout:", await response.json()); // Log the error response
//     //         }
//     //     } catch (error) {
//     //         console.error("Error logging out:", error);
//     //     }
//     // };
    
//     const scheduleTasks = async () => {
//         setLoading(true);  // Start loading

//         try {
//             const response = await fetch(`https://taskify-backend-nq1q.onrender.com/api/tasks/schedule-tasks`, {
//                 method: 'POST',
//                 credentials: 'include',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });

//             if (response.ok) {
//                 const responseJson = await response.json();
//                 setTasks(responseJson.scheduledTasks); // Access the 'scheduledTasks' array inside the response object
                
//                 if (Array.isArray(responseJson)) {
//                     setTasks(responseJson); // Ensure we are setting tasks only if it's an array
//                 } else {
//                     console.error("Expected an array, but got:", responseJson);
//                 }
//             } else {
//                 console.error("Error scheduling tasks:", await response.text());
//             }
//         } catch (error) {
//             console.error("Error in scheduleTasks:", error);
//         } finally {
//             setLoading(false);  // Stop loading
//         }
//     };
   
//     useEffect(() => {
//         const fetchTasks = async () => {
//             try {
//                 const response = await fetch(`https://taskify-backend-nq1q.onrender.com/api/tasks`, {
//                     method: 'GET',
//                     credentials: 'include',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 });
    
//                 if (!response.ok) {
//                     const errorMessage = await response.text(); // Get the response as plain text
//                     console.error('Error fetching tasks:', errorMessage);
//                     router.push('/login')
//                     return;
                    
//                 }
    
//                 const data = await response.json();
                
//                 // Ensure `data` is an array before calling `.map()`
//                 if (Array.isArray(data)) {
//                     setTasks(data);  // Only set tasks if `data` is an array
//                 } else {
//                     console.error('Data is not an array:', data);
//                 }
//             } catch (error) {
//                 console.error('Error in fetchTasks:', error);
//             }
//         };
    
//         fetchTasks();
//     }, [router]);
    
    

//     return (
//         <div className={`${interFont.className} flex flex-col`}>
//             <div className="flex items-center justify-between bg-color-two py-4 px-8 sm:px-24 md:px-28 lg:px-36 xl:px-52">
//                 <Logo src="/images/logo.svg" alt="logo" logoText="Taskify" textColor="text-white" />
//                 <button
//                     onClick={scheduleTasks}
//                     className="bg-blue-500 text-white p-2 rounded"
//                     disabled={loading}
//                 >
//                     {loading ? "Scheduling..." : "Implement G.A"}
//                 </button>
//             </div>

//             <div className="mt-4 flex flex-col items-center">
//                 {Array.isArray(tasks) && tasks.length > 0 ? (
//                     tasks.map((task) => (
//                         <div key={task._id} className="p-4 bg-gray-200 rounded-md shadow-md w-[80%] flex items-center justify-between mt-4">
//                             <div className="cursor-pointer" onClick={() => handleEditTaskClick(task)}>
//                                 {task.status === "Completed" ? (
//                                 <Image src={"/images/check-task.svg"} alt="Completed task" width={26} height={26} />
//                                 ) : task.status === "In Progress" ? (
//                                 <Image src={"/images/pending.svg"} alt="In Progress task" width={26} height={26} />
//                                 ) : (
//                                 <Circle  />
//                                 )}
//                             </div>

//                             <div className="ml-4 flex-grow">
//                                 <p className="text-[12px] font-bold" onClick={() => handleEditTaskClick(task)}>{task.title}</p>
//                                 {/* <p className="text-[10px]">{task.status}</p> */}
//                             </div>
//                             <button className="cursor-pointer flex justify-end flex-shrink-0" onClick={() => deleteTask(task._id)}>
//                             <Image src={"/images/cancel-task.svg"} alt="Cancel task Button" width={20} height={20} />
//                         </button>
//                         </div>
//                     ))
//             ) : (
//           <p>No tasks available</p>
//         )}

//             </div>

//             <div className="flex flex-col justify-center items-center " style={{ height: 'calc(100vh - 400px)' }}>
//                 <button onClick={toggleOverlay} className="duration-200 hover:bg-color-one rounded-full">
//                     <Image src={"/images/create-task.svg"} alt="Create task Button" width={60} height={60} />
//                 </button>
//                 <p className="text-center text-color-two text-sm ">Create a task</p>
//             </div>

//             {showOverlay && (
//                 <div className="fixed z-30 inset-0 bg-black bg-opacity-50 flex justify-center min-h-screen items-center">
//                     <div className="bg-white p-4 rounded-lg flex flex-col h-auto w-[80%] sm:w-[50%] md:w-[40%] lg:w-[35%] justify-around overlay">
//                         <button className="cursor-pointer flex justify-end" onClick={toggleOverlay}>
//                             <Image src={"/images/cancel-task.svg"} alt="Cancel task Button" width={20} height={20} />
//                         </button>
//                         <textarea
//                             placeholder="Add Task Title..." 
//                             className="text-center placeholder:text-xl font-semibold outline-none placeholder:text-slate-400" 
//                             maxLength={30}  
//                             value={taskTitle}
//                             autoFocus
//                             onChange={(e) => setTaskTitle(e.target.value)}
//                             onKeyDown={(e) => {
//                                 if (e.key === 'Enter') {
//                                     e.preventDefault();
//                                     isEditing ? updateTask() : createTask();
//                                 }
//                             }}
//                         />
//                         <input placeholder="Add title description..." className="text-xs text-center border-none outline-none placeholder:text-slate-500"></input>
//                        {/* Start Date Picker */}
//                         <div className="flex items-center border-b gap-4 p-3 mt-4">
//                             <div className="flex items-center gap-4 ">
//                                 <button className="">
//                                     <Image src={"/images/start-date.svg"} alt="Start Date Button" width={25} height={25} />
//                                 </button>
                               
//                                 {/* <p className="text-[#555855] text-xs font-semibold">Start</p> */}
//                             </div>
                           
//                             <DatePicker
//                                 selected={startDate}
//                                 onChange={(date) => setStartDate(date)}
//                                 showTimeSelect
//                                 dateFormat="Pp"
//                                 placeholderText="Set Start Date"
//                                 className="outline-none text-xs cursor-pointer text-[#555855] font-semibold"
//                             />
                           
                            
//                         </div>
                        
//                         <div className="flex items-center border-b gap-4 p-3">
//                             <div className="flex items-center gap-4">
//                                 <button>
//                                     <Image src={"/images/end-date.svg"} alt="End Date Button" width={25} height={25} />
//                                 </button>
//                             </div>

                        
//                             <DatePicker
//                                 selected={endDate}
//                                 onChange={(date) => setEndDate(date)}
//                                 showTimeSelect
//                                 dateFormat="Pp"
//                                 placeholderText="Set End Date"
//                                 className="outline-none text-xs cursor-pointer text-[#555855] font-semibold"
//                                 minDate={new Date()}
//                             />
                          
                           
//                         </div>
//                         {/* End Date Picker */}
                        
//                         <div className="flex items-center border-b gap-4 p-4">
//                             <button onClick={() => setShowPriorityModal(true)}>
//                                 <Image 
//                                 src={"/images/priority.svg"} 
//                                 alt="Priority Button" 
//                                 width={20} id="set-priority"
//                                 height={20} />
//                             </button>
                            
//                             <p onClick={() => setShowPriorityModal(true)} className="text-[#555855] text-xs font-semibold cursor-pointer">{` ${selectedPriority}`}</p>
//                         </div>
//                         <div className="flex items-center border-b gap-4 p-4">
//                             <button id="set-status" onClick={() => setShowStatusModal(true)}>
//                                 <Image 
//                                 src={"/images/status.svg"} 
//                                 alt="Status Button" 
//                                 width={25} 
//                                 height={25} />
//                             </button>
//                             <p  onClick={() => setShowStatusModal(true)} className="text-[#555855] text-xs font-semibold cursor-pointer">{`${selectedStatus}`}</p>
//                         </div>

//                         <button onClick={isEditing ? updateTask : createTask} className="duration-200 hover:bg-color-one rounded-full flex self-center mt-2">
//                             {loading ? (
//                                 <LoadingSpinner />
//                             ) : (
//                                 <Image
//                                     src={isEditing ? "/images/edit-task.svg" : "/images/create-task.svg"}
//                                     alt={isEditing ? "Edit task Button" : "Create task Button"}
//                                     width={50}
//                                     height={50}
//                                 />
//                             )}
//                         </button>
//                         <p className="text-xs font-light text-center mt-1">
//                         {loading ? "Loading..." : isEditing ? "Edit task" : "Create task"}
//                         </p>

//                     </div>
//                 </div>
//             )}
//             {showPriorityModal && (
//                 <div className="fixed z-40 inset-0  flex justify-center items-center">
//                     <div className="bg-white p-4 shadow-md flex flex-col w-[250px] rounded-md">
//                         <button className="cursor-pointer flex justify-end" onClick={() => setShowPriorityModal(false)}>
//                             <Image src={"/images/cancel-task.svg"} alt="Close" width={20} height={20} />
//                         </button>
//                         <h3 className="text-lg font-semibold text-center mb-4 text-color-two">Select Priority</h3>
//                         <div className="flex flex-col items-center ">
//                             {['Low', 'Medium', 'High'].map((priority) => (
//                                 <button
//                                     key={priority}
//                                     className="w-full text-left text-sm p-2 hover:bg-gray-200"
//                                     onClick={() => {
//                                         setSelectedPriority(priority); // Set selected priority
//                                         setShowPriorityModal(false); // Close modal after selection
//                                     }}
//                                 >
//                                     {priority}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {showStatusModal && (
//                 <div className="fixed z-30 inset-0 flex justify-center items-center">
//                     <div className="bg-white p-4 shadow-md rounded-md flex flex-col w-[250px]">
//                         <button className="cursor-pointer flex justify-end" onClick={() => setShowStatusModal(false)}>
//                             <Image src={"/images/cancel-task.svg"} alt="Close" width={20} height={20} />
//                         </button>
//                         <h3 className="text-lg font-semibold text-center mb-4 text-color-two">Select Status</h3>
//                         <div className="flex flex-col items-center">
//                             {['Not Started', 'In Progress', 'Completed'].map((status) => (
//                                 <button
//                                     key={status}
//                                     className="w-full text-left text-sm p-2 hover:bg-gray-200"
//                                     onClick={() => {
//                                         setSelectedStatus(status); // Set selected status
//                                         setShowStatusModal(false); // Close modal after selection
//                                     }}
//                                 >
//                                     {status}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }
