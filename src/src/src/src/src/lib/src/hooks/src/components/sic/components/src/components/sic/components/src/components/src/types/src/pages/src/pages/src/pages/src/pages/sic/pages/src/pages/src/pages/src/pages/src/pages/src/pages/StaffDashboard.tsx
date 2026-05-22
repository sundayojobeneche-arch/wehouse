import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Home, Calendar, CreditCard, Flag, Menu, X, TrendingUp } from 'lucide-react';
import { ProtectedRoute } from '@/components/ProtectedRoute';

type StaffView = 'dashboard' | 'hostels' | 'bookings' | 'payments' | 'reports';

const navItems: { key: StaffView; label: string; icon: typeof LayoutDashboard }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'hostels', label: 'My Hostels', icon: Home },
  { key: 'bookings', label: 'Bookings', icon: Calendar },
  { key: 'payments', label: 'Payments', icon: CreditCard },
  { key: 'reports', label: 'Reports', icon: Flag },
];

export default function StaffDashboard() {
  const [view, setView] = useState<StaffView>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ProtectedRoute allowedRoles={['staff', 'admin']}>
      <div className="min-h-screen flex" style={{ background: 'var(--bg-primary)' }}>
        <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-[260px] transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`} style={{ background: 'var(--text-primary)' }}>
          <div className="flex items-center justify-between p-6">
            <Link to="/" className="flex items-center gap-1"><span className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent-coral)' }}>We</span><span className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>House</span></Link>
            <span className="text-[10px] px-2 py-0.5 rounded-full uppercase text-white/60" style={{ background: 'rgba(255,255,255,0.1)' }}>Staff</span>
          </div>
          <nav className="px-3 py-4">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <button key={item.key} onClick={() => { setView(item.key); setSidebarOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all mb-1"
                  style={{ color: view === item.key ? 'white' : 'rgba(255,255,255,0.6)', background: view === item.key ? 'rgba(255,255,255,0.1)' : 'transparent', borderLeft: view === item.key ? '3px solid var(--accent-primary)' : '3px solid transparent' }}>
                  <Icon size={18} />{item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

        <div className="flex-1 min-w-0">
          <header className="h-[72px] flex items-center gap-4 px-4 lg:px-8 border-b" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-light)' }}>
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2"><Menu size={20} /></button>
            <h1 className="text-lg font-semibold capitalize">{view}</h1>
          </header>
          <main className="p-4 lg:p-8">
            {view === 'dashboard' && (
              <div className="space-y-6">
                <div className="grid sm:grid-cols-3 gap-4">
                  {[{ label: 'My Hostels', value: '2', icon: Home, color: 'var(--accent-primary)' }, { label: 'Total Bookings', value: '20', icon: Calendar, color: 'var(--accent-secondary)' }, { label: 'Revenue', value: '₦4.18M', icon: TrendingUp, color: 'var(--accent-tertiary)' }].map(stat => (
                    <div key={stat.label} className="card-wehouse p-5"><div className="flex items-center justify-between mb-2"><span className="text-xs" style={{ color: 'var(--text-muted)' }}>{stat.label}</span><stat.icon size={16} style={{ color: stat.color }} /></div><p className="text-2xl font-bold">{stat.value}</p></div>
                  ))}
                </div>
              </div>
            )}
            {view !== 'dashboard' && <div className="card-wehouse p-8 text-center"><h2 className="text-xl font-semibold capitalize mb-2">{view}</h2><p style={{ color: 'var(--text-secondary)' }}>This section is ready for you to customize.</p></div>}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
                                                                                                                                                                                                                                                                                }
