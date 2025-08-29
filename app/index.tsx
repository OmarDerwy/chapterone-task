import TaskList from "@/components//tasks/TaskList";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Task } from "@/types/tasks";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

// This is the main screen of the app.
export default function ToDoScreen() {
  // In a real app, this state would be managed with useState, context, or a state management library.
  const [tasks, setTasks] = React.useState<Task[]>([
    { id: "1", title: "Create project structure" },
    { id: "2", title: "Build UI components" },
    { id: "3", title: "Connect to a database" },
  ]);

  const fabBackgroundColor = useThemeColor({}, "tint");
  const fabTextColor = useThemeColor({}, "background");

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
    <>
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
        <ThemedView style={styles.bottom}>
          <Pressable
            style={[styles.fab, { backgroundColor: fabBackgroundColor }]}
            onPress={() => console.log("Add new task")}
          >
            <ThemedText style={[styles.fabText, { color: fabTextColor }]}>
              +
            </ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 64,
  },
  title: {
    marginLeft: 20,
    marginBottom: 20,
    fontSize: 32,
    fontWeight: 900,
  },
  bottom: {
    // flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  fab: {
    // position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    margin: 40,
    // right: 20,
    // bottom: 20,
    borderRadius: 28,
    elevation: 8, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabText: {
    fontSize: 24,
    lineHeight: 24, // Adjust for vertical alignment
  },
});
