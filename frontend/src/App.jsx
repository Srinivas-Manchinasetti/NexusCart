import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart
} from "./store/cartSlice";

function App() {
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();

  // Get cart items from the global Redux store
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate total number of items in the cart
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/products"
      );

      const data = await response.json();

      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  // Fetch products when the page loads
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Navbar */}
      <nav className="flex justify-between items-center mb-8 px-4">
        <h2 className="text-2xl font-bold text-blue-600">
          NexusCart
        </h2>

        <div className="text-lg font-semibold text-gray-700">
          🛒 Cart ({cartCount})
        </div>
      </nav>

      {/* Product Catalog */}
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

            <button
              onClick={() => dispatch(addToCart(product))}
              className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Shopping Cart */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Shopping Cart
        </h2>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">
            Your cart is empty.
          </p>
        ) : (
          <div className="max-w-3xl mx-auto space-y-4">

            {cartItems.map((item) => (
              <div
                key={item.product._id}
                className="bg-white rounded-xl shadow-md p-5 flex items-center justify-between"
              >

                {/* Product Information */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {item.product.name}
                  </h3>

                  <p className="text-green-600 font-bold mt-1">
                    ₹{item.product.price}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3">

                  <button
                    onClick={() =>
                      dispatch(
                        decrementQuantity(item.product._id)
                      )
                    }
                    className="bg-gray-200 px-3 py-1 rounded-lg font-bold hover:bg-gray-300"
                  >
                    -
                  </button>

                  <span className="font-semibold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      dispatch(
                        incrementQuantity(item.product._id)
                      )
                    }
                    className="bg-gray-200 px-3 py-1 rounded-lg font-bold hover:bg-gray-300"
                  >
                    +
                  </button>

                  <button
                    onClick={() =>
                      dispatch(
                        removeFromCart(item.product._id)
                      )
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                  >
                    Remove
                  </button>

                </div>
              </div>
            ))}

          </div>
        )}
      </div>

    </div>
  );
}

export default App;