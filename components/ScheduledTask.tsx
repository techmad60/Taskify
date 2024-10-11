"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface FinalTask {
    _id: string;
    title: string;
    startDate: Date | null;
    endDate: Date | null;
    priority: string;
    status: string;
    // user: string;
    // estimatedDuration: number;
    // __v: number;
}

export default function ScheduledTasksPage() {
    const [optimizedTasks, setOptimizedTasks] = useState<FinalTask[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

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
                    throw new Error('Failed to fetch optimized tasks');
                }

                const data = await response.json();
                const { scheduledTasks } = data;

                console.log("Scheduled tasks fetched:", scheduledTasks);

                const fetchedTasks: FinalTask[] = scheduledTasks.map((task: any) => {
                    const startDate = task.startDate ? new Date(task.startDate) : null;
                    const endDate = task.endDate ? new Date(task.endDate) : null;

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
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-color-two">Scheduled Tasks</h1>
            {loading && <p>Loading tasks...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <div className="mt-4">
                {optimizedTasks.length === 0 ? (
                    <p className="text-gray-500">No optimized tasks found.</p>
                ) : (
                    optimizedTasks.map((task) => (
                        <div key={task._id} className="p-4 bg-gray-200 rounded-md shadow-md my-2">
                            <h2 className="text-lg font-semibold">{task.title}</h2>
                            <p>Priority: {task.priority}</p>
                            <p>Status: {task.status}</p>
                            <p>{`Start Date: ${task.startDate ? task.startDate.toLocaleDateString() : 'N/A'}`}</p>
                            <p>{`End Date: ${task.endDate ? task.endDate.toLocaleDateString() : 'N/A'}`}</p>
                        </div>
                    ))
                )}
            </div>
            <Link href="/mainpage"><button>Return</button></Link>
        </div>
    );
    
}
