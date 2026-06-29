import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { HiOutlineUser, HiOutlineEnvelope, HiOutlineLockClosed } from 'react-icons/hi2';

export default function AuthPage({ addToast, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const { login, register } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!isLogin && !formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setSubmitting(true);
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        addToast('Logged in successfully! 👋');
      } else {
        await register(formData.name, formData.email, formData.password);
        addToast('Registered successfully! 🎉');
      }
      // Modal will close automatically via the useEffect in App.jsx
    } catch (err) {
      addToast(err.message || 'Authentication failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '12px 4px' }}>
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '8px' }}>
          <span className="gradient-text">{isLogin ? 'Welcome Back' : 'Create Account'}</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          {isLogin
            ? 'Sign in to access your saved tasks from any device.'
            : 'Create an account to save your tasks to the cloud.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {!isLogin && (
          <div>
            <label className="form-label">Full Name</label>
            <div style={{ position: 'relative' }}>
              <HiOutlineUser size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                name="name"
                className="input-field"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                style={{ paddingLeft: '44px', borderColor: errors.name ? 'var(--danger)' : '' }}
              />
            </div>
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>
        )}

        <div>
          <label className="form-label">Email Address</label>
          <div style={{ position: 'relative' }}>
            <HiOutlineEnvelope size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="email"
              name="email"
              className="input-field"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              style={{ paddingLeft: '44px', borderColor: errors.email ? 'var(--danger)' : '' }}
            />
          </div>
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>

        <div>
          <label className="form-label">Password</label>
          <div style={{ position: 'relative' }}>
            <HiOutlineLockClosed size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="password"
              name="password"
              className="input-field"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              style={{ paddingLeft: '44px', borderColor: errors.password ? 'var(--danger)' : '' }}
            />
          </div>
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px', padding: '12px' }} disabled={submitting}>
          {submitting ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
        </button>
      </form>

      <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button 
          onClick={() => {
            setIsLogin(!isLogin);
            setErrors({});
            setFormData({ name: '', email: '', password: '' });
          }}
          style={{ 
            background: 'none', border: 'none', 
            color: 'var(--accent-indigo)', 
            fontWeight: 600, cursor: 'pointer' 
          }}
        >
          {isLogin ? 'Sign Up' : 'Log In'}
        </button>
      </div>

      {onClose && (
        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '0.85rem',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Continue as Guest
          </button>
        </div>
      )}
    </div>
  );
}
