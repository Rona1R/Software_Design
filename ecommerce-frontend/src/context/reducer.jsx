let cart = [];
try {
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
} catch (error) {
    console.error('Error parsing cart data from localStorage:', error);
}

export const initialState = {
    
    cartItems : cart
};

const reducer = (state,action) => {

    switch (action.type) {

        case "ADD_TO_CART":
            const newCartItems = [...state.cartItems,action.payload]; // cmimi i produktit : cmimi * sasia e vendosur ne shporte
            localStorage.setItem("cart",JSON.stringify(newCartItems));
            return {
                ...state,
                cartItems : newCartItems,
            };
        case "REMOVE_FROM_CART":
            const updatedCartAfterRemove = state.cartItems.filter(
                item => item.id !== action.payload.id
            );
            localStorage.setItem("cart",JSON.stringify(updatedCartAfterRemove));
            return {

                ...state,
                cartItems: updatedCartAfterRemove,
            };
        case "EMPTY_CART":
            localStorage.removeItem("cart");
            return {
                ...state,
                cartItems :[],
            };
        case "NDRYSHO_SASINE":
            const produktiMeSasineUpdated = 
            state.cartItems.map(item=>{
                if(item.id === action.payload.id){
                    return {
                        ...item,
                        sasia : action.payload.sasia
                    }
                }
                return item;
            });
            
            localStorage.setItem("cart",JSON.stringify(produktiMeSasineUpdated));
            return {
                ...state,
                cartItems : produktiMeSasineUpdated,
            };
        case "UPDATE_CART":
            const updatedCart = action.payload.map(updatedProduct => {
                const productInCart = state.cartItems.find(item => item.id === updatedProduct.id);
                if (productInCart) {
                    return {
                        ...productInCart,
                        name: updatedProduct.name,
                        img:updatedProduct.image,
                        cmimiBaze: updatedProduct.cmimiBaze,
                        cmimi: productInCart.sasia * updatedProduct.cmimiBaze
                    };
                }
                return productInCart;
            }).filter(item => item !== undefined); 

            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return {
                ...state,
                cartItems: updatedCart,
            };
        default:
            return state;
        }
    };
export default reducer;