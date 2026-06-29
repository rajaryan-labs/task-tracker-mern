import { useState, useEffect, useCallback, useRef } from 'react';
import { taskAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const GUEST_STORAGE_KEY = 'guest_tasks';

// Helper: generate a simple unique ID for guest tasks
const generateId = () => `guest_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

// Helper: read guest tasks from localStorage
const loadGuestTasks = () => {
  try {
    const stored = localStorage.getItem(GUEST_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Helper: save guest tasks to localStorage
const saveGuestTasks = (tasks) => {
  localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(tasks));
};

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
  const isGuest = !user;

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

  // ---------- GUEST MODE: localStorage-based CRUD ----------

  const applyFiltersAndSort = useCallback((allTasks) => {
    let filtered = [...allTasks];

    // Search
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          (t.description && t.description.toLowerCase().includes(q))
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((t) => t.status === statusFilter);
    }

    // Priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter((t) => t.priority === priorityFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      let valA, valB;
      if (sortBy === 'dueDate') {
        valA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
        valB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
      } else if (sortBy === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        valA = priorityOrder[a.priority] || 0;
        valB = priorityOrder[b.priority] || 0;
      } else {
        valA = new Date(a.createdAt).getTime();
        valB = new Date(b.createdAt).getTime();
      }
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    });

    return filtered;
  }, [search, statusFilter, priorityFilter, sortBy, sortOrder]);

  // Fetch tasks – either from API or localStorage
  const fetchTasks = useCallback(async () => {
    if (isGuest) {
      // Guest mode: read from localStorage and apply local filters
      const allGuestTasks = loadGuestTasks();
      const filtered = applyFiltersAndSort(allGuestTasks);
      setTasks(filtered);
      setLoading(false);
      return;
    }

    // Authenticated mode: fetch from API
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
  }, [search, statusFilter, priorityFilter, sortBy, sortOrder, addToast, isGuest, applyFiltersAndSort]);

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
      if (isGuest) {
        const allGuestTasks = loadGuestTasks();
        const newTask = {
          ...taskData,
          _id: generateId(),
          status: taskData.status || 'pending',
          priority: taskData.priority || 'medium',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        allGuestTasks.push(newTask);
        saveGuestTasks(allGuestTasks);
        setTasks(applyFiltersAndSort(allGuestTasks));
        addToast('Task created! (Stored locally — sign in to save to cloud) ✨');
        return true;
      }

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
      if (isGuest) {
        const allGuestTasks = loadGuestTasks();
        const idx = allGuestTasks.findIndex((t) => t._id === id);
        if (idx !== -1) {
          allGuestTasks[idx] = {
            ...allGuestTasks[idx],
            ...taskData,
            updatedAt: new Date().toISOString(),
          };
          saveGuestTasks(allGuestTasks);
          setTasks(applyFiltersAndSort(allGuestTasks));
          addToast('Task updated! ✅');
        }
        return true;
      }

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
      if (isGuest) {
        let allGuestTasks = loadGuestTasks();
        allGuestTasks = allGuestTasks.filter((t) => t._id !== id);
        saveGuestTasks(allGuestTasks);
        setTasks(applyFiltersAndSort(allGuestTasks));
        addToast('Task deleted! 🗑️');
        return true;
      }

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

  // Task stats (computed from the *unfiltered* set for guest, *current* set for auth)
  const allTasks = isGuest ? loadGuestTasks() : tasks;
  const stats = {
    total: allTasks.length,
    pending: allTasks.filter((t) => t.status === 'pending').length,
    inProgress: allTasks.filter((t) => t.status === 'in-progress').length,
    completed: allTasks.filter((t) => t.status === 'completed').length,
    overdue: allTasks.filter(
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
    isGuest,
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
