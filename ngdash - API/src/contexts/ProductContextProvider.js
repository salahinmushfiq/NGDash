import React, { createContext, useContext, useState } from 'react';
const ProductContext= createContext();
export const ProductContextProvider = ({ children }) => {
    
    
    const [products,setProducts]= useState(5);
    const [selectedProduct, setSelectedProduct] = useState({});


    return (
       <ProductContext.Provider value={{ 
         products,setProducts,
         selectedProduct,
         setSelectedProduct
        }}>
        {children}
       </ProductContext.Provider>
    );
  }

  export const useProductContext = () => useContext(ProductContext);