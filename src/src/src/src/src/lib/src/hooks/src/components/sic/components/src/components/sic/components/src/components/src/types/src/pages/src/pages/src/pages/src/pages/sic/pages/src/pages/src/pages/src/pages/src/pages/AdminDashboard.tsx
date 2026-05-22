import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Home, Calendar, UserCheck, CreditCard, Flag, Users, Plus, Search, Pencil, Trash2, Eye, X, Check, Menu, DollarSign, Upload } from 'lucide-react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

type AdminView = 'dashboard' | 'hostels' | 'bookings' | 'verifications' | 'payments' | 'reports' | 'staff';

const revenueData = [{ month: 'Jan', revenue: 850000 }, { month: 'Feb', revenue: 1200000 }, { month: 'Mar', revenue: 950000 }, { month: 'Apr', revenue: 1400000 }, { month: 'May', revenue: 1100000 }, { month: 'Jun', revenue: 1650000 }];
const bookingData = [{ day: 'Mon', bookings: 8 }, { day: 'Tue', bookings: 12 }, { day: 'Wed', bookings: 15 }, { day: 'Thu', bookings: 10 }, { day: 'Fri', bookings: 18 }, { day: 'Sat', bookings: 22 }, { day: 'Sun', bookings: 14 }];

const navItems: { key: AdminView; label: string; icon: typeof LayoutDashboard }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'hostels', label: 'Manage Hostels', icon: Home },
  { key: 'bookings', label: 'Bookings', icon: Calendar },
  { key: 'verifications', label: 'Verify Students', icon: UserCheck },
  { key: 'payments', label: 'Payments', icon: CreditCard },
  { key: 'reports', label: 'Reports', icon: Flag },
  { key: 'staff', label: 'Manage Staff', icon: Users },
];

export default function AdminDashboard() {
  const [view, setView] = useState<AdminView>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showHostelModal, setShowHostelModal] = useState(false);

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="min-h-screen flex" style={{ background: 'var(--bg-primary)' }}>
        <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-[260px] transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`} style={{ background: 'var(--text-primary)' }}>
          <div className="flex items-center justify-between p-6">
            <Link to="/" className="flex items-center gap-1"><span className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent-coral)' }}>We</span><span className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>House</span></Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/60"><X size={20} /></button>
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
            <h1 className="text-lg font-semibold capitalize" style={{ color: 'var(--text-primary)' }}>{view}</h1>
          </header>
          <main className="p-4 lg:p-8">
            {view === 'dashboard' && (
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[{ label: 'Total Hostels', value: '156', icon: Home, color: 'var(--accent-primary)' }, { label: 'Active Bookings', value: '89', icon: Calendar, color: 'var(--accent-secondary)' }, { label: 'Total Revenue', value: '₦12.4M', icon: DollarSign, color: 'var(--accent-tertiary)' }, { label: 'Pending Verifications', value: '23', icon: UserCheck, color: 'var(--accent-coral)' }].map(stat => (
                    <div key={stat.label} className="card-wehouse p-5" style={{ borderLeft: `4px solid ${stat.color}` }}><div className="flex items-center justify-between mb-2"><span className="text-xs" style={{ color: 'var(--text-muted)' }}>{stat.label}</span><stat.icon size={16} style={{ color: stat.color }} /></div><p className="text-2xl font-bold">{stat.value}</p></div>
                  ))}
                </div>
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="card-wehouse"><h3 className="text-sm font-semibold mb-4">Revenue (6 months)</h3><ResponsiveContainer width="100%" height={250}><AreaChart data={revenueData}><defs><linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#c44536" stopOpacity={0.1} /><stop offset="95%" stopColor="#c44536" stopOpacity={0} /></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#e8e2db" /><XAxis dataKey="month" tick={{ fontSize: 12, fill: '#a39e99' }} axisLine={false} tickLine={false} /><YAxis tick={{ fontSize: 12, fill: '#a39e99' }} axisLine={false} tickLine={false} /><Tooltip contentStyle={{ borderRadius: '12px', fontSize: '12px' }} /><Area type="monotone" dataKey="revenue" stroke="#c44536" strokeWidth={2} fill="url(#revGrad)" /></AreaChart></ResponsiveContainer></div>
                  <div className="card-wehouse"><h3 className="text-sm font-semibold mb-4">Booking Trends</h3><ResponsiveContainer width="100%" height={250}><BarChart data={bookingData}><CartesianGrid strokeDasharray="3 3" stroke="#e8e2db" /><XAxis dataKey="day" tick={{ fontSize: 12, fill: '#a39e99' }} axisLine={false} tickLine={false} /><YAxis tick={{ fontSize: 12, fill: '#a39e99' }} axisLine={false} tickLine={false} /><Tooltip contentStyle={{ borderRadius: '12px', fontSize: '12px' }} /><Bar dataKey="bookings" fill="#5a7d5a" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></div>
                </div>
              </div>
            )}
            {view === 'hostels' && (
              <div>
                <div className="flex items-center justify-between mb-6"><h2 className="text-xl font-semibold">Manage Hostels</h2><button onClick={() => setShowHostelModal(true)} className="btn-primary flex items-center gap-2 text-sm py-2 px-4"><Plus size={16} /> Add Hostel</button></div>
                <div className="card-wehouse">Hostel management table goes here. Add, edit, delete hostels with photo upload.</div>
              </div>
            )}
            {view !== 'dashboard' && view !== 'hostels' && <div className="card-wehouse p-8 text-center"><h2 className="text-xl font-semibold capitalize mb-2">{view}</h2><p style={{ color: 'var(--text-secondary)' }}>This section is ready for you to customize.</p></div>}
          </main>
        </div>

        {showHostelModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: 'var(--overlay)' }} onClick={() => setShowHostelModal(false)}>
            <div className="w-full max-w-[600px] max-h-[85vh] overflow-y-auto rounded-2xl p-6" style={{ background: 'var(--bg-card)' }} onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6"><h3 className="text-lg font-semibold">Add New Hostel</h3><button onClick={() => setShowHostelModal(false)} className="p-1.5"><X size={18} style={{ color: 'var(--text-muted)' }} /></button></div>
              <form className="space-y-4" onSubmit={e => { e.preventDefault(); setShowHostelModal(false); }}>
                <div><label className="block text-sm font-medium mb-1.5">Hostel Name</label><input type="text" placeholder="e.g. Green View Hostel" className="w-full h-11 px-4 rounded-lg border text-sm outline-none" style={{ borderColor: 'var(--border-medium)', background: 'var(--bg-elevated)' }} required /></div>
                <div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-medium mb-1.5">School</label><select className="w-full h-11 px-3 rounded-lg border text-sm outline-none" style={{ borderColor: 'var(--border-medium)', background: 'var(--bg-elevated)' }} required><option>University of Lagos</option><option>University of Ibadan</option><option>Covenant University</option></select></div><div><label className="block text-sm font-medium mb-1.5">Area</label><input type="text" placeholder="e.g. Akoka" className="w-full h-11 px-4 rounded-lg border text-sm outline-none" style={{ borderColor: 'var(--border-medium)', background: 'var(--bg-elevated)' }} required /></div></div>
                <div><label className="block text-sm font-medium mb-1.5">Address</label><textarea placeholder="Full address" className="w-full px-4 py-2 rounded-lg border text-sm outline-none resize-none" style={{ borderColor: 'var(--border-medium)', background: 'var(--bg-elevated)' }} rows={2} required /></div>
                <div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-medium mb-1.5">Price per Year (₦)</label><input type="number" placeholder="150000" className="w-full h-11 px-4 rounded-lg border text-sm outline-none" style={{ borderColor: 'var(--border-medium)', background: 'var(--bg-elevated)' }} required /></div><div><label className="block text-sm font-medium mb-1.5">Agent Fee (₦)</label><input type="number" placeholder="15000" className="w-full h-11 px-4 rounded-lg border text-sm outline-none" style={{ borderColor: 'var(--border-medium)', background: 'var(--bg-elevated)' }} required /></div></div>
                <div><label className="block text-sm font-medium mb-1.5">Photos</label><div className="border-2 border-dashed rounded-xl p-8 text-center" style={{ borderColor: 'var(--border-medium)', background: 'var(--bg-elevated)' }}><Upload size={24} className="mx-auto mb-2" style={{ color: 'var(--text-muted)' }} /><p className="text-sm">Drag photos here or click to browse</p></div></div>
                <button type="submit" className="w-full btn-primary py-3">Add Hostel</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
