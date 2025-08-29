import { Task } from "@/types/tasks";
import React, { createContext, ReactNode, useState } from "react";
import { toast } from "sonner-native";

interface TasksContextData {
  tasks: Task[];
  addTask: (title: string) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
}

export const TasksContext = createContext<TasksContextData | undefined>(
  undefined
);

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Create project structure", isCompleted: true },
    { id: "2", title: "Build UI components", isCompleted: false },
    { id: "3", title: "Connect to a database", isCompleted: false },
  ]);

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Math.random().toString(),
      title,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
    toast.success("Task added successfully");
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast(`Task deleted successfully`);
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          if (!task.isCompleted) {
            toast.success("Task marked as completed");
          }
          return { ...task, isCompleted: !task.isCompleted };
        }
        return task;
      })
    );
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, deleteTask, toggleTask }}>
      {children}
    </TasksContext.Provider>
  );
};
