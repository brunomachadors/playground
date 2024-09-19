import React from 'react';

interface TaskItemProps {
  task: string;
  index: number;
  completeTask: (index: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, index, completeTask }) => {
  return (
    <li
      key={index}
      id={`task-${index}`}
      className="bg-gray-700 p-3 rounded-md shadow-md relative"
    >
      <span className="flex-1 text-center block">{task}</span>
      <button
        id={`completeButton-${index}`}
        onClick={() => completeTask(index)}
        className="bg-gray-200 text-gray-800 font-bold py-1 px-2 rounded-md hover:bg-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2"
      >
        Completar
      </button>
    </li>
  );
};

export default TaskItem;
