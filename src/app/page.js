// src/app/page.js
'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/examples')
      .then(res => res.json())
      .then(setData);
  }, []);

  const handleAdd = async () => {
    const res = await fetch('/api/examples', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    const newItem = await res.json();
    setData(prev => [...prev, newItem]);
    setName('');
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Next.js App Router + MongoDB</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {data.map((item, idx) => (
          <li key={idx}>{item.name}</li>
        ))}
      </ul>
    </main>
  );
}
