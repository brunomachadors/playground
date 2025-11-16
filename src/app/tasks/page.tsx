'use client';

import React, { useState } from 'react';
import { InstructionsTasks } from '../components/Instructions/Instructions';
import TaskInput from '../components/Tasks/TaskInput';
import TaskList from '../components/Tasks/TaskList';
import CompletedTaskList from '../components/Tasks/CompletedTaskList';

export default function Task() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<string[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  const addTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task.trim() !== '') {
      setTasks([task, ...tasks]);
      setTask('');
    }
  };

  const completeTask = (index: number) => {
    const completedTask = tasks[index];
    setCompletedTasks([completedTask, ...completedTasks]);
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const editTask = (index: number, newText: string) => {
    setTasks((prev) =>
      prev.map((t, i) => (i === index ? newText : t))
    );
  };

  return (
    <div
      id="task"
      className="min-h-screen bg-gray-800 pt-2 px-4 sm:px-6 lg:px-8"
    >
      <InstructionsTasks />
      <div className="max-w-2xl mx-auto">
        <h1 id="taskTitle" className="text-2xl font-bold mb-6 text-center">
          To do list
        </h1>

        <TaskInput task={task} setTask={setTask} addTask={addTask} />

        {tasks.length > 0 && (
          <TaskList tasks={tasks} completeTask={completeTask} editTask={editTask} />
        )}
        {completedTasks.length > 0 && (
          <CompletedTaskList completedTasks={completedTasks} />
        )}
      </div>
    </div>
  );
}
