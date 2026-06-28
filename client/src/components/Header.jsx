import { HiOutlineBolt, HiOutlineClock, HiOutlineCheckCircle, HiOutlineExclamationTriangle, HiOutlineArrowRightOnRectangle, HiOutlineSun, HiOutlineMoon } from 'react-icons/hi2';

export default function Header({ stats, user, onLogout, theme, toggleTheme }) {
  const statItems = [
    { label: 'Total', value: stats.total, icon: <HiOutlineBolt size={16} />, color: 'var(--accent-indigo)' },
    { label: 'Pending', value: stats.pending, icon: <HiOutlineClock size={16} />, color: 'var(--warning)' },
    { label: 'In Progress', value: stats.inProgress, icon: <HiOutlineBolt size={16} />, color: 'var(--info)' },
    { label: 'Completed', value: stats.completed, icon: <HiOutlineCheckCircle size={16} />, color: 'var(--success)' },
  ];

  return (
    <header style={{ paddingTop: '40px', paddingBottom: '32px' }}>
      <div className="container">
        {/* Title & User Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.2,
                marginBottom: '8px',
              }}
            >
              <span className="gradient-text">Task Tracker</span>
            </h1>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontWeight: 400 }}>
              Manage your tasks efficiently. Stay organized, stay productive.
            </p>
          </div>
          
          {user && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'rgba(255, 255, 255, 0.03)', padding: '8px 16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                Hi, <span style={{ fontWeight: 600 }}>{user.name.split(' ')[0]}</span> 👋
              </div>
              <button
                onClick={toggleTheme}
                title="Toggle Theme"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
              >
                {theme === 'dark' ? <HiOutlineSun size={18} /> : <HiOutlineMoon size={18} />}
              </button>

              <button 
                onClick={onLogout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(248, 113, 113, 0.1)',
                  color: 'var(--danger)',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(248, 113, 113, 0.2)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(248, 113, 113, 0.1)'}
              >
                <HiOutlineArrowRightOnRectangle size={14} />
                Log out
              </button>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '12px',
          }}
        >
          {statItems.map((item) => (
            <div
              key={item.label}
              className="glass-card"
              style={{
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: `${item.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: item.color,
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </div>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {item.value}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {item.label}
                </div>
              </div>
            </div>
          ))}

          {/* Overdue indicator */}
          {stats.overdue > 0 && (
            <div
              className="glass-card"
              style={{
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderColor: 'rgba(248, 113, 113, 0.3)',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(248, 113, 113, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--danger)',
                  flexShrink: 0,
                }}
              >
                <HiOutlineExclamationTriangle size={16} />
              </div>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--danger)' }}>
                  {stats.overdue}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--danger)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Overdue
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
