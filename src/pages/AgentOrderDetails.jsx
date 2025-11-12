import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AgentApi from '../components/AgentApi';

export default function AgentOrderDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [note, setNote] = useState('');
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    try {
      const { data } = await AgentApi.get(`/orders/${id}`);
      const payload = data?.data?.order || data?.data || data;
      setOrder(payload);
    } catch (err) {
      setError(err?.response?.data?.errors?.[0] || 'Failed to load order');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('agent_token');
    if (!token) {
      navigate('/agent/login');
      return;
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const updateStatus = async (status) => {
    try {
      setError('');
      await AgentApi.post(`/orders/${id}/update_status`, { status, notes: note });
      await load();
    } catch (err) {
      setError(err?.response?.data?.errors?.[0] || 'Failed to update status');
    }
  };

  const addLocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      return;
    }
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        setError('');
        await AgentApi.post(`/orders/${id}/add_location`, {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        });
        await load();
      } catch (err) {
        setError(err?.response?.data?.errors?.[0] || 'Failed to add location');
      }
    }, () => setError('Unable to get current location'));
  };

  const uploadProof = async (file) => {
    if (!file) return;
    const form = new FormData();
    form.append('proof', file);
    try {
      setUploading(true);
      await AgentApi.post(`/orders/${id}/upload_proof`, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      await load();
    } catch (err) {
      setError(err?.response?.data?.errors?.[0] || 'Failed to upload proof');
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="container mx-auto px-4 py-10">Loading...</div>;
  if (error) return <div className="container mx-auto px-4 py-10 text-red-600">{error}</div>;
  if (!order) return null;

  const items = order?.order_items || [];
  const lastLocation = (order?.order_locations && order.order_locations.length > 0)
    ? order.order_locations[order.order_locations.length - 1]
    : null;

  const status = order?.status;
  const canOutForDelivery = status === 'shipped';
  const canDelivered = status === 'shipped' || status === 'out_for_delivery';

  return (
    <div className="container mx-auto px-4 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Order {order.order_number || order.formatted_order_number || `#${order.id}`}</h1>
        <button className="text-sm underline hover:text-black/70" onClick={() => navigate('/agent/orders')}>Back</button>
      </div>
      <div className="border rounded p-4 shadow-sm">
        <div className="mb-2">Status: <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${status === 'delivered' ? 'bg-green-100 text-green-800' : status === 'out_for_delivery' ? 'bg-blue-100 text-blue-800' : status === 'shipped' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-800'}`}>{order.status}</span></div>
        <div className="mb-4 text-sm text-gray-600">Total Items: {order.total_items}</div>
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <input
            type="text"
            placeholder="Add note (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="border rounded px-3 py-2 flex-1"
          />
          <button
            onClick={() => updateStatus('out_for_delivery')}
            disabled={!canOutForDelivery}
            className={`px-3 py-2 rounded text-white ${canOutForDelivery ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'}`}
          >Out for delivery</button>
          <button
            onClick={() => updateStatus('delivered')}
            disabled={!canDelivered}
            className={`px-3 py-2 rounded text-white ${canDelivered ? 'bg-green-600 hover:bg-green-700' : 'bg-green-300 cursor-not-allowed'}`}
          >Mark delivered</button>
        </div>
        {(status === 'out_for_delivery') && (
          <div className="flex items-center gap-3 mb-3">
            <button onClick={addLocation} className="border px-3 py-2 rounded hover:bg-gray-50">Add current location</button>
            <label className="border px-3 py-2 rounded cursor-pointer hover:bg-gray-50">
              {uploading ? 'Uploading...' : 'Upload proof'}
              <input type="file" accept="image/*" className="hidden" onChange={(e) => uploadProof(e.target.files?.[0])} />
            </label>
          </div>
        )}
        {order?.order_locations && order.order_locations.length > 0 && (
          <div className="text-sm text-gray-600">Locations recorded: {order.order_locations.length}</div>
        )}
      </div>

      <div className="border rounded p-4 shadow-sm">
        <div className="font-medium mb-2">Items</div>
        <div className="space-y-2">
          {items.map((it) => (
            <div key={it.id} className="flex items-center justify-between text-sm">
              <div>{it.product_name || it.product?.name} x {it.quantity}</div>
              <div>₹{it.total_price}</div>
            </div>
          ))}
        </div>
      </div>

      {lastLocation && (
        <div className="border rounded p-4 shadow-sm">
          <div className="font-medium mb-2">Last Recorded Location</div>
          <div className="text-sm text-gray-600 mb-2">
            {lastLocation.latitude}, {lastLocation.longitude}
          </div>
          <div className="w-full h-64">
            <iframe
              title="map"
              className="w-full h-full rounded"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${Number(lastLocation.longitude)-0.01}%2C${Number(lastLocation.latitude)-0.01}%2C${Number(lastLocation.longitude)+0.01}%2C${Number(lastLocation.latitude)+0.01}&layer=mapnik&marker=${lastLocation.latitude}%2C${lastLocation.longitude}`}
            />
          </div>
          <a
            className="text-sm underline mt-2 inline-block"
            href={`https://www.openstreetmap.org/?mlat=${lastLocation.latitude}&mlon=${lastLocation.longitude}#map=16/${lastLocation.latitude}/${lastLocation.longitude}`}
            target="_blank" rel="noreferrer"
          >Open full map</a>
        </div>
      )}
    </div>
  );
}


