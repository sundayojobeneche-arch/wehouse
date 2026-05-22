import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated, role } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    if (role === 'admin') navigate('/admin');
    else if (role === 'staff') navigate('/staff');
    else navigate('/');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await login(email, password);
    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg-primary)' }}>
      <div className="w-full max-w-[420px]">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-1 mb-6">
            <span className="text-3xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent-primary)' }}>We</span>
            <span className="text-3xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>House</span>
          </Link>
          <h1 className="text-2xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Welcome Back</h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Sign in to your account</p>
        </div>

        <div className="card-wehouse">
          {error && (
            <div className="mb-4 p-3 rounded-lg text-sm" style={{ background: '#fce4ec', color: '#c62828' }}>{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
                className="w-full h-12 px-4 rounded-xl border text-sm outline-none" style={{ borderColor: 'var(--border-medium)', background: 'var(--bg-elevated)' }} required />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password"
                  className="w-full h-12 px-4 pr-12 rounded-xl border text-sm outline-none" style={{ borderColor: 'var(--border-medium)', background: 'var(--bg-elevated)' }} required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 disabled:opacity-60">
              {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><LogIn size={18} /> Sign In</>}
            </button>
          </form>

          <p className="text-center text-sm mt-6" style={{ color: 'var(--text-secondary)' }}>
            Don't have an account?{' '}<Link to="/signup" className="font-medium" style={{ color: 'var(--accent-primary)' }}>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
