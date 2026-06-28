import { useState, useEffect } from 'react';

export default function TaskForm({ onSubmit, onCancel, editTask }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Pre-fill form when editing
  useEffect(() => {
    if (editTask) {
      setFormData({
        title: editTask.title || '',
        description: editTask.description || '',
        status: editTask.status || 'pending',
        priority: editTask.priority || 'medium',
        dueDate: editTask.dueDate ? editTask.dueDate.split('T')[0] : '',
      });
    }
  }, [editTask]);

  // Validate form
  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length > 100) {
      newErrors.title = 'Title cannot exceed 100 characters';
    }
    if (formData.description.length > 500) {
      newErrors.description = 'Description cannot exceed 500 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    const taskData = {
      ...formData,
      dueDate: formData.dueDate || null,
    };
    const success = await onSubmit(taskData);
    setSubmitting(false);

    if (success) {
      setFormData({ title: '', description: '', status: 'pending', priority: 'medium', dueDate: '' });
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Title */}
      <div style={{ marginBottom: '16px' }}>
        <label className="form-label" htmlFor="task-title">
          Title <span style={{ color: 'var(--danger)' }}>*</span>
        </label>
        <input
          id="task-title"
          type="text"
          name="title"
          className="input-field"
          placeholder="Enter task title..."
          value={formData.title}
          onChange={handleChange}
          autoFocus
          style={errors.title ? { borderColor: 'var(--danger)' } : {}}
        />
        {errors.title && <p className="error-text">{errors.title}</p>}
        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px', textAlign: 'right' }}>
          {formData.title.length}/100
        </p>
      </div>

      {/* Description */}
      <div style={{ marginBottom: '16px' }}>
        <label className="form-label" htmlFor="task-description">
          Description
        </label>
        <textarea
          id="task-description"
          name="description"
          className="input-field"
          placeholder="Enter task description (optional)..."
          value={formData.description}
          onChange={handleChange}
          rows={3}
          style={errors.description ? { borderColor: 'var(--danger)' } : {}}
        />
        {errors.description && <p className="error-text">{errors.description}</p>}
        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px', textAlign: 'right' }}>
          {formData.description.length}/500
        </p>
      </div>

      {/* Status & Priority Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          marginBottom: '16px',
        }}
      >
        <div>
          <label className="form-label" htmlFor="task-status">
            Status
          </label>
          <select
            id="task-status"
            name="status"
            className="select-field"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="form-label" htmlFor="task-priority">
            Priority
          </label>
          <select
            id="task-priority"
            name="priority"
            className="select-field"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      {/* Due Date */}
      <div style={{ marginBottom: '24px' }}>
        <label className="form-label" htmlFor="task-due-date">
          Due Date
        </label>
        <input
          id="task-due-date"
          type="date"
          name="dueDate"
          className="input-field"
          value={formData.dueDate}
          onChange={handleChange}
        />
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
        <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={submitting}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Saving...' : editTask ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </form>
  );
}
