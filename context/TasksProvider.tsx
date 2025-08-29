import { Task } from "@/types/tasks";
import React, { createContext, ReactNode, useState } from "react";
import { toast } from "sonner-native";

/**
 * @interface TasksContextData
 * @description Defines the shape of the data provided by the TasksContext.
 * @property {Task[]} tasks - An array of task objects.
 * @property {(title: string) => void} addTask - A function to add a new task.
 * @property {(id: string) => void} deleteTask - A function to delete a task by its ID.
 * @property {(id: string) => void} toggleTask - A function to toggle the completion status of a task by its ID.
 */
interface TasksContextData {
  tasks: Task[];
  addTask: (title: string) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
}

/**
 * @const TasksContext
 * @description A React context for managing tasks.
 */
export const TasksContext = createContext<TasksContextData | undefined>(
  undefined
);

/**
 * @function TasksProvider
 * @description A component that provides the TasksContext to its children.
 * @param {ReactNode} children - The child components to be rendered within the provider.
 * @returns {JSX.Element} - A JSX element that provides the task management context.
 */
export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Create project structure", isCompleted: true },
    { id: "2", title: "Build UI components", isCompleted: false },
    { id: "3", title: "Connect to a database", isCompleted: false },
  ]);

  /**
   * @function addTask
   * @description Adds a new task to the list.
   * @param {string} title - The title of the new task.
   */
  const addTask = (title: string) => {
    const newTask: Task = {
      id: Math.random().toString(),
      title,
      isCompleted: false,
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
    toast.success("Task added successfully");
  };

  /**
   * @function deleteTask
   * @description Deletes a task from the list by its ID.
   * @param {string} id - The ID of the task to be deleted.
   */
  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    toast(`Task deleted successfully`);
  };

  /**
   * @function toggleTask
   * @description Toggles the completion status of a task by its ID.
   * @param {string} id - The ID of the task to be toggled.
   */
  const toggleTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
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
