import { useState } from 'react';
import { CreditCard, Download, CheckCircle, Clock, AlertTriangle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { format } from 'date-fns';

interface Payment { id: string; date: string; description: string; amount: number; method: string; status: 'completed' | 'pending' | 'failed'; }

const mockPayments: Payment[] = [
  { id: '1', date: '2026-01-15', description: 'Installment 1 - Green View Hostel', amount: 56100, method: 'Paystack', status: 'completed' },
  { id: '2', date: '2026-04-15', description: 'Installment 2 - Green View Hostel', amount: 13200, method: 'Paystack', status: 'completed' },
  { id: '3', date: '2026-07-15', description: 'Installment 3 - Green View Hostel', amount: 13200, method: 'Paystack', status: 'pending' },
];

export default function Payments() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const totalPaid = mockPayments.filter(p => p.status === 'completed').reduce((s, p) => s + p.amount, 0);
  const outstanding = mockPayments.filter(p => p.status === 'pending').reduce((s, p) => s + p.amount, 0);
  const nextDue = mockPayments.find(p => p.status === 'pending');

  const handlePay = (e: React.FormEvent) => { e.preventDefault(); setPaymentSuccess(true); setTimeout(() => { setPaymentSuccess(false); setShowPaymentModal(false); }, 3000); };

  return (
    <Layout>
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8">
        <h1 className="text-2xl lg:text-4xl font-bold mb-8" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>Payments</h1>
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="card-wehouse"><p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Total Paid</p><p className="text-2xl font-bold" style={{ color: 'var(--accent-secondary)' }}>₦{totalPaid.toLocaleString()}</p><ArrowUpRight size={14} className="inline" style={{ color: 'var(--accent-secondary)' }} /></div>
          <div className="card-wehouse"><p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Outstanding Balance</p><p className="text-2xl font-bold" style={{ color: 'var(--accent-primary)' }}>₦{outstanding.toLocaleString()}</p><ArrowDownRight size={14} className="inline" style={{ color: 'var(--accent-primary)' }} /></div>
          <div className="card-wehouse"><p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Next Payment Due</p><p className="text-2xl font-bold" style={{ color: 'var(--accent-tertiary)' }}>{nextDue ? format(new Date(nextDue.date), 'MMM d, yyyy') : 'None'}</p></div>
        </div>

        <div className="card-wehouse">
          <div className="flex items-center justify-between mb-6"><h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Payment History</h2></div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr style={{ borderBottom: '1px solid var(--border-light)' }}>{['Date', 'Description', 'Amount', 'Method', 'Status'].map(h => <th key={h} className="text-left text-xs pb-3 pr-4" style={{ color: 'var(--text-muted)' }}>{h}</th>)}</tr></thead>
              <tbody>{mockPayments.map(p => (<tr key={p.id} style={{ borderBottom: '1px solid var(--border-light)' }}><td className="py-3 pr-4 text-sm">{format(new Date(p.date), 'MMM d, yyyy')}</td><td className="py-3 pr-4 text-sm">{p.description}</td><td className="py-3 pr-4 text-sm font-semibold">₦{p.amount.toLocaleString()}</td><td className="py-3 pr-4 text-sm">{p.method}</td><td className="py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${p.status === 'completed' ? 'status-available' : p.status === 'pending' ? 'status-booked' : 'status-pending'}`}>{p.status}</span></td></tr>))}</tbody>
            </table>
          </div>
        </div>

        <div className="mt-6"><button onClick={() => setShowPaymentModal(true)} className="btn-primary flex items-center gap-2"><CreditCard size={18} /> Make a Payment</button></div>
      </div>

      {showPaymentModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: 'var(--overlay)' }} onClick={() => setShowPaymentModal(false)}>
          <div className="w-full max-w-[500px] rounded-2xl p-8 animate-scale-in" style={{ background: 'var(--bg-card)' }} onClick={e => e.stopPropagation()}>
            {paymentSuccess ? <div className="text-center py-8"><div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#e8f5e9' }}><CheckCircle size={32} style={{ color: 'var(--accent-secondary)' }} /></div><h3 className="text-xl font-semibold mb-2">Payment Successful!</h3></div> : <><h3 className="text-xl font-semibold mb-1">Make Payment</h3><form onSubmit={handlePay} className="space-y-4 mt-4"><div><label className="block text-sm font-medium mb-1.5">Amount (₦)</label><input type="number" value={paymentAmount} onChange={e => setPaymentAmount(e.target.value)} placeholder="Enter amount" className="w-full h-12 px-4 rounded-xl border text-sm outline-none" style={{ borderColor: 'var(--border-medium)', background: 'var(--bg-elevated)' }} required /></div><button type="submit" className="w-full btn-primary py-3.5 text-base">Pay ₦{Number(paymentAmount || 0).toLocaleString()}</button></form></>}
          </div>
        </div>
      )}
    </Layout>
  );
}
