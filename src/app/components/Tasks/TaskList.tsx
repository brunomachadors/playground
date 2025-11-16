import React from 'react';
import TaskItem from './TaskItem';
import { TEST_IDS } from '@/app/utils/constants';

interface TaskListProps {
  tasks: string[];
  completeTask: (index: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, completeTask }) => {
  return (
    <div className="mb-12" data-testid={TEST_IDS.list.todoListWrapper}>
      <h2
        className="text-xl font-bold mb-4 text-center"
        data-testid={TEST_IDS.list.todoListTitle}
      >
        To do list
      </h2>

      <ul
        id="taskList"
        data-testid={TEST_IDS.list.todoList}
        className="space-y-2 relative"
      >
        {tasks.map((task, index) => (
          <TaskItem
            key={index}
            task={task}
            index={index}
            completeTask={completeTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
