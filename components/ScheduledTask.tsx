"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface MongoDate {
    $date: {
        $numberLong: string;
    };
}

interface IncomingTask {
    _id: string;
    title: string;
    startDate: MongoDate;
    endDate: MongoDate;
    priority: string;
    status: string;
    user: string; // Assuming user is a string; adjust accordingly
    estimatedDuration: number;
    __v: number;
}

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
    const [tasks, setTasks] = useState<FinalTask[]>([]); // Change this to FinalTask[]
    const searchParams = useSearchParams();
    const tasksJson = searchParams.get("tasks");

    useEffect(() => {
        if (tasksJson) {
            const parsedTasks: IncomingTask[] = JSON.parse(decodeURIComponent(tasksJson));
    
            const tasksWithParsedDates: FinalTask[] = parsedTasks.map((task) => ({
                _id: task._id,
                title: task.title,
                startDate: task.startDate ? new Date(parseInt(task.startDate.$date.$numberLong)) : null,
                endDate: task.endDate ? new Date(parseInt(task.endDate.$date.$numberLong)) : null,
                priority: task.priority,
                status: task.status,
                user: task.user,
                estimatedDuration: task.estimatedDuration,
                __v: task.__v,
            }));
    
            console.log("Parsed tasks with dates:", tasksWithParsedDates); // Log to check parsing
            setTasks(tasksWithParsedDates);
        }
    }, [tasksJson]);
    
    

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-color-two">Scheduled Tasks</h1>
            <div className="mt-4">
                {tasks.length === 0 ? (
                    <p className="text-gray-500">No scheduled tasks found.</p>
                ) : (
                    tasks.map((task) => (
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

//   useEffect(() => {
//     const fetchTasks = async () => {
//       // Parse tasks from URL params
//       let parsedTasks: Task[] = [];
//       if (tasksJson) {
//         try {
//           parsedTasks = JSON.parse(decodeURIComponent(tasksJson));
//           if (!Array.isArray(parsedTasks)) {
//             console.error("Parsed tasks is not an array:", parsedTasks);
//             parsedTasks = []; // Reset to empty if not an array
//           }
//         } catch (error) {
//           console.error("Error parsing tasks:", error);
//           parsedTasks = []; // Reset to empty if there's an error
//         }
//       }

//     //   // Fetch scheduled tasks from the API
//     //   try {
//     //     const response = await fetch(
//     //       "https://taskify-backend-nq1q.onrender.com/api/tasks/schedule-tasks",
//     //       {
//     //         method: "GET",
//     //         credentials: "include",
//     //         headers: {
//     //           "Content-Type": "application/json",
//     //         },
//     //       }
//     //     );

//     //     if (response.ok) {
//     //       const data = await response.json();
//     //       if (Array.isArray(data.scheduledTasks)) {
//     //         // Create a map to filter unique tasks based on _id
//     //         const uniqueTasksMap = new Map<string, Task>();

//     //         // Add existing tasks from URL
//     //         parsedTasks.forEach((task) => uniqueTasksMap.set(task._id, task));

//     //         data.scheduledTasks.forEach((task: Task) => {
//     //             // Convert BSON dates to JavaScript Date objects
//     //             if (task.startDate && typeof task.startDate === "string") {
//     //               task.startDate = new Date(task.startDate); // Assuming it’s coming as a string initially
//     //             }
//     //             if (task.endDate && typeof task.endDate === "string") {
//     //               task.endDate = new Date(task.endDate);
//     //             }
        
//     //             uniqueTasksMap.set(task._id, task);
//     //           });
        

//     //         // Convert map back to an array and update state
//     //         const uniqueTasks = Array.from(uniqueTasksMap.values());
//     //         setTasks(uniqueTasks);
//     //       } else {
//     //         console.error("Fetched scheduledTasks is not an array:", data.scheduledTasks);
//     //       }
//     //     } else {
//     //       console.error("Failed to fetch scheduled tasks");
//     //     }
//     //   } catch (error) {
//     //     console.error("Error:", error);
//     //   }
//     };

//     fetchTasks();
//   }, [tasksJson]); // Dependency array includes tasksJson only
