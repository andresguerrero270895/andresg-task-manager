// src/components/TaskList.tsx
import React, { useEffect, useState } from "react";
import { fetchTasks, updateTask, deleteTask, Task } from "../api/taskApi";
import TaskForm from "./TaskForm";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchTasks();
      setTasks(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const toggleComplete = async (task: Task) => {
    await updateTask(task.id!, { completed: !task.completed });
    load();
  };

  const remove = async (id?: number) => {
    if (!id) return;
    await deleteTask(id);
    load();
  };

  return (
    <div>
      <h2>Tasks</h2>
      <TaskForm onCreated={load} />
      {loading ? <p>Loading...</p> : null}
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            <input type="checkbox" checked={t.completed} onChange={() => toggleComplete(t)} />
            <strong>{t.title}</strong> - {t.description}
            <button onClick={() => remove(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
