import React from 'react';
import TaskItem from './TaskItem';
import type { TTask } from '@/app/tasks/page';

interface TaskListProps {
  tasks: TTask[];
  completeTask: (id: number) => void;
  editTask: (id: number, newText: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, completeTask, editTask }) => {
  return (
    <div className="mb-12">
      <h2 className="text-xl font-bold mb-4 text-center">To do list</h2>
      <ul id="taskList" className="space-y-2 relative">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            completeTask={completeTask}
            editTask={editTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
