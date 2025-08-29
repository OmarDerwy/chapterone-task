import { Task } from "@/types/tasks";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

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

interface TaskItemProps {
  task: Task;
  onDelete: (taskId: string) => void;
}

// A component for a single item in the to-do list.
export default function TaskItem({ task, onDelete }: TaskItemProps) {
  return (
    <GestureHandlerRootView>
      <ReanimatedSwipeable
        // containerStyle={styles.swipeable}
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderRightActions={(prog, drag) =>
          RightAction(prog, drag, onDelete, task.id)
        }
      >
        <ThemedView style={styles.container}>
          <ThemedText style={styles.title}>{task.title}</ThemedText>
          {/* <Button title="Delete" onPress={() => onDelete(task.id)} color="#ff5c5c" /> */}
        </ThemedView>
      </ReanimatedSwipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginVertical: 5,
  },
  title: {
    fontSize: 16,
  },
  rightAction: {
    width: 70,
    height: 50,
    textAlign: "center",
    textAlignVertical: "center",
    // transform: [{ translateY: 7 }],
  },
  separator: {
    width: "100%",
    borderTopWidth: 1,
  },
  swipeable: {
    // height: 50,
    // backgroundColor: 'papayawhip',
    alignItems: "center",
  },
  rightActionContainer: {
    backgroundColor: "red",
    flex: 1,
  },
});
