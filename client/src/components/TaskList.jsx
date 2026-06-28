import TaskCard from './TaskCard';
import EmptyState from './EmptyState';

export default function TaskList({ tasks, loading, search, hasFilters, onEdit, onDelete, onToggleStatus }) {
  // Loading skeleton
  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="skeleton"
            style={{
              height: '110px',
              borderRadius: 'var(--radius-lg)',
            }}
          />
        ))}
      </div>
    );
  }

  // Empty state
  if (!tasks.length) {
    return <EmptyState search={search} hasFilters={hasFilters} />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {tasks.map((task, index) => (
        <div
          key={task._id}
          style={{
            animationDelay: `${index * 50}ms`,
            animationFillMode: 'backwards',
          }}
          className="animate-slide-up"
        >
          <TaskCard
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleStatus={onToggleStatus}
          />
        </div>
      ))}
    </div>
  );
}
