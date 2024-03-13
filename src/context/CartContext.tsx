import { ReactNode, createContext, useState } from "react";
import { ProductProps } from "../pages/home";

interface CartContextData {
  cart: CartProps[];
  cartAmount: number;
  addProductCart: (newProduct: ProductProps) => void;
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
      return;
    }

    let data = {
      ...newProduct,
      amount: 1,
      total: newProduct.price,
    };

    setCart((products) => [...products, data]);
  }
  return (
    <CartContext.Provider
      value={{ cart, cartAmount: cart.length, addProductCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
