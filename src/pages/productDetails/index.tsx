import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductProps } from "../home";
import { api } from "../../services/api";
import { BsCartPlus } from "react-icons/bs";
import toast from "react-hot-toast";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductProps>();
  const { addProductCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function getProducts() {
      const response = await api.get(`/products?id=${id}`);
      setProduct(response.data[0]);
      console.log("sas", response.data[0]);
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
    navigate("/cart");
  }

  return (
    <div className='w-full max-w-7xl px-4 py-6 mx-auto'>
      <section className='w-full flex flex-col md:flex-row'>
        <div className='w-full flex justify-center items-center '>
          <img
            className='w-full  max-h-60 max-w-60'
            src={product?.cover}
            alt={product?.title}
          />
        </div>
        <div className='w-full flex flex-col  items-start'>
          <h1 className='text-xl font-semibold pb-4'>{product?.title}</h1>
          <p className='pb-4'>{product?.description}</p>
          <div className='flex w-full gap-3'>
            <p className='font-semibold'>
              {product?.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
            <button
              className='bg-zinc-900 p-1 rounded'
              onClick={() => handleAddCartProduct(product as ProductProps)}>
              <BsCartPlus size={20} color='#FFF' />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
