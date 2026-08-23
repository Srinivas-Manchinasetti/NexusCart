import { useState, useEffect } from "react";
function App() {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/v1/products");
    const data = await response.json();

    setProducts(data);
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
};
useEffect(() => {
  fetchProducts();
}, []);

  return (
  <div className="min-h-screen bg-gray-100 p-8">
    <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
      NexusCart Products
    </h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h2 className="text-xl font-semibold text-gray-800">
            {product.name}
          </h2>

          <p className="text-gray-600 mt-2">
            {product.description}
          </p>

          <p className="text-lg font-bold text-green-600 mt-4">
            ₹{product.price}
          </p>

          <p className="text-sm text-gray-500 mt-1">
            Category: {product.category}
          </p>

          <p className="text-sm text-gray-500">
            Stock: {product.stock}
          </p>
        </div>
      ))}
    </div>
  </div>
);
}

export default App;