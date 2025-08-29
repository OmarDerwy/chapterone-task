import TaskList from "@/components//tasks/TaskList";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTasks } from "@/hooks/useTasks";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

// This is the main screen of the app.
export default function ToDoScreen() {
  const { tasks, deleteTask, toggleTask } = useTasks();

  // These are the colors for the circular "add tasks" button at the bottom
  const fabBackgroundColor = useThemeColor({}, "tint");
  const fabTextColor = useThemeColor({}, "background");

  return (
    <>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Task List</ThemedText>
        <ThemedView style={{ flex: 1 }}>
          <TaskList
            tasks={tasks}
            onDelete={deleteTask}
            onCheckboxToggle={(taskId) => toggleTask(taskId)}
          />
        </ThemedView>
        <ThemedView style={styles.bottom}>
          {/* <Link href="/modals/add-task" asChild> */}
          <Pressable
            style={[styles.fab, { backgroundColor: fabBackgroundColor }]}
            onPress={() => router.push("/modals/add-task")}
          >
            <ThemedText style={[styles.fabText, { color: fabTextColor }]}>
              +
            </ThemedText>
          </Pressable>
          {/* </Link> */}
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
    position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    // margin: 40,
    // right: 20,
    bottom: 40,
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
