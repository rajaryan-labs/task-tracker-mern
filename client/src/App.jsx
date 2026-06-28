import { useState } from 'react';
import useTasks from './hooks/useTasks';
import { useAuth } from './context/AuthContext';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Modal from './components/Modal';
import ConfirmDialog from './components/ConfirmDialog';
import Toast from './components/Toast';
import AuthPage from './components/AuthPage';
import { HiPlus } from 'react-icons/hi2';

export default function App() {
  const { user, loading: authLoading, logout } = useAuth();
  const {
    tasks,
    loading: tasksLoading,
    stats,
    toasts,
    removeToast,
    addToast,
    createTask,
    updateTask,
    deleteTask,
    toggleStatus,
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
  } = useTasks();

  // Modal state
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);

  // Handle create
  const handleCreate = async (taskData) => {
    const success = await createTask(taskData);
    if (success) setShowForm(false);
    return success;
  };

  // Handle edit
  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  // Handle update
  const handleUpdate = async (taskData) => {
    const success = await updateTask(editingTask._id, taskData);
    if (success) {
      setShowForm(false);
      setEditingTask(null);
    }
    return success;
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    if (deletingTask) {
      await deleteTask(deletingTask._id);
      setDeletingTask(null);
    }
  };

  // Close form modal
  const closeForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const hasFilters = statusFilter !== 'all' || priorityFilter !== 'all';

  if (authLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="skeleton" style={{ width: '40px', height: '40px', borderRadius: '50%' }}></div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <Toast toasts={toasts} onRemove={removeToast} />
        <AuthPage addToast={addToast} />
      </>
    );
  }

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '60px' }}>
      {/* Toast Notifications */}
      <Toast toasts={toasts} onRemove={removeToast} />

      {/* Header with Stats */}
      <Header stats={stats} user={user} onLogout={logout} />

      {/* Main Content */}
      <main className="container">
        {/* Toolbar: Search + Add Button */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '16px',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ flex: 1, minWidth: '200px' }}>
            <SearchBar search={search} setSearch={setSearch} />
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              setEditingTask(null);
              setShowForm(true);
            }}
            id="add-task-btn"
          >
            <HiPlus size={18} />
            Add Task
          </button>
        </div>

        {/* Filters */}
        <div style={{ marginBottom: '24px' }}>
          <FilterBar
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
        </div>

        {/* Task List */}
        <TaskList
          tasks={tasks}
          loading={tasksLoading}
          search={search}
          hasFilters={hasFilters}
          onEdit={handleEdit}
          onDelete={(task) => setDeletingTask(task)}
          onToggleStatus={toggleStatus}
        />
      </main>

      {/* Create / Edit Modal */}
      <Modal
        isOpen={showForm}
        onClose={closeForm}
        title={editingTask ? 'Edit Task' : 'Create New Task'}
      >
        <TaskForm
          onSubmit={editingTask ? handleUpdate : handleCreate}
          onCancel={closeForm}
          editTask={editingTask}
        />
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deletingTask}
        onClose={() => setDeletingTask(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Task"
        message={`Are you sure you want to delete "${deletingTask?.title}"? This action cannot be undone.`}
      />

      {/* Footer */}
      <footer
        style={{
          textAlign: 'center',
          padding: '24px 20px',
          color: 'var(--text-muted)',
          fontSize: '0.75rem',
        }}
      >
        <p>
          Built with <span style={{ color: 'var(--danger)' }}>♥</span> using MERN Stack
        </p>
      </footer>
    </div>
  );
}
