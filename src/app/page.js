'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({ name: '', price: '', category: '' });
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);

  // Fetch all products on load
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
  };

  // Create or Update Product
  const handleSubmit = async () => {
    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `/api/products/${editId}` : '/api/products';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const product = await res.json();

    if (editId) {
      setProducts(prev =>
        prev.map(p => (p._id === product._id ? product : p))
      );
    } else {
      setProducts(prev => [...prev, product]);
    }

    setForm({ name: '', price: '', category: '' });
    setEditId(null);
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
    });
    setEditId(product._id);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    });

    setProducts(prev => prev.filter(p => p._id !== id));
  };

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">🛒 Product Manager</h1>

      <div className="bg-white shadow p-6 rounded-md mb-8 max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {editId ? 'Edit Product' : 'Add New Product'}
        </h2>
        <input
          type="text"
          placeholder="Name"
          className="w-full mb-2 p-2 border rounded"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          className="w-full mb-2 p-2 border rounded"
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          className="w-full mb-4 p-2 border rounded"
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          {editId ? 'Update Product' : 'Add Product'}
        </button>
        {editId && (
          <button
            onClick={() => {
              setForm({ name: '', price: '', category: '' });
              setEditId(null);
            }}
            className="w-full mt-2 bg-gray-400 text-white p-2 rounded hover:bg-gray-500 transition"
          >
            Cancel
          </button>
        )}
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <li key={product._id} className="border p-4 rounded shadow relative">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-600">Price: ${product.price}</p>
            <p className="text-sm text-gray-500">Category: {product.category}</p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleEdit(product)}
                className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
