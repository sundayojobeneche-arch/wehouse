import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Menu, X, Search, Calendar, CreditCard, User, LogOut, Settings, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export function Navbar() {
  const { user, role, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navLinks = [
    ...(role === 'student' ? [
      { label: 'Hostels', path: '/hostels', icon: Search },
      { label: 'Roommates', path: '/roommates', icon: User },
      { label: 'My Bookings', path: '/bookings', icon: Calendar },
      { label: 'Payments', path: '/payments', icon: CreditCard },
    ] : []),
    ...(role === 'admin' ? [
      { label: 'Dashboard', path: '/admin', icon: Shield },
    ] : []),
    ...(role === 'staff' ? [
      { label: 'Dashboard', path: '/staff', icon: Shield },
    ] : []),
  ];

  const isActive = (path: string) => location.pathname === path;
  if (!isAuthenticated && (location.pathname === '/login' || location.pathname === '/signup')) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 h-[72px] z-50 border-b" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-light)' }}>
      <div className="flex items-center justify-between h-full px-4 lg:px-8 max-w-[1440px] mx-auto">
        <Link to="/" className="flex items-center gap-1 shrink-0">
          <span className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent-primary)' }}>We</span>
          <span className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>House</span>
        </Link>

        {isAuthenticated && (
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link key={link.path} to={link.path}
                className="text-sm font-medium pb-1 transition-colors"
                style={{
                  color: isActive(link.path) ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  borderBottom: isActive(link.path) ? '2px solid var(--accent-primary)' : '2px solid transparent',
                }}>
                {link.label}
              </Link>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <button className="relative p-2 rounded-full hover:bg-black/5 transition-colors">
                <Bell size={20} style={{ color: 'var(--text-secondary)' }} />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: 'var(--accent-primary)' }} />
              </button>
              <div className="relative">
                <button onClick={() => setProfileOpen(!profileOpen)}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold text-white border-2"
                  style={{ background: 'var(--accent-primary)', borderColor: 'var(--border-light)' }}>
                  {user?.full_name?.charAt(0) || 'U'}
                </button>
                {profileOpen && (
                  <>
                    <div className="fixed inset-0" onClick={() => setProfileOpen(false)} />
                    <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg py-2 z-50 animate-scale-in"
                      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)' }}>
                      <div className="px-4 py-2 border-b" style={{ borderColor: 'var(--border-light)' }}>
                        <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{user?.full_name}</p>
                        <p className="text-xs capitalize" style={{ color: 'var(--text-muted)' }}>{role}</p>
                      </div>
                      <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-black/5" style={{ color: 'var(--text-secondary)' }}>
                        <User size={16} /> Profile
                      </Link>
                      <Link to="/settings" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-black/5" style={{ color: 'var(--text-secondary)' }}>
                        <Settings size={16} /> Settings
                      </Link>
                      <button onClick={logout} className="flex items-center gap-2 px-4 py-2 text-sm w-full text-left hover:bg-black/5"
                        style={{ color: 'var(--accent-primary)' }}>
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
              <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="hidden sm:inline-flex px-4 py-2 text-sm font-medium rounded-xl" style={{ color: 'var(--text-primary)' }}>Login</Link>
              <Link to="/signup" className="px-4 py-2 text-sm font-semibold rounded-xl text-white" style={{ background: 'var(--accent-primary)' }}>Sign Up</Link>
            </div>
          )}
        </div>
      </div>
      {mobileOpen && isAuthenticated && (
        <div className="md:hidden border-t" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-light)' }}>
          {navLinks.map(link => (
            <Link key={link.path} to={link.path} onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-6 py-3 text-sm font-medium"
              style={{ color: isActive(link.path) ? 'var(--accent-primary)' : 'var(--text-secondary)' }}>
              <link.icon size={18} /> {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
      }
