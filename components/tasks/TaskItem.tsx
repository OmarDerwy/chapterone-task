import { Task } from "@/types/tasks";
import Checkbox from "expo-checkbox";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

/**
 * @function RightAction
 * @description A component that renders the right action (delete button) for the swipeable task item.
 * @param {SharedValue<number>} prog - The progress of the swipe gesture.
 * @param {SharedValue<number>} drag - The drag value of the swipe gesture.
 * @param {(taskId: string) => void} onDelete - A function to handle the deletion of a task.
 * @param {string} taskId - The ID of the task.
 * @returns {JSX.Element} - A JSX element that renders the delete button.
 */
function RightAction(
  prog: SharedValue<number>,
  drag: SharedValue<number>,
  onDelete: (taskId: string) => void,
  taskId: string
) {
  const styleAnimation = useAnimatedStyle(() => {
    console.log("showRightProgress:", prog.value);
    console.log("appliedTranslation:", drag.value);

    return {
      transform: [{ translateX: drag.value + 70 }],
    };
  });

  return (
    <Reanimated.View style={{ ...styleAnimation }}>
      <ThemedView style={styles.rightActionContainer}>
        <Pressable
          onPress={() => onDelete(taskId)}
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ThemedText style={styles.rightAction}>Delete</ThemedText>
        </Pressable>
      </ThemedView>
    </Reanimated.View>
  );
}

/**
 * @function TaskItem
 * @description A component for a single item in the to-do list.
 * @param {TaskItemProps} props - The props for the component.
 * @returns {JSX.Element} - A JSX element that renders a single task item.
 */
interface TaskItemProps {
  task: Task;
  onDelete: (taskId: string) => void;
  onCheckboxToggle: (taskId: string) => void;
}

// A component for a single item in the to-do list.
export default function TaskItem({
  task,
  onDelete,
  onCheckboxToggle,
}: TaskItemProps) {
  return (
    <ReanimatedSwipeable
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      renderRightActions={(prog, drag) =>
        RightAction(prog, drag, onDelete, task.id)
      }
    >
      <ThemedView style={styles.container}>
        <Checkbox // TODO increase area of pressability for better UX
          disabled={false}
          value={task.isCompleted}
          onValueChange={() => onCheckboxToggle(task.id)}
          style={styles.completed}
        />
        <ThemedText
          style={
            task.isCompleted
              ? { ...styles.title, ...styles.completed }
              : { ...styles.title }
          }
        >
          {task.title}
        </ThemedText>
      </ThemedView>
    </ReanimatedSwipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 15,
    marginVertical: 5,
  },
  title: {
    marginLeft: 20,
    fontSize: 16,
  },
  rightAction: {
    width: 70,
    height: 50,
    textAlign: "center",
    textAlignVertical: "center",
  },
  separator: {
    width: "100%",
    borderTopWidth: 1,
  },
  rightActionContainer: {
    backgroundColor: "red",
    flex: 1,
  },
  completed: {
    opacity: 0.5,
  },
});
