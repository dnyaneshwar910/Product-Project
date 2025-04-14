'use client';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleLogin = async () => {
    const res = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ action: 'login', email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token); // Store JWT
      setMsg('Login successful! Redirecting...');
    } else {
      setMsg(data.error || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <input
          type="email"
          className="w-full mb-2 p-2 border rounded"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full mb-4 p-2 border rounded"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className="w-full bg-blue-600 text-white p-2 rounded">
          Login
        </button>
        {msg && <p className="text-center mt-4 text-sm text-red-600">{msg}</p>}
      </div>
    </div>
  );
}
