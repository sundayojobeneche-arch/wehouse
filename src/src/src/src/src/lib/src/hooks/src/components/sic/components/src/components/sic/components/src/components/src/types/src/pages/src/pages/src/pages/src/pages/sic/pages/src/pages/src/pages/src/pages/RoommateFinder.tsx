import { useState } from 'react';
import { Search, User, MessageCircle, Send, Image, Ban, Flag, ChevronLeft, Check } from 'lucide-react';
import { Layout } from '@/components/Layout';

interface RoommateProfile { id: string; name: string; avatar: string; school: string; area: string; budgetMin: number; budgetMax: number; compatibility: number; isVerified: boolean; tags: string[]; lifestyle: { noise: string; sleep: string; cooking: string; cleanliness: string }; about: string; }

const mockProfiles: RoommateProfile[] = [
  { id: '1', name: 'Chidi Okafor', avatar: '/avatar-1.jpg', school: 'University of Lagos', area: 'Akoka', budgetMin: 80000, budgetMax: 120000, compatibility: 85, isVerified: true, tags: ['Night Owl', 'Studious', 'Non-smoker'], lifestyle: { noise: 'Medium', sleep: 'Night Owl', cooking: 'Often', cleanliness: 'Very Clean' }, about: 'I am a 3rd year Computer Science student. Looking for a quiet roommate who respects study time.' },
  { id: '2', name: 'Amara Nwosu', avatar: '/avatar-2.jpg', school: 'University of Lagos', area: 'Yaba', budgetMin: 100000, budgetMax: 150000, compatibility: 72, isVerified: true, tags: ['Early Bird', 'Social', 'Cooking enthusiast'], lifestyle: { noise: 'Low', sleep: 'Early Bird', cooking: 'Often', cleanliness: 'Clean' }, about: 'Medical student in my 4th year. I love cooking and sharing meals.' },
  { id: '3', name: 'Tunde Bakare', avatar: '/avatar-3.jpg', school: 'University of Ibadan', area: 'Bodija', budgetMin: 60000, budgetMax: 100000, compatibility: 91, isVerified: true, tags: ['Flexible', 'Quiet', 'Gamer'], lifestyle: { noise: 'Low', sleep: 'Flexible', cooking: 'Sometimes', cleanliness: 'Clean' }, about: 'Engineering student. Pretty chill and flexible.' },
  { id: '4', name: 'Ngozi Eze', avatar: '/avatar-4.jpg', school: 'Covenant University', area: 'Ota', budgetMin: 150000, budgetMax: 200000, compatibility: 65, isVerified: true, tags: ['Social', 'Fitness', 'Clean freak'], lifestyle: { noise: 'Medium', sleep: 'Early Bird', cooking: 'Rarely', cleanliness: 'Very Clean' }, about: 'Business Administration student. I love fitness and keeping things organized.' },
];

export default function RoommateFinder() {
  const [view, setView] = useState<'list' | 'profile' | 'chat'>('list');
  const [selectedProfile, setSelectedProfile] = useState<RoommateProfile | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ id: string; content: string; sender: 'me' | 'them' }>>([]);
  const [requestSent, setRequestSent] = useState(false);

  const openProfile = (profile: RoommateProfile) => { setSelectedProfile(profile); setView('profile'); };
  const openChat = (profile: RoommateProfile) => { setSelectedProfile(profile); setView('chat'); setMessages([{ id: '1', content: 'Hey! Want to chat about rooming together?', sender: 'them' }, { id: '2', content: 'Hi! I would love to discuss this.', sender: 'me' }]); };
  const sendMessage = () => { if (!message.trim()) return; setMessages(prev => [...prev, { id: Date.now().toString(), content: message, sender: 'me' }]); setMessage(''); };

  if (view === 'profile' && selectedProfile) {
    return (
      <Layout>
        <div className="max-w-[500px] mx-auto px-4 py-8">
          <button onClick={() => setView('list')} className="flex items-center gap-1 text-sm mb-6" style={{ color: 'var(--text-secondary)' }}><ChevronLeft size={16} /> Back</button>
          <div className="card-wehouse text-center">
            <div className="relative inline-block mb-4">
              <img src={selectedProfile.avatar} alt={selectedProfile.name} className="w-24 h-24 rounded-full object-cover" />
              {selectedProfile.isVerified && <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'var(--accent-secondary)' }}><Check size={14} className="text-white" /></div>}
            </div>
            <h2 className="text-xl font-semibold">{selectedProfile.name}</h2>
            <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>{selectedProfile.school}</p>
            <div className="inline-flex px-3 py-1 rounded-full text-sm font-semibold mb-4" style={{ background: '#e8f5e9', color: 'var(--accent-secondary)' }}>{selectedProfile.compatibility}% Match</div>
            <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>{selectedProfile.about}</p>
            <div className="flex gap-3">
              <button onClick={() => { setRequestSent(true); setTimeout(() => setRequestSent(false), 3000); }} disabled={requestSent} className="flex-1 btn-primary py-3 disabled:opacity-60">{requestSent ? 'Request Sent!' : 'Send Roommate Request'}</button>
              <button onClick={() => openChat(selectedProfile)} className="btn-outline py-3 px-4"><MessageCircle size={18} /></button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (view === 'chat' && selectedProfile) {
    return (
      <Layout>
        <div className="max-w-[800px] mx-auto px-4 py-4 h-[calc(100vh-72px)] flex flex-col">
          <div className="flex items-center justify-between mb-4 pb-4" style={{ borderBottom: '1px solid var(--border-light)' }}>
            <div className="flex items-center gap-3">
              <button onClick={() => setView('list')} style={{ color: 'var(--text-secondary)' }}><ChevronLeft size={20} /></button>
              <img src={selectedProfile.avatar} alt={selectedProfile.name} className="w-10 h-10 rounded-full object-cover" />
              <div><p className="text-sm font-medium">{selectedProfile.name}</p></div>
            </div>
            <div className="flex gap-1"><button className="p-2" title="Block" style={{ color: 'var(--text-muted)' }}><Ban size={18} /></button><button className="p-2" title="Report" style={{ color: 'var(--text-muted)' }}><Flag size={18} /></button></div>
          </div>
          <div className="flex-1 overflow-y-auto space-y-3 py-4">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] px-4 py-2.5 text-sm ${msg.sender === 'me' ? 'rounded-2xl rounded-br-sm text-white' : 'rounded-2xl rounded-bl-sm'}`} style={{ background: msg.sender === 'me' ? 'var(--accent-primary)' : 'var(--bg-elevated)', color: msg.sender === 'me' ? 'white' : 'var(--text-primary)' }}>{msg.content}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 pt-4" style={{ borderTop: '1px solid var(--border-light)' }}>
            <button className="p-2" style={{ color: 'var(--text-muted)' }}><Image size={20} /></button>
            <input type="text" value={message} onChange={e => setMessage(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} placeholder="Type a message..." className="flex-1 h-11 px-4 rounded-full border text-sm outline-none" style={{ borderColor: 'var(--border-medium)', background: 'var(--bg-elevated)' }} />
            <button onClick={sendMessage} className="w-11 h-11 rounded-full flex items-center justify-center text-white" style={{ background: 'var(--accent-primary)' }}><Send size={18} /></button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div><h1 className="text-2xl lg:text-4xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)' }}>Find a Roommate</h1><p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Connect with verified students</p></div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockProfiles.map(profile => (
            <div key={profile.id} className="card-wehouse text-center hover:-translate-y-1 cursor-pointer" onClick={() => openProfile(profile)}>
              <div className="relative inline-block mb-3">
                <img src={profile.avatar} alt={profile.name} className="w-16 h-16 rounded-full object-cover" style={{ border: profile.isVerified ? '3px solid var(--accent-tertiary)' : '3px solid var(--border-light)' }} />
                {profile.isVerified && <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'var(--accent-secondary)' }}><Check size={12} className="text-white" /></div>}
              </div>
              <h3 className="font-semibold text-sm">{profile.name}</h3>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{profile.school}</p>
              <p className="text-xs font-semibold my-1" style={{ color: 'var(--accent-secondary)' }}>{profile.compatibility}% match</p>
              <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>₦{profile.budgetMin.toLocaleString()} - ₦{profile.budgetMax.toLocaleString()}/yr</p>
              <div className="flex flex-wrap justify-center gap-1">{profile.tags.slice(0, 3).map(tag => <span key={tag} className="px-2 py-0.5 rounded-full text-[10px]" style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)' }}>{tag}</span>)}</div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
