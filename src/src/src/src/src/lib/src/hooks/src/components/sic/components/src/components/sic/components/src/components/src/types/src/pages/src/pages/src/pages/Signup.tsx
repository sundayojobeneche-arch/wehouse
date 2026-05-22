import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, GraduationCap, Briefcase, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function Signup() {
  const navigate = useNavigate();
  const { signup, isAuthenticated, role } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'student' | 'staff'>('student');
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
    if (password !== confirmPassword) { setError('Passwords do not match'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setLoading(true);
    const { error } = await signup(email, password, fullName, phone, selectedRole);
    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8" style={{ background: 'var(--bg-primary)' }}>
      <div className="w-full max-w-[420px]">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-1 mb-6">
            <span className="text-3xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent-primary)' }}>We</span>
            <span className="text-3xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>House</span>
          </Link>
          <h1 className="text-2xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Join WeHouse</h1>
        </div>

        <div className="card-wehouse">
          {error && <div className="mb-4 p-3 rounded-lg text-sm" style={{ background: '#fce4ec', color: '#c62828' }}>{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Full Name</label>
              <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="John Doe"
                className="w-full h-12 px-4 rounded-xl border text-sm outline-none" style={{ borderColor: 'var(--border-medium)', background: 'var(--bg-elevated)' }} required />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
                className="w-full h-12 px-4 rounded-xl border text-sm outline-none" style={{ borderColor: 'var(--border-medium)', background: 'var(--bg-elevated)' }} required />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Phone</label>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+234 800 000 0000"
                className="w-full h-12 px-4 rounded-xl border text-sm outline-none" style={{ borderColor: 'var(--border-medium)', background: 'var(--bg-elevated)' }} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Min 6 characters"
                  className="w-full h-12 px-4 pr-12 rounded-xl border text-sm outline-none" style={{ borderColor: 'var(--border-medium)', background: 'var(--bg-elevated)' }} required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Confirm Password</label>
              <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm your password"
                className="w-full h-12 px-4 rounded-xl border text-sm outline-none" style={{ borderColor: 'var(--border-medium)', background: 'var(--bg-elevated)' }} required />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>I am a...</label>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => setSelectedRole('student')}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all"
                  style={{ borderColor: selectedRole === 'student' ? 'var(--accent-primary)' : 'var(--border-medium)', background: selectedRole === 'student' ? 'var(--accent-blush)' : 'var(--bg-elevated)' }}>
                  <GraduationCap size={24} style={{ color: 'var(--accent-primary)' }} />
                  <span className="text-sm font-medium">Student</span>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Find and book hostels</span>
                </button>
                <button type="button" onClick={() => setSelectedRole('staff')}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all"
                  style={{ borderColor: selectedRole === 'staff' ? 'var(--accent-primary)' : 'var(--border-medium)', background: selectedRole === 'staff' ? 'var(--accent-blush)' : 'var(--bg-elevated)' }}>
                  <Briefcase size={24} style={{ color: 'var(--accent-primary)' }} />
                  <span className="text-sm font-medium">Staff</span>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Manage hostel listings</span>
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 disabled:opacity-60">
              {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><UserPlus size={18} /> Create Account</>}
            </button>
          </form>

          <p className="text-center text-sm mt-6" style={{ color: 'var(--text-secondary)' }}>
            Already have an account?{' '}<Link to="/login" className="font-medium" style={{ color: 'var(--accent-primary)' }}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
