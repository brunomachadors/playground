import React from 'react';

interface CompletedTaskListProps {
  completedTasks: string[];
}

const CompletedTaskList: React.FC<CompletedTaskListProps> = ({
  completedTasks,
}) => {
  return (
    <div className="mt-16">
      <h2 className="text-xl font-bold mb-4 text-center">Complete Tasks</h2>
      <ul id="completedTaskList" className="space-y-2">
        {completedTasks.map((task, index) => (
          <li
            key={index}
            id={`completedTask-${index}`}
            className="bg-gray-600 p-3 rounded-md shadow-md text-center"
          >
            {task}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompletedTaskList;
