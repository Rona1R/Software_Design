import React, { createContext, useContext, useReducer } from "react";
import reducer ,{initialState} from "./reducer";

const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    return (
        <CartContext.Provider value={{ state, dispatch }}>
          {children}
        </CartContext.Provider>
      );
    
};

export const useCart = () => useContext(CartContext);