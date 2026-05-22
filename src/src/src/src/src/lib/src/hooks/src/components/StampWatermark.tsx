export function StampWatermark({ className = '' }: { className?: string }) {
  return (
    <svg className={`stamp-watermark ${className}`} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="38" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
      {[...Array(12)].map((_, i) => (
        <line key={i} x1="40" y1="8" x2="40" y2="14" stroke="currentColor" strokeWidth="1" transform={`rotate(${i * 30} 40 40)`} />
      ))}
      <text x="40" y="46" textAnchor="middle" fontFamily="'Playfair Display', serif" fontSize="28" fontWeight="700" fill="currentColor">W</text>
    </svg>
  );
}
