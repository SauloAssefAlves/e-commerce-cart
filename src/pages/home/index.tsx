import { BsCartPlus } from "react-icons/bs";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { api } from "../../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export interface ProductProps {
  id: string;
  title: string;
  description: string;
  cover: string;
  price: number;
}

export function Home() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const { addProductCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function getProducts() {
      const response = await api.get("/products");
      setProducts(response.data);
    }
    getProducts();
  }, []);

  function handleAddCartProduct(product: ProductProps) {
    toast.success("Product added to cart.", {
      style: {
        borderRadius: 10,
        backgroundColor: "#121212",
        color: "#FFF",
      },
    });
    addProductCart(product);
  }

  return (
    <div>
      <main className='w-full max-w-7xl px-4 mx-auto'>
        <h1 className='font-bold text-2xl mb-4 mt-10 text-center'>
          Trending products
        </h1>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5'>
          {products.map((product) => (
            <section key={product.id} className='w-full'>
              <img
                className='w-full rounded-lg max-h-70 mb-2'
                src={product.cover}
                alt={product.title}
                onClick={() => {
                  navigate(`/product/${product.id}`);
                }}
              />
              <p className='font-medium mt-1 mb-2'>{product.title}</p>
              <div className='flex gap-3 items-center'>
                <strong className='text-zinc-700/99'>
                  {product.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </strong>
                <button
                  className='bg-zinc-900 p-1 rounded'
                  onClick={() => handleAddCartProduct(product)}>
                  <BsCartPlus size={20} color='#FFF' />
                </button>
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
