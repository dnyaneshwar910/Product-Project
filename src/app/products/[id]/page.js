export default async function ProductsPage() {
    const res = await fetch('http://localhost:3000/api/products', { cache: 'no-store' });
    const products = await res.json();
  
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product._id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600">${product.price}</p>
              <p className="text-sm">{product.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  