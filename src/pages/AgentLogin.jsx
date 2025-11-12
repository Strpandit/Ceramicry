import React, { useState } from 'react';
import AgentApi from '../components/AgentApi';
import { useNavigate } from 'react-router-dom';

export default function AgentLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await AgentApi.post('/login', { email, password });
      localStorage.setItem('agent_token', data.token);
      localStorage.setItem('agent_name', data.name || '');
      localStorage.setItem('agent_id', String(data.id));
      navigate('/agent/orders');
    } catch (err) {
      setError(err?.response?.data?.errors?.[0] || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-md">
      <h1 className="text-2xl font-semibold mb-6">Delivery Agent Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded w-full"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div className="flex justify-center mt-6">
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2"
        >
          Back
        </button>
      </div>
    </div>
  );
}





