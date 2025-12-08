import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../components/Api';
import { DotIcon, ArrowLeft } from 'lucide-react';

const OrderTrack = () => {
  const { slug } = useParams();
  const orderId = slug;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const res = await api.get(`orders/${orderId}/track`, { headers: { Token: `Bearer ${token}` } });
        setData(res.data?.data);
      } finally {
        setLoading(false);
      }
    };
    if (orderId) fetchTrack();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-gray-700" />
      </div>
    );
  }

  if (!data?.order) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">No tracking data</div>
    );
  }

  const { order } = data;
  const milestones = Array.isArray(order?.milestones) ? order.milestones : [];

  const formatDateTime = (iso) => {
    if (!iso) return '-';
    const d = new Date(iso);
    return d.toLocaleString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to={`/orders/${order.id}`} className="p-2 hover:bg-gray-100 rounded">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="text-sm text-gray-600">Tracking</div>
              <div className="text-lg font-semibold">Order {order.order_number || order.id}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="relative">
            {milestones.map((m, idx) => (
              <div key={m.key} className="flex gap-4 pb-8 last:pb-0 relative">
                <div className="flex flex-col items-center">
                  <div className={`flex items-center justify-center ${m.reached ? 'text-green-500' : 'text-gray-300'}`}>
                    <DotIcon className="w-12 h-12" />
                  </div>
                  {idx < milestones.length - 1 && (
                    <div className={`w-0.5 h-full mt-2 ${m.reached ? 'bg-green-500' : 'bg-gray-300'}`} />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-900">{m.name}</h3>
                    <div className="text-sm text-gray-600">{formatDateTime(m.reached_at)}</div>
                  </div>
                  <p className="text-sm text-gray-600">{m.explanation}</p>
                  {m.notes && <p className="text-sm text-gray-500 mt-1">{m.notes}</p>}
                </div>
              </div>
            ))}
          </div>
          {/* Shiprocket Tracking Info */}
          {order.shiprocket && (
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex flex-wrap items-center gap-6 justify-between mb-1">
                <div>
                  <div className="font-semibold text-blue-900">Live Shipment Tracking</div>
                  <div className="text-sm text-gray-700 mt-0.5">Courier: <span className="font-medium">{order.shiprocket.courier_name || '-'}</span></div>
                  <div className="text-sm text-gray-700">AWB Code: <span className="font-mono text-gray-900">{order.shiprocket.awb_code}</span></div>
                </div>
                <a
                  href={order.shiprocket.tracking_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                >
                  Track Live
                </a>
              </div>
              <div className="text-sm text-gray-600 mt-2">
                <span className="font-medium">Last Shiprocket Status:</span> {order.shiprocket.last_status || '-'}
                {order.shiprocket.last_synced_at && (
                  <span className="ml-2">(Updated: {formatDateTime(order.shiprocket.last_synced_at)})</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderTrack;


