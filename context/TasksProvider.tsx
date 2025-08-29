import { Task } from "@/types/tasks";
import React, { createContext, ReactNode, useState } from "react";

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
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, deleteTask, toggleTask }}>
      {children}
    </TasksContext.Provider>
  );
};
