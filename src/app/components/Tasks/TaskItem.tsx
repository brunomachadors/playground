import React, { useState, useEffect } from 'react';

interface TaskItemProps {
  task: string;
  index: number;
  completeTask: (index: number) => void;
  editTask: (index: number, newText: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  index,
  completeTask,
  editTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task);

  // Se o texto da task mudar de fora, atualiza o valor de edição
  useEffect(() => {
    setEditValue(task);
  }, [task]);

  const handleSave = () => {
    const trimmed = editValue.trim();
    if (trimmed !== '') {
      editTask(index, trimmed);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditValue(task);
    setIsEditing(false);
  };

  return (
    <li
      id={`task-${index}`}
      data-testid={`todo-item-${index}`}
      className="bg-gray-700 p-3 rounded-md shadow-md relative flex items-center gap-2"
    >
      {isEditing ? (
        <>
          <input
            data-testid={`todo-item-edit-input-${index}`}
            className="flex-1 bg-gray-600 border border-gray-500 rounded-md px-2 py-1 text-white"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />

          <button
            type="button"
            data-testid={`todo-item-save-button-${index}`}
            onClick={handleSave}
            className="bg-gray-100 text-gray-800 font-bold py-1 px-2 rounded-md hover:bg-gray-300"
          >
            Save
          </button>

          <button
            type="button"
            data-testid={`todo-item-cancel-button-${index}`}
            onClick={handleCancel}
            className="bg-gray-500 text-white font-bold py-1 px-2 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <span className="flex-1 text-center block">{task}</span>

          <button
            type="button"
            data-testid={`todo-item-edit-button-${index}`}
            onClick={() => setIsEditing(true)}
            className="bg-gray-100 text-gray-800 font-bold py-1 px-2 rounded-md hover:bg-gray-300 mr-2"
          >
            Edit
          </button>

          <button
            id={`completeButton-${index}`}
            data-testid={`todo-item-complete-button-${index}`}
            onClick={() => completeTask(index)}
            className="bg-gray-200 text-gray-800 font-bold py-1 px-2 rounded-md hover:bg-gray-400"
          >
            Complete
          </button>
        </>
      )}
    </li>
  );
};

export default TaskItem;
