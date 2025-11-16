import React from 'react';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: string[];
  completeTask: (index: number) => void;
  editTask: (index: number, newText: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, completeTask, editTask }) => {
  return (
    <div className="mb-12">
      <h2 className="text-xl font-bold mb-4 text-center">To do list</h2>
      <ul id="taskList" className="space-y-2 relative">
        {tasks.map((task, index) => (
          <TaskItem
            key={index}
            task={task}
            index={index}
            completeTask={completeTask}
            editTask={editTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
