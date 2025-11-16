'use client';

import React, { useState } from 'react';
import { InstructionsTasks } from '../components/Instructions/Instructions';
import TaskInput from '../components/Tasks/TaskInput';
import TaskList from '../components/Tasks/TaskList';
import CompletedTaskList from '../components/Tasks/CompletedTaskList';

export interface TTask {
  id: number;
  text: string;
}

export default function Task() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<TTask[]>([]);
  const [completedTasks, setCompletedTasks] = useState<TTask[]>([]);
  const [nextId, setNextId] = useState(1); // ID sequencial

  const addTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = task.trim();
    if (trimmed !== '') {
      const newTask: TTask = {
        id: nextId,
        text: trimmed,
      };
      setTasks([newTask, ...tasks]);
      setNextId((prev) => prev + 1);
      setTask('');
    }
  };

  const completeTask = (id: number) => {
    const taskToComplete = tasks.find((t) => t.id === id);
    if (!taskToComplete) return;

    setCompletedTasks([taskToComplete, ...completedTasks]);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const editTask = (id: number, newText: string) => {
    const trimmed = newText.trim();
    if (!trimmed) return;
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: trimmed } : t)),
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
