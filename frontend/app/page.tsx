"use client";
import { FormAdd } from "@/components/FormAdd";
import { FormEdit } from "@/components/FormEdit";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/context/AuthProvider";
import { useToast } from "@/hooks/use-toast";
import {
  deleteTask,
  getAllTasks,
  updateTaskStatus,
} from "@/services/todosServices";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Task {
  _id: string;
  task: string;
  description: string;
  completed: boolean;
  updatedAt: string;
  __v: number;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { toast } = useToast();
  const fetchTasks = async () => {
    const data = await getAllTasks();
    setTasks(data);
  };
  const auth = useAuth();
  useEffect(() => {
    fetchTasks();
  }, []);

  // avoid reload after changing status of task by update it in the state
  const handleStatusToggle = async (id: string) => {
    await updateTaskStatus(id);
    fetchTasks();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
    toast({
      description: "Task Deleted Successfully.",
    });
    fetchTasks();
  };

  return (
    <div className="px-5 min-h-[30vh] flex flex-col gap-5">
      {auth?.token ? (
        <>
          <div className="mr-auto w-fit mb-10">
            <FormAdd onTaskAdded={fetchTasks} />
          </div>

          {tasks &&
            tasks.map((task: Task) => (
              <div
                key={task._id}
                className={`flex items-start justify-between space-x-2 ${
                  task.completed ? "line-through" : ""
                }`}
              >
                <div className="flex items-start gap-5">
                  <Checkbox
                    id={task._id}
                    defaultChecked={task.completed}
                    onCheckedChange={() => handleStatusToggle(task._id)}
                  />
                  <label
                    htmlFor={task._id}
                    className="flex flex-col gap-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {task.task}
                    <small className="text-slate-400">{task.description}</small>
                  </label>
                </div>
                <div className="flex items-center gap-5">
                  <FormEdit onTaskAdded={fetchTasks} task={task} />

                  <Trash2
                    size={20}
                    className="cursor-pointer hover:text-red-600 duration-200"
                    onClick={() => handleDeleteTask(task._id)}
                  />
                </div>
              </div>
            ))}
        </>
      ) : (
        <h1 className="text-center font-semibold">Please Login First</h1>
      )}
    </div>
  );
}
