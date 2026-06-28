import { HiArrowsUpDown } from 'react-icons/hi2';

export default function FilterBar({
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        alignItems: 'center',
      }}
    >
      {/* Status Filter */}
      <select
        className="select-field"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        style={{ width: 'auto', minWidth: '140px' }}
        id="status-filter"
      >
        <option value="all">All Status</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      {/* Priority Filter */}
      <select
        className="select-field"
        value={priorityFilter}
        onChange={(e) => setPriorityFilter(e.target.value)}
        style={{ width: 'auto', minWidth: '140px' }}
        id="priority-filter"
      >
        <option value="all">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      {/* Sort By */}
      <select
        className="select-field"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        style={{ width: 'auto', minWidth: '140px' }}
        id="sort-by"
      >
        <option value="createdAt">Date Created</option>
        <option value="dueDate">Due Date</option>
        <option value="priority">Priority</option>
        <option value="title">Title</option>
        <option value="status">Status</option>
      </select>

      {/* Sort Order Toggle */}
      <button
        className="btn btn-secondary"
        onClick={() => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
        style={{ padding: '10px 14px', gap: '6px' }}
        id="sort-order-toggle"
        title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
      >
        <HiArrowsUpDown size={16} />
        {sortOrder === 'asc' ? 'Asc' : 'Desc'}
      </button>
    </div>
  );
}
