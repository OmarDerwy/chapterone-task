import { ThemedView } from "@/components/ThemedView";
import { useTasks } from "@/hooks/useTasks";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";

export default function AddTaskModal() {
  const [title, setTitle] = useState("");
  const { addTask } = useTasks();
  const router = useRouter();

  const handleAddTask = () => {
    if (title.trim()) {
      addTask(title.trim());
      router.back();
    } else {
      router.back();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <BlurView intensity={30} style={StyleSheet.absoluteFill} />
      <Pressable style={styles.backdrop} onPress={() => router.back()}>
        <Pressable style={styles.modal} onPress={(e) => e.stopPropagation()}>
          <ThemedView style={styles.modalView}>
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
    paddingTop: 80,
  },
  modal: {
    width: "90%",
    maxWidth: 400,
    borderRadius: 10,
    overflow: "hidden",
  },
  modalView: {
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
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
