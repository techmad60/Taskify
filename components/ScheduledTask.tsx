"use client";
import { useEffect, useState } from "react";

interface FinalTask {
    _id: string;
    title: string;
    startDate: Date | null; // Use Date type
    endDate: Date | null;   // Use Date type
    priority: string;
    status: string;
    user: string; // Adjust as needed
    estimatedDuration: number;
    __v: number;
}

export default function ScheduledTasksPage() {
    const [optimizedTasks, setOptimizedTasks] = useState<FinalTask[]>([]);
    const [error, setError] = useState<string | null>(null); // Allow error to be a string or null
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchOptimizedTasks = async () => {
            setLoading(true);
            setError(null);

            try {
                // Fetch optimized tasks from the API
                const response = await fetch('https://taskify-backend-nq1q.onrender.com/api/tasks/schedule', {
                    method: 'GET', // Use GET to retrieve optimized tasks
                    credentials: 'include', // Include credentials for session management
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch optimized tasks'); // Throw error if response is not ok
                }

                const data = await response.json(); // Parse the JSON response
                const { scheduledTasks } = data; // Destructure the response
                

                // Convert the tasks to FinalTask format
                const fetchedTasks: FinalTask[] = scheduledTasks.map((task: any) => {
                    const startDate = task.startDate ? new Date(task.startDate) : null; // Parse directly from string
                    const endDate = task.endDate ? new Date(task.endDate) : null; // Parse directly from string

                    return {
                        _id: task._id,
                        title: task.title,
                        startDate: startDate,
                        endDate: endDate,
                        priority: task.priority,
                        status: task.status,
                        user: task.user,
                        estimatedDuration: task.estimatedDuration,
                        __v: task.__v,
                    };
                });

                setOptimizedTasks(fetchedTasks); // Set the optimized tasks in state
                console.log("Fetched optimized tasks from API:", fetchedTasks);

            } catch (error) {
                console.error("Error fetching optimized tasks:", error);
                setError("Failed to fetch optimized tasks."); // Handle error
            } finally {
                setLoading(false); // Reset loading state
            }
        };

        fetchOptimizedTasks(); // Call the function when the component mounts
    }, []); // No dependencies, this runs once when the component mounts

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
        </div>
    );
}


