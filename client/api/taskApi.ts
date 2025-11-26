// src/api/tasksApi.ts
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";

export type Task = {
  id?: number;
  title: string;
  description?: string;
  completed: boolean;
  created_at?: string;
};

export const fetchTasks = async (): Promise<Task[]> => {
  const res = await axios.get<Task[]>(`${API_BASE}/tasks`);
  return res.data;
};

export const createTask = async (task: Partial<Task>): Promise<Task> => {
  const res = await axios.post<Task>(`${API_BASE}/tasks`, task);
  return res.data;
};

export const updateTask = async (id: number, task: Partial<Task>): Promise<Task> => {
  const res = await axios.put<Task>(`${API_BASE}/tasks/${id}`, task);
  return res.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE}/tasks/${id}`);
};
