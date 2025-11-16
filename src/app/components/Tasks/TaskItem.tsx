import React, { useState } from 'react';
import type { TTask } from '@/app/tasks/page';

interface TaskItemProps {
  task: TTask;
  priority: number; // 👈 nova prop
  completeTask: (id: number) => void;
  editTask: (id: number, newText: string) => void;
  onDragStart: (id: number) => void;
  onDrop: (id: number) => void;
  onDragEnd: () => void;
  isDragging: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  priority,
  completeTask,
  editTask,
  onDragStart,
  onDrop,
  onDragEnd,
  isDragging,
}) => {
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
      className={`bg-gray-700 p-3 rounded-md shadow-md flex items-center gap-2 ${
        isDragging ? 'opacity-60 ring-2 ring-gray-300' : ''
      }`}
      draggable
      onDragStart={() => onDragStart(task.id)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDrop(task.id)}
      onDragEnd={onDragEnd}
    >
      {/* ID fixo à esquerda */}
      <span className="w-10 text-left font-mono text-sm text-gray-300">
        #{task.id}
      </span>

      {/* prioridade (posição) */}
      <span
        className="w-16 text-center font-mono text-xs text-gray-200"
        data-testid={`todo-item-priority-${task.id}`}
      >
        {priority}
      </span>

      {isEditing ? (
        <>
          <input
            data-testid={`todo-item-edit-input-${task.id}`}
            className="flex-1 bg-gray-600 border border-gray-500 rounded-md px-2 py-1 text-white text-center break-all overflow-hidden"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />

          <div className="flex gap-2 w-32 justify-end">
            <button
              data-testid={`todo-item-save-button-${task.id}`}
              onClick={handleSave}
              className="bg-gray-100 text-gray-800 font-bold py-1 px-2 rounded-md hover:bg-gray-300 text-xs"
            >
              Save
            </button>
            <button
              data-testid={`todo-item-cancel-button-${task.id}`}
              onClick={handleCancel}
              className="bg-gray-500 text-white font-bold py-1 px-2 rounded-md hover:bg-gray-600 text-xs"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          {/* descrição centralizada */}
          <span
            className="flex-1 text-center break-all overflow-hidden"
            data-testid={`todo-item-text-${task.id}`}
          >
            {task.text}
          </span>

          <div className="flex gap-2 w-32 justify-end">
            <button
              data-testid={`todo-item-edit-button-${task.id}`}
              onClick={() => setIsEditing(true)}
              className="bg-gray-100 text-gray-800 font-bold py-1 px-2 rounded-md hover:bg-gray-300 text-xs"
            >
              Edit
            </button>
            <button
              data-testid={`todo-item-complete-button-${task.id}`}
              onClick={() => completeTask(task.id)}
              className="bg-gray-200 text-gray-800 font-bold py-1 px-2 rounded-md hover:bg-gray-400 text-xs"
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
