import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, Share2, Heart, Wifi, Droplets, Shield, Car, BookOpen, CookingPot, Check, X, ChevronLeft } from 'lucide-react';
import { Layout } from '@/components/Layout';

const hostelData: Record<string, { id: string; name: string; school: string; area: string; address: string; price: number; agent_fee: number; gender: string; room_type: string[]; water: boolean; electricity: boolean; description: string; facilities: string[]; rating: number; review_count: number; images: string[]; distance: string }> = {
  '1': { id: '1', name: 'Green View Hostel', school: 'University of Lagos', area: 'Akoka', address: '15 Akoka Road, Yaba, Lagos', price: 150000, agent_fee: 15000, gender: 'Mixed', room_type: ['Self-contained', 'Single Room'], water: true, electricity: true, description: 'Green View Hostel offers a serene and conducive environment for students. Located just 2.5km from the University of Lagos, it provides easy access to campus while maintaining a peaceful atmosphere for studying.', facilities: ['wifi', 'security', 'parking', 'water', 'kitchen', 'study_area'], rating: 4.5, review_count: 12, images: ['/hostel-ext-1.jpg', '/hostel-room-1.jpg', '/hostel-common.jpg', '/hostel-kitchen.jpg'], distance: '2.5km' },
  '2': { id: '2', name: 'Campus Heights', school: 'University of Ibadan', area: 'Bodija', address: '32 Bodija Estate, Ibadan', price: 200000, agent_fee: 20000, gender: 'Male', room_type: ['Single Room', 'Shared Room (2)'], water: true, electricity: true, description: 'Campus Heights is a premium male hostel located in the serene Bodija estate.', facilities: ['wifi', 'security', 'study_area', 'water'], rating: 4.8, review_count: 24, images: ['/hostel-room-1.jpg', '/hostel-common.jpg', '/hostel-ext-1.jpg'], distance: '3.0km' },
  '3': { id: '3', name: 'Scholar Suites', school: 'Covenant University', area: 'Ota', address: '10 Canaanland Avenue, Ota', price: 300000, agent_fee: 30000, gender: 'Female', room_type: ['Self-contained'], water: true, electricity: true, description: 'Scholar Suites offers luxury self-contained rooms exclusively for female students.', facilities: ['wifi', 'security', 'parking', 'kitchen', 'water'], rating: 4.2, review_count: 8, images: ['/hostel-ext-1.jpg', '/hostel-kitchen.jpg', '/hostel-room-1.jpg'], distance: '1.5km' },
};

const facilityMap: Record<string, { label: string }> = { wifi: { label: 'WiFi' }, security: { label: 'Security' }, parking: { label: 'Parking' }, water: { label: 'Running Water' }, kitchen: { label: 'Kitchen Access' }, study_area: { label: 'Study Area' } };
const rules = [{ label: 'No smoking', allowed: false }, { label: 'No pets', allowed: false }, { label: 'Quiet hours 10pm-6am', allowed: true }, { label: 'Visitors allowed until 8pm', allowed: true }, { label: 'No loud music', allowed: false }];
const reviews = [{ name: 'Chidi Okafor', avatar: '/avatar-1.jpg', date: 'Jan 2026', rating: 5, comment: 'Great hostel! Very clean and the security is top notch.' }, { name: 'Amara Nwosu', avatar: '/avatar-2.jpg', date: 'Dec 2025', rating: 4, comment: 'Nice place, close to campus. The kitchen could be bigger but overall good.' }, { name: 'Tunde Bakare', avatar: '/avatar-3.jpg', date: 'Nov 2025', rating: 5, comment: 'Best hostel I have stayed in. The study area is perfect.' }];

export default function HostelDetails() {
  const { id } = useParams<{ id: string }>();
  const hostel = hostelData[id || ''];
  const [selectedImage, setSelectedImage] = useState(0);
  const [moveInDate, setMoveInDate] = useState('');
  const [duration, setDuration] = useState('1');
  const [paymentPlan, setPaymentPlan] = useState('full');

  if (!hostel) {
    return <Layout><div className="max-w-[1440px] mx-auto px-4 py-20 text-center"><h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Hostel not found</h2><Link to="/hostels" className="btn-primary">Back to Hostels</Link></div></Layout>;
  }

  const totalAmount = hostel.price + hostel.agent_fee;

  return (
    <Layout>
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-6">
        <Link to="/hostels" className="inline-flex items-center gap-2 text-sm mb-6 hover:underline" style={{ color: 'var(--text-secondary)' }}><ChevronLeft size={16} /> Back to hostels</Link>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-6 rounded-2xl overflow-hidden">
          <div className="md:col-span-2 md:row-span-2 relative aspect-[4/3] md:aspect-auto">
            <img src={hostel.images[selectedImage]} alt={hostel.name} className="w-full h-full object-cover" />
          </div>
          {hostel.images.slice(1, 3).map((img, i) => (
            <div key={i} className="relative aspect-[4/3] cursor-pointer" onClick={() => setSelectedImage(i + 1)}><img src={img} alt="" className="w-full h-full object-cover" /></div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          <div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <h1 className="text-2xl lg:text-4xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{hostel.name}</h1>
                <div className="flex items-center gap-2 mt-2"><MapPin size={16} style={{ color: 'var(--text-muted)' }} /><span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{hostel.address}</span></div>
                <div className="flex items-center gap-2 mt-2">
                  {[1,2,3,4,5].map(s => <Star key={s} size={16} fill={s <= Math.floor(hostel.rating) ? 'var(--accent-tertiary)' : 'none'} style={{ color: s <= Math.floor(hostel.rating) ? 'var(--accent-tertiary)' : 'var(--border-medium)' }} />)}
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{hostel.rating} · {hostel.review_count} reviews</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full border flex items-center justify-center" style={{ borderColor: 'var(--border-light)' }}><Share2 size={18} style={{ color: 'var(--text-secondary)' }} /></button>
                <button className="w-10 h-10 rounded-full border flex items-center justify-center" style={{ borderColor: 'var(--border-light)' }}><Heart size={18} style={{ color: 'var(--text-secondary)' }} /></button>
              </div>
            </div>

            <div className="mt-8 pb-8" style={{ borderBottom: '1px solid var(--border-light)' }}>
              <h2 className="text-xl font-semibold mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>About This Hostel</h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{hostel.description}</p>
            </div>

            <div className="py-8" style={{ borderBottom: '1px solid var(--border-light)' }}>
              <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>What This Place Offers</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {hostel.facilities.map(f => (
                  <div key={f} className="flex items-center gap-3"><span style={{ color: 'var(--text-secondary)' }}>{f === 'wifi' ? <Wifi size={20} /> : f === 'security' ? <Shield size={20} /> : f === 'parking' ? <Car size={20} /> : f === 'water' ? <Droplets size={20} /> : f === 'kitchen' ? <CookingPot size={20} /> : <BookOpen size={20} />}</span><span className="text-sm" style={{ color: 'var(--text-primary)' }}>{facilityMap[f]?.label || f}</span></div>
                ))}
              </div>
            </div>

            <div className="py-8" style={{ borderBottom: '1px solid var(--border-light)' }}>
              <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>Hostel Rules</h2>
              <div className="space-y-2">
                {rules.map(rule => <div key={rule.label} className="flex items-center gap-3">{rule.allowed ? <Check size={18} style={{ color: 'var(--accent-secondary)' }} /> : <X size={18} style={{ color: 'var(--accent-primary)' }} />}<span className="text-sm" style={{ color: 'var(--text-primary)' }}>{rule.label}</span></div>)}
              </div>
            </div>

            <div className="py-8">
              <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>Reviews ({hostel.review_count})</h2>
              <div className="space-y-4">
                {reviews.map((review, i) => (
                  <div key={i} className="flex gap-3">
                    <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                    <div>
                      <div className="flex items-center gap-2"><span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{review.name}</span><span className="text-xs" style={{ color: 'var(--text-muted)' }}>{review.date}</span></div>
                      <div className="flex items-center gap-0.5 my-1">{[1,2,3,4,5].map(s => <Star key={s} size={12} fill={s <= review.rating ? 'var(--accent-tertiary)' : 'none'} style={{ color: s <= review.rating ? 'var(--accent-tertiary)' : 'var(--border-medium)' }} />)}</div>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{review.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-[100px] self-start">
            <div className="card-wehouse" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
              <div className="flex items-baseline gap-1 mb-1"><span className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>₦{hostel.price.toLocaleString()}</span><span className="text-sm" style={{ color: 'var(--text-secondary)' }}>/year</span></div>
              <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>+ ₦{hostel.agent_fee.toLocaleString()} agent fee</p>
              <div className="my-4" style={{ borderTop: '1px solid var(--border-light)' }} />

              <div className="space-y-4">
                <div><label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Move-in Date</label>
                  <input type="date" value={moveInDate} onChange={e => setMoveInDate(e.target.value)} className="w-full h-11 px-3 rounded-lg border text-sm outline-none" style={{ borderColor: 'var(--border-medium)', background: 'var(--bg-elevated)' }} /></div>
                <div><label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Duration</label>
                  <select value={duration} onChange={e => setDuration(e.target.value)} className="w-full h-11 px-3 rounded-lg border text-sm outline-none" style={{ borderColor: 'var(--border-medium)', background: 'var(--bg-elevated)' }}>
                    <option value="1">1 Year</option><option value="2">2 Years</option><option value="3">3 Years</option><option value="custom">Custom</option>
                  </select></div>

                {(duration === '2' || duration === '3' || duration === 'custom') && (
                  <div><label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>Payment Plan</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="plan" value="full" checked={paymentPlan === 'full'} onChange={e => setPaymentPlan(e.target.value)} /> <span className="text-sm">Full Payment</span></label>
                      <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="plan" value="installment" checked={paymentPlan === 'installment'} onChange={e => setPaymentPlan(e.target.value)} /> <span className="text-sm">Installments (68% upfront)</span></label>
                    </div></div>
                )}

                <div className="my-4" style={{ borderTop: '1px solid var(--border-light)' }} />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between" style={{ color: 'var(--text-secondary)' }}><span>Hostel fee</span><span>₦{hostel.price.toLocaleString()}</span></div>
                  <div className="flex justify-between" style={{ color: 'var(--text-secondary)' }}><span>Agent fee</span><span>₦{hostel.agent_fee.toLocaleString()}</span></div>
                  <div className="flex justify-between font-semibold pt-2" style={{ color: 'var(--text-primary)', borderTop: '1px solid var(--border-light)' }}><span>Total</span><span>₦{totalAmount.toLocaleString()}</span></div>
                </div>
                <button className="w-full btn-primary py-3.5 text-base font-semibold">Book Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
