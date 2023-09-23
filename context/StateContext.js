"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [totalQuantity, setTotalQuantity] = useState();
  const [quantity, setQuantity] = useState(1);

  const onAdd = (product, qty) => {
    const checkProductInCart
  }

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity - 1 < 1) return 1;

      return prevQuantity - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantity,
        quantity,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </Context.Provider>
  );
  
};


export const useStateContext = () => useContext(Context);
