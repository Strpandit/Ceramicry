import axios from 'axios';

const AgentApi = axios.create({
  // baseURL: "http://localhost:3000/api/agents/",
  baseURL: "https://ceramicry.onrender.com/api/agents/",
  headers: { 'Content-Type': 'application/json' },
});

AgentApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('agent_token');
  if (token) {
    config.headers['Token'] = `Bearer ${token}`;
  }
  return config;
});

export default AgentApi;



