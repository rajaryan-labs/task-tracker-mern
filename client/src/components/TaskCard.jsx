import {
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineCalendarDays,
  HiOutlineClock,
  HiArrowPath,
} from 'react-icons/hi2';

// Format date for display
const formatDate = (dateStr) => {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

// Check if a date is overdue
const isOverdue = (dateStr, status) => {
  if (!dateStr || status === 'completed') return false;
  return new Date(dateStr) < new Date(new Date().setHours(0, 0, 0, 0));
};

// Format relative time
const timeAgo = (dateStr) => {
  const seconds = Math.floor((new Date() - new Date(dateStr)) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return formatDate(dateStr);
};

const statusLabels = {
  pending: 'Pending',
  'in-progress': 'In Progress',
  completed: 'Completed',
};

export default function TaskCard({ task, onEdit, onDelete, onToggleStatus }) {
  const overdue = isOverdue(task.dueDate, task.status);

  return (
    <div
      className={`glass-card animate-fade-in ${overdue ? 'overdue-card' : ''}`}
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        opacity: task.status === 'completed' ? 0.7 : 1,
      }}
    >
      {/* Top Row: Priority dot + Title + Actions */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        {/* Priority Indicator */}
        <div
          className={`priority-dot ${task.priority}`}
          style={{ marginTop: '6px' }}
          title={`${task.priority} priority`}
        />

        {/* Title & Description */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
            style={{
              fontSize: '0.95rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: '4px',
              textDecoration: task.status === 'completed' ? 'line-through' : 'none',
              wordBreak: 'break-word',
            }}
          >
            {task.title}
          </h3>
          {task.description && (
            <p
              style={{
                fontSize: '0.82rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.5,
                wordBreak: 'break-word',
              }}
            >
              {task.description}
            </p>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
          <button
            className="btn-ghost"
            onClick={() => onToggleStatus(task)}
            title="Cycle status"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              transition: 'all var(--transition-fast)',
            }}
            onMouseOver={(e) => { e.currentTarget.style.color = 'var(--accent-indigo)'; e.currentTarget.style.background = 'rgba(129,140,248,0.1)'; }}
            onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'none'; }}
          >
            <HiArrowPath size={16} />
          </button>
          <button
            className="btn-ghost"
            onClick={() => onEdit(task)}
            title="Edit task"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              transition: 'all var(--transition-fast)',
            }}
            onMouseOver={(e) => { e.currentTarget.style.color = 'var(--accent-purple)'; e.currentTarget.style.background = 'rgba(167,139,250,0.1)'; }}
            onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'none'; }}
          >
            <HiOutlinePencilSquare size={16} />
          </button>
          <button
            className="btn-ghost"
            onClick={() => onDelete(task)}
            title="Delete task"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              transition: 'all var(--transition-fast)',
            }}
            onMouseOver={(e) => { e.currentTarget.style.color = 'var(--danger)'; e.currentTarget.style.background = 'rgba(248,113,113,0.1)'; }}
            onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'none'; }}
          >
            <HiOutlineTrash size={16} />
          </button>
        </div>
      </div>

      {/* Bottom Row: Badges & Meta */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          paddingLeft: '20px',
        }}
      >
        {/* Status Badge */}
        <span className={`badge badge-${task.status}`}>{statusLabels[task.status]}</span>

        {/* Priority Badge */}
        <span className={`badge badge-${task.priority}`}>{task.priority}</span>

        {/* Due Date */}
        {task.dueDate && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.72rem',
              color: overdue ? 'var(--danger)' : 'var(--text-muted)',
              fontWeight: overdue ? 600 : 400,
            }}
          >
            <HiOutlineCalendarDays size={13} />
            {overdue ? 'Overdue: ' : 'Due: '}
            {formatDate(task.dueDate)}
          </span>
        )}

        {/* Created time */}
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            marginLeft: 'auto',
          }}
        >
          <HiOutlineClock size={12} />
          {timeAgo(task.createdAt)}
        </span>
      </div>
    </div>
  );
}
