import { ReactNode, createContext, useState } from "react";
import { ProductProps } from "../pages/home";

interface CartContextData {
  cart: CartProps[];
  cartAmount: number;
  addProductCart: (newProduct: ProductProps) => void;
  removeProductCart: (product: CartProps) => void;
  total: string;
}

interface CartProps {
  id: string;
  title: string;
  description: string;
  cover: string;
  price: number;
  amount: number;
  total: number;
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextData);

function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartProps[]>([]);
  const [total, setTotal] = useState("");

  function addProductCart(newProduct: ProductProps) {
    const indexProduct = cart.findIndex(
      (product) => product.id === newProduct.id
    );

    if (indexProduct != -1) {
      let cartList = cart;
      cartList[indexProduct].amount = cartList[indexProduct].amount + 1;
      cartList[indexProduct].total =
        cartList[indexProduct].amount * cartList[indexProduct].price;

      setCart(cartList);
      totalResultCart(cartList);
      return;
    }

    let data = {
      ...newProduct,
      amount: 1,
      total: newProduct.price,
    };

    setCart((products) => [...products, data]);
    totalResultCart([...cart, data]);
  }

  function removeProductCart(product: CartProps) {
    const indexProduct = cart.findIndex((item) => item.id === product.id);

    if (cart[indexProduct]?.amount > 1) {
      let cartList = cart;
      cartList[indexProduct].amount = cartList[indexProduct].amount - 1;
      cartList[indexProduct].total =
        cartList[indexProduct].total - cartList[indexProduct].price;

      setCart(cartList);
      totalResultCart(cartList);
      return;
    }

    const removeProduct = cart.filter((item) => item.id !== product.id);
    setCart(removeProduct);
    totalResultCart(removeProduct);
  }

  function totalResultCart(products: CartProps[]) {
    let myCart = products;
    let result = myCart.reduce((acc, obj) => {
      return acc + obj.total;
    }, 0);
    const resultFormat = result.toLocaleString("en-Us", {
      style: "currency",
      currency: "USD",
    });
    setTotal(resultFormat);
  }
  return (
    <CartContext.Provider
      value={{
        cart,
        cartAmount: cart.length,
        addProductCart,
        removeProductCart,
        total,
      }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
