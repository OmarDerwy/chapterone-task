// Defines the shape of a single Task object.
export interface Task {
  id: string;
  title: string;
  isCompleted?: boolean; // Optional property
}
export interface TaskListProps {
  tasks: Task[];
  onDelete: (taskId: string) => void;
  onCheckboxToggle: (taskId: string) => void;
}

export interface TaskItemProps {
  task: Task;
  onDelete: (taskId: string) => void;
  onCheckboxToggle: (taskId: string) => void;
}