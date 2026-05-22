import { Link } from 'react-router-dom';
import { ArrowRight, Search, Calendar, Key } from 'lucide-react';
import { StampWatermark } from '@/components/StampWatermark';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';

const steps = [
  { title: 'Search', description: 'Browse verified hostels near your university. Filter by price, amenities, and distance.', image: '/how-search.png' },
  { title: 'Book', description: 'Reserve your spot with our secure payment system. Choose your move-in date.', image: '/how-book.png' },
  { title: 'Move In', description: 'Get your keys and settle into your new home. We are here if you need anything.', image: '/how-movein.png' },
];

const universities = [
  { name: 'University of Lagos', location: 'Lagos', hostels: 24, image: '/uni-lagos.jpg' },
  { name: 'University of Ibadan', location: 'Ibadan', hostels: 18, image: '/uni-ibadan.jpg' },
  { name: 'Covenant University', location: 'Ota', hostels: 15, image: '/uni-covenant.jpg' },
  { name: 'University of Nigeria', location: 'Nsukka', hostels: 20, image: '/uni-nsukka.jpg' },
];

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <Layout>
      <section className="relative min-h-[85vh] flex items-center overflow-hidden px-4 lg:px-8" style={{ background: 'linear-gradient(135deg, #faf8f5 0%, #f0ebe5 100%)' }}>
        <StampWatermark className="top-20 left-10" />
        <StampWatermark className="bottom-20 right-20" />
        <div className="max-w-[1440px] mx-auto w-full grid lg:grid-cols-2 gap-12 items-center py-16">
          <div className="order-2 lg:order-1">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-6" style={{ background: 'var(--accent-blush)', color: 'var(--accent-coral)' }}>#1 Student Housing Platform</span>
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.1] mb-6" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>Find Your Perfect Student Home</h1>
            <p className="text-base lg:text-lg leading-relaxed mb-8 max-w-[480px]" style={{ color: 'var(--text-secondary)' }}>Verified hostels near your university. Safe, affordable, and ready for move-in.</p>
            <Link to={isAuthenticated ? '/hostels' : '/signup'} className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 text-base">Search Hostels <ArrowRight size={18} /></Link>
            <div className="flex items-center gap-3 mt-8">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => <img key={i} src={`/avatar-${i}.jpg`} alt="" className="w-8 h-8 rounded-full border-2 border-white object-cover" />)}
              </div>
              <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Trusted by 10,000+ students</span>
            </div>
          </div>
          <div className="order-1 lg:order-2 flex justify-center">
            <img src="/hero-students.png" alt="Students" className="max-w-full w-[500px] h-auto" />
          </div>
        </div>
      </section>

      <section className="py-20 px-4 lg:px-8" style={{ background: 'var(--bg-card)' }}>
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-semibold mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>How It Works</h2>
            <p className="text-base" style={{ color: 'var(--text-secondary)' }}>Three simple steps to your new home</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={step.title} className="card-wehouse text-center group hover:-translate-y-1">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4" style={{ background: 'var(--accent-primary)' }}>{index + 1}</div>
                <img src={step.image} alt={step.title} className="w-[120px] h-[120px] mx-auto mb-4 object-contain" />
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 lg:px-8" style={{ background: 'var(--bg-elevated)' }}>
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-semibold mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>Popular Universities</h2>
            <p className="text-base" style={{ color: 'var(--text-secondary)' }}>Find hostels near these top campuses</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {universities.map(uni => (
              <Link key={uni.name} to="/hostels" className="group block">
                <div className="card-wehouse p-0 overflow-hidden hover:-translate-y-1">
                  <div className="h-[200px] overflow-hidden">
                    <img src={uni.image} alt={uni.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{uni.name}</h3>
                    <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>{uni.location}</p>
                    <span className="text-xs font-medium" style={{ color: 'var(--accent-primary)' }}>{uni.hostels} hostels</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 lg:px-8 py-6">
        <div className="max-w-[1440px] mx-auto rounded-3xl py-16 px-8 text-center" style={{ background: 'linear-gradient(135deg, var(--accent-coral) 0%, var(--accent-primary) 100%)' }}>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>Ready to Find Your Home?</h2>
          <p className="text-base max-w-[500px] mx-auto mb-8" style={{ color: 'rgba(255,255,255,0.9)' }}>Join thousands of students who found their perfect hostel through WeHouse.</p>
          <Link to={isAuthenticated ? '/hostels' : '/signup'} className="inline-block px-8 py-3.5 rounded-xl font-semibold text-sm" style={{ background: 'white', color: 'var(--accent-primary)' }}>Get Started</Link>
        </div>
      </section>
    </Layout>
  );
}
