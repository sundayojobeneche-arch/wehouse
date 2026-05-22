import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, Heart, Wifi, Droplets, Shield, Car, Filter, X } from 'lucide-react';
import { Layout } from '@/components/Layout';

interface Hostel {
  id: string; name: string; school: string; area: string; price: number; agent_fee: number;
  gender: 'male' | 'female' | 'mixed'; room_type: string[]; facilities: string[];
  status: 'available' | 'booked' | 'unavailable'; rating: number; review_count: number; images: string[];
}

const mockHostels: Hostel[] = [
  { id: '1', name: 'Green View Hostel', school: 'University of Lagos', area: 'Akoka', price: 150000, agent_fee: 15000, gender: 'mixed', room_type: ['Self-contained', 'Single Room'], facilities: ['wifi', 'security', 'parking'], status: 'available', rating: 4.5, review_count: 12, images: ['/hostel-ext-1.jpg', '/hostel-room-1.jpg'] },
  { id: '2', name: 'Campus Heights', school: 'University of Ibadan', area: 'Bodija', price: 200000, agent_fee: 20000, gender: 'male', room_type: ['Single Room', 'Shared Room (2)'], facilities: ['wifi', 'security', 'study_area'], status: 'available', rating: 4.8, review_count: 24, images: ['/hostel-room-1.jpg', '/hostel-common.jpg'] },
  { id: '3', name: 'Scholar Suites', school: 'Covenant University', area: 'Ota', price: 300000, agent_fee: 30000, gender: 'female', room_type: ['Self-contained'], facilities: ['wifi', 'security', 'parking', 'kitchen'], status: 'available', rating: 4.2, review_count: 8, images: ['/hostel-ext-1.jpg', '/hostel-kitchen.jpg'] },
  { id: '4', name: 'Unity Residence', school: 'University of Nigeria', area: 'Nsukka', price: 120000, agent_fee: 12000, gender: 'mixed', room_type: ['Shared Room (2)', 'Shared Room (4)'], facilities: ['wifi', 'security'], status: 'available', rating: 4.0, review_count: 15, images: ['/hostel-common.jpg', '/hostel-room-1.jpg'] },
  { id: '5', name: 'Elite Student Lodge', school: 'University of Lagos', area: 'Yaba', price: 250000, agent_fee: 25000, gender: 'male', room_type: ['Self-contained', 'Single Room'], facilities: ['wifi', 'security', 'parking', 'kitchen', 'study_area'], status: 'available', rating: 4.7, review_count: 30, images: ['/hostel-room-1.jpg', '/hostel-ext-1.jpg'] },
  { id: '6', name: 'Peaceful Haven', school: 'University of Ibadan', area: 'Moniya', price: 100000, agent_fee: 10000, gender: 'female', room_type: ['Shared Room (3)'], facilities: ['wifi', 'security'], status: 'available', rating: 3.9, review_count: 6, images: ['/hostel-kitchen.jpg', '/hostel-common.jpg'] },
];

export default function HostelSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ school: '', minPrice: '', maxPrice: '', gender: '', roomType: '' });

  const filteredHostels = useMemo(() => mockHostels.filter(h => {
    const matchesSearch = !searchQuery || h.name.toLowerCase().includes(searchQuery.toLowerCase()) || h.school.toLowerCase().includes(searchQuery.toLowerCase()) || h.area.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSchool = !filters.school || h.school === filters.school;
    const matchesMinPrice = !filters.minPrice || h.price >= Number(filters.minPrice);
    const matchesMaxPrice = !filters.maxPrice || h.price <= Number(filters.maxPrice);
    const matchesGender = !filters.gender || h.gender === filters.gender;
    const matchesRoomType = !filters.roomType || h.room_type.includes(filters.roomType);
    return matchesSearch && matchesSchool && matchesMinPrice && matchesMaxPrice && matchesGender && matchesRoomType;
  }), [searchQuery, filters]);

  const activeFilterCount = Object.values(filters).filter(v => v !== '').length;

  return (
    <Layout>
      <div className="sticky top-[72px] z-40 px-4 lg:px-8 py-4 border-b" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-light)' }}>
        <div className="max-w-[1440px] mx-auto">
          <div className="flex gap-3">
            <div className="relative flex-1 max-w-[600px]">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search by university, area, or hostel name..."
                className="w-full h-12 pl-11 pr-4 rounded-xl border text-sm outline-none" style={{ borderColor: 'var(--border-medium)', background: 'var(--bg-elevated)' }} />
            </div>
            <button onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 h-12 rounded-xl border text-sm font-medium transition-all"
              style={{ borderColor: showFilters ? 'var(--accent-primary)' : 'var(--border-medium)', color: showFilters ? 'var(--accent-primary)' : 'var(--text-primary)', background: showFilters ? 'var(--accent-blush)' : 'var(--bg-card)' }}>
              <Filter size={16} /> Filters {activeFilterCount > 0 && <span className="w-5 h-5 rounded-full text-xs flex items-center justify-center text-white" style={{ background: 'var(--accent-primary)' }}>{activeFilterCount}</span>}
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 p-4 rounded-xl border animate-fade-in" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-light)' }}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
                <select value={filters.school} onChange={e => setFilters(f => ({ ...f, school: e.target.value }))}
                  className="h-10 px-3 rounded-lg border text-sm outline-none" style={{ borderColor: 'var(--border-medium)', background: 'var(--bg-card)' }}>
                  <option value="">All Universities</option>
                  <option>University of Lagos</option>
                  <option>University of Ibadan</option>
                  <option>Covenant University</option>
                  <option>University of Nigeria</option>
                </select>
                <input type="number" value={filters.minPrice} onChange={e => setFilters(f => ({ ...f, minPrice: e.target.value }))} placeholder="Min Price"
                  className="h-10 px-3 rounded-lg border text-sm outline-none" style={{ borderColor: 'var(--border-medium)', background: 'var(--bg-card)' }} />
                <input type="number" value={filters.maxPrice} onChange={e => setFilters(f => ({ ...f, maxPrice: e.target.value }))} placeholder="Max Price"
                  className="h-10 px-3 rounded-lg border text-sm outline-none" style={{ borderColor: 'var(--border-medium)', background: 'var(--bg-card)' }} />
                <select value={filters.gender} onChange={e => setFilters(f => ({ ...f, gender: e.target.value }))}
                  className="h-10 px-3 rounded-lg border text-sm outline-none" style={{ borderColor: 'var(--border-medium)', background: 'var(--bg-card)' }}>
                  <option value="">All Genders</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="mixed">Mixed</option>
                </select>
                <select value={filters.roomType} onChange={e => setFilters(f => ({ ...f, roomType: e.target.value }))}
                  className="h-10 px-3 rounded-lg border text-sm outline-none" style={{ borderColor: 'var(--border-medium)', background: 'var(--bg-card)' }}>
                  <option value="">All Room Types</option>
                  <option>Self-contained</option>
                  <option>Single Room</option>
                  <option>Shared Room (2)</option>
                  <option>Shared Room (3)</option>
                  <option>Shared Room (4)</option>
                </select>
              </div>
              {activeFilterCount > 0 && (
                <button onClick={() => setFilters({ school: '', minPrice: '', maxPrice: '', gender: '', roomType: '' })}
                  className="mt-3 flex items-center gap-1 text-xs font-medium" style={{ color: 'var(--accent-primary)' }}><X size={14} /> Clear all filters</button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="px-4 lg:px-8 py-6 max-w-[1440px] mx-auto">
        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>Showing {filteredHostels.length} hostel{filteredHostels.length !== 1 ? 's' : ''}</p>

        {filteredHostels.length === 0 ? (
          <div className="text-center py-20">
            <img src="/empty-state.png" alt="No results" className="w-[200px] mx-auto mb-6" />
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>No hostels found</h3>
            <button onClick={() => { setSearchQuery(''); setFilters({ school: '', minPrice: '', maxPrice: '', gender: '', roomType: '' }); }} className="btn-outline">Clear All Filters</button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHostels.map(hostel => (
              <div key={hostel.id} className="card-wehouse p-0 overflow-hidden group hover:-translate-y-1">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={hostel.images[0]} alt={hostel.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  <button className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.9)' }}><Heart size={16} style={{ color: 'var(--text-secondary)' }} /></button>
                  <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ background: 'var(--accent-primary)' }}>₦{hostel.price.toLocaleString()}/year</span>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-base truncate" style={{ color: 'var(--text-primary)' }}>{hostel.name}</h3>
                  <div className="flex items-center gap-1 mb-2"><MapPin size={14} style={{ color: 'var(--text-muted)' }} /><span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{hostel.school}</span></div>
                  <div className="flex items-center gap-2 mb-3">
                    {[1,2,3,4,5].map(s => <Star key={s} size={14} fill={s <= Math.floor(hostel.rating) ? 'var(--accent-tertiary)' : 'none'} style={{ color: s <= Math.floor(hostel.rating) ? 'var(--accent-tertiary)' : 'var(--border-medium)' }} />)}
                    <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>({hostel.rating}) · {hostel.review_count} reviews</span>
                  </div>
                  <span className="status-available">Available</span>
                  <Link to={`/hostels/${hostel.id}`} className="block w-full text-center py-2.5 rounded-xl border text-sm font-medium mt-3" style={{ borderColor: 'var(--accent-primary)', color: 'var(--accent-primary)' }}>View Details</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
