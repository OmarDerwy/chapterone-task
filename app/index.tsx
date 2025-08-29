
import TaskList from '@/components//tasks/TaskList';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from "@/components/ThemedView";
import { Task } from '@/types/tasks';
import React from 'react';
import { StyleSheet } from 'react-native';

// This is the main screen of the app.
export default function ToDoScreen() {
  // In a real app, this state would be managed with useState, context, or a state management library.
  const [tasks, setTasks] = React.useState<Task[]>([
    { id: "1", title: "Create project structure" },
    { id: "2", title: "Build UI components" },
    { id: "3", title: "Connect to a database" },
  ]);

  const handleDeleteTask = (taskId: string) => {
    // Logic to delete a task
    setTasks((prevTasks: Task[]) =>
      prevTasks.filter((task) => task.id !== taskId)
    );
    console.log("Deleting task:", taskId);
  };

  const handleCompleteTask = (taskId: string, newValue: boolean) => {
    setTasks((prevTasks: Task[]) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: newValue } : task
      )
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Task List</ThemedText>
      <TaskList
        tasks={tasks}
        onDelete={handleDeleteTask}
        onCheckboxToggle={handleCompleteTask}
      />
      {/* <Link href="/(modals)/add" asChild>
            <Button title="Add New Task" />
        </Link> */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingVertical: 64
  },
  title: {
    marginBottom: 20,
    fontSize: 32,
    fontWeight: 900
  }
});
