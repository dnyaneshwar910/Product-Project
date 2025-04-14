'use client';
import { useState } from 'react';

export default function RegisterPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [msg, setMsg] = useState('');

  const handleRegister = async () => {
    const res = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ action: 'register', ...form }),
    });

    const data = await res.json();
    if (res.ok) {
      setMsg('Registration successful. You can now log in.');
    } else {
      setMsg(data.error || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <input
          type="text"
          className="w-full mb-2 p-2 border rounded"
          placeholder="Username"
          value={form.username}
          onChange={e => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="email"
          className="w-full mb-2 p-2 border rounded"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          className="w-full mb-4 p-2 border rounded"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <button onClick={handleRegister} className="w-full bg-green-600 text-white p-2 rounded">
          Register
        </button>
        {msg && <p className="text-center mt-4 text-sm text-green-600">{msg}</p>}
      </div>
    </div>
  );
}
