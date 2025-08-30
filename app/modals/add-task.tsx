import { ThemedView } from "@/components/ThemedView";
import { useTasks } from "@/hooks/useTasks";
import { useThemeColor } from "@/hooks/useThemeColor";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  useColorScheme,
} from "react-native";

/**
 * @function AddTaskModal
 * @description A modal component for adding new tasks.
 * @returns {JSX.Element} - A JSX element that renders the add task modal.
 */
export default function AddTaskModal() {
  const [title, setTitle] = useState("");
  const { addTask } = useTasks();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const modalBackgroundColor = useThemeColor({}, "modalBorder");

  /**
   * @function handleAddTask
   * @description Handles the addition of a new task.
   */
  const handleAddTask = () => {
    if (title.trim()) {
      // If there is a task, add it and close the modal
      addTask(title.trim());
      router.back();
    } else {
      // If the text input is empty, just go back
      router.back();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <BlurView
        intensity={colorScheme === "dark" ? 30 : 200}
        style={StyleSheet.absoluteFill}
      />
      <Pressable style={styles.backdrop} onPress={() => router.back()}>
        <Pressable style={styles.modal} onPress={(e) => e.stopPropagation()}>
          <ThemedView
            style={{
              ...styles.modalView,
              backgroundColor: modalBackgroundColor,
            }}
          >
            <TextInput
              style={styles.input}
              placeholder="Enter your task"
              placeholderTextColor="#999"
              value={title}
              onChangeText={setTitle}
              onSubmitEditing={handleAddTask}
              autoFocus
            />
          </ThemedView>
        </Pressable>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdrop: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 160,
  },
  modal: {
    width: "90%",
    maxWidth: 400,
    borderRadius: 10,
    overflow: "hidden",
  },
  modalView: {
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#000",
    backgroundColor: "white",
  },
});
