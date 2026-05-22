import { Link } from 'react-router-dom';
import { Github, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer style={{ background: 'var(--text-primary)', color: 'var(--bg-card)' }}>
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-1 mb-4">
              <span className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent-coral)' }}>We</span>
              <span className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>House</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Find your perfect student home near campus. Verified hostels, secure payments, and a community you can trust.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['About Us', 'How It Works', 'FAQs', 'Contact'].map(item => (
                <li key={item}><Link to="#" className="text-sm transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.7)' }}>{item}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">For Students</h4>
            <ul className="space-y-2">
              {['Browse Hostels', 'Find Roommates', 'Student Verification', 'Safety Tips'].map(item => (
                <li key={item}><Link to="#" className="text-sm transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.7)' }}>{item}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">For Partners</h4>
            <ul className="space-y-2">
              {['List Your Hostel', 'Partner Portal', 'University Partnerships'].map(item => (
                <li key={item}><Link to="#" className="text-sm transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.7)' }}>{item}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>&copy; 2026 WeHouse. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {[Twitter, Instagram, Github, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.5)' }}><Icon size={18} /></a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
