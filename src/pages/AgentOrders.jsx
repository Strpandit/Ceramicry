import React, { useEffect, useState } from 'react';
import AgentApi from '../components/AgentApi';
import { Link, useNavigate } from 'react-router-dom';

export default function AgentOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('assigned');

  useEffect(() => {
    const token = localStorage.getItem('agent_token');
    if (!token) {
      navigate('/agent/login');
      return;
    }
    (async () => {
      try {
        const { data } = await AgentApi.get('/orders');
        const list = data?.data?.orders || data?.data || [];
        setOrders(Array.isArray(list) ? list : []);
      } catch (err) {
        setError(err?.response?.data?.errors?.[0] || 'Failed to load orders');
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  if (loading) return <div className="container mx-auto px-4 py-10">Loading...</div>;
  if (error) return <div className="container mx-auto px-4 py-10 text-red-600">{error}</div>;

  const filtered = orders.filter((o) => {
    if (filter === 'all') return true;
    if (filter === 'delivered') return o.status === 'delivered';
    // assigned: anything not delivered
    return o.status !== 'delivered';
  });

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Assigned Orders</h1>
        <button
          onClick={() => { localStorage.removeItem('agent_token'); navigate('/agent/login'); }}
          className="text-sm underline hover:text-black/70"
        >Logout</button>
      </div>
      <div className="mb-4">
        <label className="mr-2 text-sm">Filter:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border rounded px-2 py-1 text-sm hover:bg-gray-50">
          <option value="assigned">Assigned</option>
          <option value="delivered">Delivered</option>
          <option value="all">All</option>
        </select>
      </div>
      <div className="space-y-3">
        {filtered.length === 0 && <div>No orders.</div>}
        {filtered.map((o) => (
          <Link key={o.id} to={`/agent/orders/${o.id}`} className="block border rounded p-4 hover:bg-gray-50 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Order {o.order_number || o.formatted_order_number || `#${o.id}`}</div>
                <div className="text-sm text-gray-600">Status: {' '}
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${o.status === 'delivered' ? 'bg-green-100 text-green-800' : o.status === 'out_for_delivery' ? 'bg-blue-100 text-blue-800' : o.status === 'shipped' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-800'}`}>{o.status}</span>
                </div>
              </div>
              <div className="text-sm text-gray-500">{new Date(o.created_at).toLocaleString()}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}


