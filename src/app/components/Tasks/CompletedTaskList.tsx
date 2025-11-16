import React from 'react';
import type { TTask } from '@/app/tasks/page';

interface CompletedTaskListProps {
  completedTasks: TTask[];
}

const CompletedTaskList: React.FC<CompletedTaskListProps> = ({ completedTasks }) => {
  return (
    <div className="mt-16">
      <h2 className="text-xl font-bold mb-4 text-center">Completed Tasks</h2>

      <ul id="completedTaskList" className="space-y-2">
        {completedTasks.map((task) => (
          <li
            key={task.id}
            id={`completedTask-${task.id}`}
            data-testid={`completed-task-${task.id}`}
            className="bg-gray-600 p-3 rounded-md shadow-md flex items-center gap-2"
          >
            {/* ID à esquerda sem risco */}
            <span className="w-10 text-left font-mono text-sm text-gray-300">
              #{task.id}
            </span>

            {/* descrição riscada com test id */}
            <span
              className="flex-1 text-center line-through opacity-70"
              data-testid={`completed-task-text-${task.id}`}
            >
              {task.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompletedTaskList;
