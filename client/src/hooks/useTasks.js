import { useState, useEffect, useCallback, useRef } from 'react';
import { taskAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const useTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Filters & search state
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  const toastIdRef = useRef(0);

  // Add toast notification
  const addToast = useCallback((message, type = 'success') => {
    const id = ++toastIdRef.current;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  // Remove toast
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Fetch tasks
  const fetchTasks = useCallback(async () => {
    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const response = await taskAPI.getAll({
        search,
        status: statusFilter,
        priority: priorityFilter,
        sortBy,
        order: sortOrder,
      });
      setTasks(response.data);
    } catch (err) {
      setError(err.message);
      addToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, priorityFilter, sortBy, sortOrder, addToast, user]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTasks();
    }, search ? 400 : 0);
    return () => clearTimeout(timer);
  }, [fetchTasks, search, user]);

  // Create task
  const createTask = async (taskData) => {
    try {
      await taskAPI.create(taskData);
      await fetchTasks();
      addToast('Task created successfully! ✨');
      return true;
    } catch (err) {
      addToast(err.message, 'error');
      return false;
    }
  };

  // Update task
  const updateTask = async (id, taskData) => {
    try {
      await taskAPI.update(id, taskData);
      await fetchTasks();
      addToast('Task updated successfully! ✅');
      return true;
    } catch (err) {
      addToast(err.message, 'error');
      return false;
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await taskAPI.delete(id);
      await fetchTasks();
      addToast('Task deleted successfully! 🗑️');
      return true;
    } catch (err) {
      addToast(err.message, 'error');
      return false;
    }
  };

  // Toggle task status
  const toggleStatus = async (task) => {
    const statusCycle = {
      'pending': 'in-progress',
      'in-progress': 'completed',
      'completed': 'pending',
    };
    const newStatus = statusCycle[task.status];
    return updateTask(task._id, { ...task, status: newStatus });
  };

  // Task stats
  const stats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === 'pending').length,
    inProgress: tasks.filter((t) => t.status === 'in-progress').length,
    completed: tasks.filter((t) => t.status === 'completed').length,
    overdue: tasks.filter(
      (t) => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'completed'
    ).length,
  };

  return {
    tasks,
    loading,
    error,
    stats,
    toasts,
    removeToast,
    addToast,
    // CRUD
    createTask,
    updateTask,
    deleteTask,
    toggleStatus,
    fetchTasks,
    // Filters
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
  };
};

export default useTasks;
