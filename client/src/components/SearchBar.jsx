import { HiMagnifyingGlass, HiXMark } from 'react-icons/hi2';

export default function SearchBar({ search, setSearch }) {
  return (
    <div style={{ position: 'relative' }}>
      <HiMagnifyingGlass
        size={18}
        style={{
          position: 'absolute',
          left: '14px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--text-muted)',
          pointerEvents: 'none',
        }}
      />
      <input
        type="text"
        className="input-field"
        placeholder="Search tasks by title or description..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          paddingLeft: '40px',
          paddingRight: search ? '36px' : '14px',
        }}
        id="search-input"
      />
      {search && (
        <button
          onClick={() => setSearch('')}
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '2px',
            display: 'flex',
          }}
        >
          <HiXMark size={16} />
        </button>
      )}
    </div>
  );
}
