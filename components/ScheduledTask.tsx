"use client"
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface Task {
  title: string;
  _id: string;
  startDate?: string;  // Change to string to match parsed JSON
  endDate?: string;    // Change to string to match parsed JSON
  priority: string;
  status: string;
}

export default function ScheduledTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const searchParams = useSearchParams();
  const tasksJson = searchParams.get('tasks');
  
  // Parse tasks only if tasksJson is available
  useEffect(() => {
    if (tasksJson) {
      try {
        const parsedTasks: Task[] = JSON.parse(decodeURIComponent(tasksJson));
        setTasks(parsedTasks);
      } catch (error) {
        console.error('Error parsing tasks:', error);
      }
    }
  }, [tasksJson]);

  useEffect(() => {
    const fetchScheduledTasks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/tasks/schedule-tasks', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const scheduledTasks = await response.json();
          setTasks(prevTasks => [...prevTasks, ...scheduledTasks]); // Append fetched tasks
        } else {
          console.error('Failed to fetch scheduled tasks');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchScheduledTasks();
  }, []);

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
              <p>{`Start Date: ${task.startDate ? new Date(task.startDate).toLocaleDateString() : 'N/A'}`}</p>
              <p>{`End Date: ${task.endDate ? new Date(task.endDate).toLocaleDateString() : 'N/A'}`}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
