"use client";
import { useEffect, useState } from "react";
import HeaderTasks from "./HeaderTasks";
import { useRouter } from "next/navigation";

interface FinalTask {
    _id: string;
    title: string;
    startDate: Date | null;
    endDate: Date | null;
    priority: string;
    status: string;
    timeLeft: number;
    // user: string;
    estimatedDuration: number;
    // __v: number;
}

export default function ScheduledTasksPage() {
    const [optimizedTasks, setOptimizedTasks] = useState<FinalTask[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    useEffect(() => {
        const fetchOptimizedTasks = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch('http://localhost:5000/api/tasks/schedule', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    const errorMessage = await response.text();
                    console.error('Error fetching tasks:', errorMessage);
                    router.push('/login');
                    return;
                }

                const data = await response.json();
                const { scheduledTasks } = data;

                console.log("Scheduled tasks fetched:", scheduledTasks);

                const fetchedTasks: FinalTask[] = scheduledTasks.map((task: any) => {
                    const startDate = task.startDate ? new Date(task.startDate) : null;
                    const endDate = task.endDate ? new Date(task.endDate) : null;
                    console.log('Task with timeLeft:', task); // Check if timeLeft is being received
                    return {
                        _id: task._id,
                        title: task.title || 'Untitled Task', // Fallback if title is missing
                        startDate: startDate,
                        endDate: endDate,
                        priority: task.priority || 'Medium', // Default priority if missing
                        status: task.status || 'Not Started', // Default status if missing
                        user: task.user || 'Unknown',
                        estimatedDuration: task.estimatedDuration || 0,
                        __v: task.__v || 0,
                        timeLeft: task.timeLeft || 0, 
                    };
                });


                setOptimizedTasks(fetchedTasks);
            } catch (error) {
                console.error("Error fetching optimized tasks:", error);
                setError("Failed to fetch optimized tasks.");
            } finally {
                setLoading(false);
            }
        };

        fetchOptimizedTasks();
    }, [router]);

    return (
        <div>
            <HeaderTasks />
            <div className="p-8 bg-color-zero flex flex-col items-center mt-8">
                <h1 className="text-2xl font-bold text-color-one text-center">Automatically Scheduled Tasks</h1>
                {loading && <p>Loading tasks...</p>}
                {error && <p className="text-red-500">{error}</p>}
                <div className="mt-12 flex flex-col gap-6 lg:grid grid-cols-4">
                    {optimizedTasks.length === 0 ? (
                        <p className="text-gray-500">No optimized tasks found.</p>
                    ) : (
                        optimizedTasks.map((task, index) => (
                            <div key={task._id} className={`p-4 bg-gray-200 rounded-md shadow-md my-2 w-[15rem] h-auto text-center flex flex-col gap-3 py-6`}>
                                <p className="bg-color-two font-semibold text-white flex self-center rounded-full w-[2rem] h-[2rem] justify-center items-center">{index + 1}</p>
                                <h2 className="text-lg text-center font-semibold px-12 text-color-two">{task.title}</h2>
                                <p>Status: {task.status}</p>
                                {/* <p>Priority: {task.priority}</p>
                                <p>{`Start Date: ${task.startDate ? task.startDate.toLocaleDateString() : 'N/A'}`}</p>
                                <p>{`End Date: ${task.endDate ? task.endDate.toLocaleDateString() : 'N/A'}`}</p>
                                <p>{`Duration: ${(task.estimatedDuration)}`} hours</p> */}
                            </div>
                            
                        ))
                    )}
                </div>
            </div>
        </div>
        
    );
    
}
