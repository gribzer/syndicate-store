import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Пример сохранения/загрузки из localStorage (если нужно):
  // useEffect(() => {
  //   const storedItems = localStorage.getItem("cart");
  //   if (storedItems) {
  //     setCartItems(JSON.parse(storedItems));
  //   }
  // }, []);
  //
  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(cartItems));
  // }, [cartItems]);

  const addToCart = (product) => {
    // Можно усложнить логику, если нужны параметры (количество, опции и т.п.)
    setCartItems((prev) => [...prev, product]);
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (item.price || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
