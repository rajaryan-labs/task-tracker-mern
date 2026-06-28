import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';

export default function EmptyState({ search, hasFilters }) {
  return (
    <div className="empty-state animate-fade-in">
      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'rgba(129, 140, 248, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
        <HiOutlineClipboardDocumentList size={36} color="var(--accent-indigo)" />
      </div>

      {search || hasFilters ? (
        <>
          <h3
            style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: '8px',
            }}
          >
            No tasks found
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', maxWidth: '320px' }}>
            {search
              ? `No tasks matching "${search}". Try a different search term.`
              : 'No tasks match your current filters. Try adjusting them.'}
          </p>
        </>
      ) : (
        <>
          <h3
            style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: '8px',
            }}
          >
            No tasks yet
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', maxWidth: '320px' }}>
            Create your first task to get started! Click the button above to add a new task.
          </p>
        </>
      )}
    </div>
  );
}
