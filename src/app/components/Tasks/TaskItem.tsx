import React, { useState } from 'react';
import type { TTask } from '@/app/tasks/page';

interface TaskItemProps {
  task: TTask;
  completeTask: (id: number) => void;
  editTask: (id: number, newText: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, completeTask, editTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.text);

  const handleSave = () => {
    const trimmed = editValue.trim();
    if (!trimmed) return;
    editTask(task.id, trimmed);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(task.text);
    setIsEditing(false);
  };

  return (
    <li
      id={`task-${task.id}`}
      data-testid={`todo-item-${task.id}`}
      className="bg-gray-700 p-3 rounded-md shadow-md flex items-center gap-2"
    >
      {/* ID sempre à esquerda */}
      <span className="w-10 text-left font-mono text-sm text-gray-300">
        #{task.id}
      </span>

      {isEditing ? (
        <>
          <input
            data-testid={`todo-item-edit-input-${task.id}`}
            className="flex-1 bg-gray-600 border border-gray-500 rounded-md px-2 py-1 text-white text-center"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />

          <div className="flex gap-2">
            <button
              data-testid={`todo-item-save-button-${task.id}`}
              onClick={handleSave}
              className="bg-gray-100 text-gray-800 font-bold py-1 px-2 rounded-md hover:bg-gray-300"
            >
              Save
            </button>

            <button
              data-testid={`todo-item-cancel-button-${task.id}`}
              onClick={handleCancel}
              className="bg-gray-500 text-white font-bold py-1 px-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          {/* DESCRIÇÃO COM TEST ID EXCLUSIVO */}
          <span
            className="flex-1 text-center"
            data-testid={`todo-item-text-${task.id}`}
          >
            {task.text}
          </span>

          <div className="flex gap-2">
            <button
              data-testid={`todo-item-edit-button-${task.id}`}
              onClick={() => setIsEditing(true)}
              className="bg-gray-100 text-gray-800 font-bold py-1 px-2 rounded-md hover:bg-gray-300"
            >
              Edit
            </button>

            <button
              data-testid={`todo-item-complete-button-${task.id}`}
              onClick={() => completeTask(task.id)}
              className="bg-gray-200 text-gray-800 font-bold py-1 px-2 rounded-md hover:bg-gray-400"
            >
              Complete
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TaskItem;
