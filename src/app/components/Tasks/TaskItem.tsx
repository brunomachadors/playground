import React, { useState } from 'react';
import type { TTask } from '@/app/tasks/page';

interface TaskItemProps {
  task: TTask;
  priority: number;
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
      className={`
        bg-gray-700 p-3 rounded-md shadow-md
        ${isDragging ? 'opacity-60 ring-2 ring-gray-300' : ''}
      `}
      draggable
      onDragStart={() => onDragStart(task.id)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDrop(task.id)}
      onDragEnd={onDragEnd}
    >
      {/* ======= MOBILE ======= */}
      <div className="flex flex-col gap-2 sm:hidden">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center text-xs text-gray-200">
          <span className="font-mono">
            <span className="text-gray-400">ID:</span> #{task.id}
          </span>

          <span
            className="font-mono"
            data-testid={`todo-item-priority-${task.id}`}
          >
            <span className="text-gray-400">Priority:</span> {priority}
          </span>
        </div>

        {/* Caixa da descrição */}
        <div
          className={`border border-gray-500 rounded-md ${
            isEditing ? 'bg-gray-600' : 'bg-gray-700'
          }`}
        >
          {isEditing ? (
            <input
              data-testid={`todo-item-edit-input-${task.id}`}
              className="w-full bg-gray-800 rounded-md focus:outline-none text-center text-white"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
            />
          ) : (
            <span
              className="block text-center text-gray-100 break-words"
              data-testid={`todo-item-text-${task.id}`}
            >
              {task.text}
            </span>
          )}
        </div>

        {/* Ações */}
        <div className="flex justify-end gap-2">
          {isEditing ? (
            <>
              <button
                data-testid={`todo-item-save-button-${task.id}`}
                onClick={handleSave}
                className="bg-gray-100 text-gray-800 font-bold py-1 px-3 rounded-md hover:bg-gray-300 text-xs"
              >
                Save
              </button>
              <button
                data-testid={`todo-item-cancel-button-${task.id}`}
                onClick={handleCancel}
                className="bg-gray-500 text-white font-bold py-1 px-3 rounded-md hover:bg-gray-600 text-xs"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                data-testid={`todo-item-edit-button-${task.id}`}
                onClick={() => setIsEditing(true)}
                className="bg-gray-100 text-gray-800 font-bold py-1 px-3 rounded-md hover:bg-gray-300 text-xs"
              >
                Edit
              </button>
              <button
                data-testid={`todo-item-complete-button-${task.id}`}
                onClick={() => completeTask(task.id)}
                className="bg-gray-200 text-gray-800 font-bold py-1 px-3 rounded-md hover:bg-gray-400 text-xs"
              >
                Complete
              </button>
            </>
          )}
        </div>
      </div>

      {/* ======= DESKTOP ======= */}
      <div className="hidden sm:flex sm:items-center sm:gap-2">
        {/* ID */}
        <span className="font-mono text-sm text-gray-300 sm:w-10">
          #{task.id}
        </span>

        {/* Priority */}
        <span
          className="font-mono text-xs text-gray-200 sm:w-16 text-center"
          data-testid={`todo-item-priority-${task.id}`}
        >
          {priority}
        </span>

        <div className="sm:flex-1">
          <div
            className={`border border-gray-500 rounded-md${
              isEditing ? 'bg-gray-600' : 'bg-gray-700'
            }`}
          >
            {isEditing ? (
              <input
                data-testid={`todo-item-edit-input-${task.id}`}
                className="w-full bg-gray-800 rounded-md focus:outline-none text-center text-white"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
            ) : (
              <span
                className="block text-center text-gray-100 break-words"
                data-testid={`todo-item-text-${task.id}`}
              >
                {task.text}
              </span>
            )}
          </div>
        </div>

        {/* Ações */}
        <div className="flex gap-2 justify-end sm:w-32">
          {isEditing ? (
            <>
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
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </li>
  );
};

export default TaskItem;
