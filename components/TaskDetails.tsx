"use client";
import HeaderTasks from "@/components/HeaderTasks";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "./Loading";

interface Task {
    title: string;
    _id: string;
    checked: boolean;
    startDate?: Date;
    endDate?: Date;
    timeLeft: number;  // Ensure "timeLeft" is used here
    estimatedDuration: number;
    priority: string;
    status: string;
}

export default function TaskDetails() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`http://localhost:5000/api/tasks`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                if (!response.ok) {
                    const errorMessage = await response.text();
                    console.error('Error fetching tasks:', errorMessage);
                    router.push('/login');
                    return;
                }
    
                const data = await response.json();
                // Adjust this line based on the actual response structure
                // const { taskdetails } = data;
                const fetchedTasks: Task[] = data.map((task: any) => {  // If data is an array, use it directly
                    const startDate = task.startDate ? new Date(task.startDate) : null;
                    const endDate = task.endDate ? new Date(task.endDate) : null;
                    console.log('Task with timeLeft:', task); // Check if timeLeft is being received
                    return {
                        _id: task._id,
                        title: task.title || 'Untitled Task',
                        startDate: startDate,
                        endDate: endDate,
                        priority: task.priority || 'Medium',
                        status: task.status || 'Not Started',
                        timeLeft: task.timeLeft || 0,  // Fixed the casing here
                        estimatedDuration: task.estimatedDuration || 0,
                    };
                });
    
                setTasks(fetchedTasks);
            } catch (error) {
                console.error('Error in fetchTasks:', error);
                setError('Failed to fetch tasks');
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, [router]);
    //Function to determine the background color based on time left
    const getTaskColor = (timeLeft: number) => {
        if (timeLeft <= 24) {
            return "text-red-600"; // Red for less than or equal to 24 hours
        } else if (timeLeft > 24 && timeLeft <= 48) {
            return "text-yellow-500"; // Yellow for greater than 24 and less than or equal to 48 hours
        } else {
            return "text-green-600"; // Green for greater than 48 hours
        }
    };
    
    return (
        <div>
            <HeaderTasks />
            <div className="p-8 bg-color-zero flex flex-col items-center mt-8">
                <h1 className="text-2xl font-bold text-color-two text-center">Tasks Details</h1>
                <div className="mt-12 flex flex-col gap-6 lg:grid grid-cols-4">
                    {tasks.length === 0 ? (
                        <p className="text-gray-500">No tasks found.</p>
                    ) : (
                        tasks.map((task, index) => (
                            <div key={task._id} className={`p-4 bg-gray-200 rounded-md shadow-md my-2 w-[15rem] h-auto text-center flex flex-col gap-3 py-6`}>
                                <h2 className="text-lg text-center font-semibold px-12 text-color-two">{task.title}</h2>
                                <p>{`Start Date: ${task.startDate ? task.startDate.toLocaleDateString() : 'N/A'}`}</p>
                                <p>{`End Date: ${task.endDate ? task.endDate.toLocaleDateString() : 'N/A'}`}</p>
                                <p>{`Duration: ${task.estimatedDuration}`} hours</p>
                                <p>Time Left: <span className={`${getTaskColor(task.timeLeft)}`}>{`${task.timeLeft}`}  hours</span></p>
                                <p>Priority: {task.priority}</p>
                                <p>Status: {task.status}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
