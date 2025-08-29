import { Task } from "@/types/tasks";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onDelete: (taskId: string) => void;
  onCheckboxToggle: (taskId: string, newValue: boolean) => void;
}

// A component to render a list of tasks.
export default function TaskList({
  tasks,
  onDelete,
  onCheckboxToggle,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <ThemedView style={styles.emptyContainer}>
        <ThemedText style={styles.emptyText}>
          No tasks yet. Add one to get started!
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <FlatList
      data={tasks}
      renderItem={({ item }) => (
        <TaskItem
          task={item}
          onDelete={onDelete}
          onCheckboxToggle={onCheckboxToggle}
        />
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 20,
    paddingLeft: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
  },
});
