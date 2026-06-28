import { useEffect } from 'react';
import { HiCheckCircle, HiExclamationCircle, HiInformationCircle, HiXMark } from 'react-icons/hi2';

const iconMap = {
  success: <HiCheckCircle size={18} />,
  error: <HiExclamationCircle size={18} />,
  info: <HiInformationCircle size={18} />,
};

const colorMap = {
  success: { bg: 'rgba(52, 211, 153, 0.12)', border: 'rgba(52, 211, 153, 0.3)', text: '#34d399' },
  error: { bg: 'rgba(248, 113, 113, 0.12)', border: 'rgba(248, 113, 113, 0.3)', text: '#f87171' },
  info: { bg: 'rgba(96, 165, 250, 0.12)', border: 'rgba(96, 165, 250, 0.3)', text: '#60a5fa' },
};

function ToastItem({ toast, onRemove }) {
  const colors = colorMap[toast.type] || colorMap.info;

  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), 3500);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '12px 16px',
        background: colors.bg,
        border: `1px solid ${colors.border}`,
        borderRadius: 'var(--radius-md)',
        backdropFilter: 'blur(16px)',
        animation: 'toast-enter 300ms ease-out',
        minWidth: '280px',
        maxWidth: '400px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
      }}
    >
      <span style={{ color: colors.text, flexShrink: 0 }}>{iconMap[toast.type]}</span>
      <p style={{ flex: 1, fontSize: '0.85rem', color: '#f1f5f9', fontWeight: 500 }}>
        {toast.message}
      </p>
      <button
        onClick={() => onRemove(toast.id)}
        style={{
          background: 'none',
          border: 'none',
          color: '#64748b',
          cursor: 'pointer',
          padding: '2px',
          flexShrink: 0,
          display: 'flex',
        }}
      >
        <HiXMark size={16} />
      </button>
    </div>
  );
}

export default function Toast({ toasts, onRemove }) {
  if (!toasts.length) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}
