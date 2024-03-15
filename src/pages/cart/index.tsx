import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

export function Cart() {
  const { cart, total, removeProductCart, addProductCart } =
    useContext(CartContext);
  return (
    <div className='w-full max-w-7xl  mx-auto px-5 '>
      <h1 className='font-medium text-2xl text-center my-4'>Shopping cart</h1>

      {cart.length === 0 && (
        <div className='flex flex-col items-center justify-center '>
          <p className='font-medium'>Ops... Your cart is empty.</p>
          <Link
            to='/'
            className='bg-slate-600 my-3 text-white font-medium rounded px-3 p-1'>
            Acess products
          </Link>
        </div>
      )}
      {cart.map((product) => (
        <section
          key={product.id}
          className='flex items-center justify-between border-b-2 border-gray-300'>
          <img className='w-28' src={product.cover} alt={product.title} />
          <strong>
            Price:{" "}
            {product.price.toLocaleString("en-Us", {
              style: "currency",
              currency: "USD",
            })}
          </strong>
          <div className='flex items-center justify-center gap-3'>
            <button
              onClick={() => {
                removeProductCart(product);
              }}
              className='bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center'>
              -
            </button>
            {product.amount}
            <button
              onClick={() => {
                addProductCart(product);
              }}
              className='bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center'>
              +
            </button>
          </div>

          <strong className='float-right'>
            Subtotal:{" "}
            {product.total.toLocaleString("en-Us", {
              style: "currency",
              currency: "USD",
            })}
          </strong>
        </section>
      ))}

      {cart.length !== 0 && <p className='font-bold mt-4'>Total: {total}</p>}
    </div>
  );
}
