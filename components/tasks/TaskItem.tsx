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
import { TaskItemProps } from "@/types/tasks";

//function for the swipe left to delete logic
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
        />
        <ThemedText style={styles.title}>{task.title}</ThemedText>
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
});
