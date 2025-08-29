/**
 * @interface Task
 * @description Defines the shape of a single task object.
 * @property {string} id - A unique identifier for the task.
 * @property {string} title - The title or description of the task.
 * @property {boolean} [isCompleted] - An optional flag indicating whether the task is completed.
 */
export interface Task {
  id: string;
  title: string;
  isCompleted?: boolean;
}

/**
 * @interface TaskListProps
 * @description Defines the props for the TaskList component.
 * @property {Task[]} tasks - An array of task objects to be rendered.
 * @property {(taskId: string) => void} onDelete - A function to handle the deletion of a task.
 * @property {(taskId: string) => void} onCheckboxToggle - A function to handle the toggling of a task's completion status.
 */
export interface TaskListProps {
  tasks: Task[];
  onDelete: (taskId: string) => void;
  onCheckboxToggle: (taskId: string) => void;
}

/**
 * @interface TaskItemProps
 * @description Defines the props for the TaskItem component.
 * @extends TaskListProps
 * @property {Task} task - The task object to be rendered.
 */
export interface TaskItemProps extends Omit<TaskListProps, 'tasks'> {
  task: Task;
}