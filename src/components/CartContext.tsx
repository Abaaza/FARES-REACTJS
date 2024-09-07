import React, { createContext, useState, ReactNode, useContext } from "react";

interface CartItem {
  id: string;
  name: string;
  size: string;
  price: number;
  image: string;
  quantity: number; // Add quantity field
}

interface CartContextProps {
  cart: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string, size: string) => void; // Updated to include size
  increaseQuantity: (itemId: string, size: string) => void; // Updated to include size
  decreaseQuantity: (itemId: string, size: string) => void; // Updated to include size
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.id === item.id && cartItem.size === item.size
      );

      if (existingItemIndex > -1) {
        // Item already exists, update quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1,
        };
        return updatedCart;
      } else {
        // Item does not exist, add it
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeItem = (itemId: string, size: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== itemId || item.size !== size)
    );
  };

  const increaseQuantity = (itemId: string, size: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === itemId && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return updatedCart;
    });
  };

  const decreaseQuantity = (itemId: string, size: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === itemId && item.size === size && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider
      value={{ cart, addItem, removeItem, increaseQuantity, decreaseQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
