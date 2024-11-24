import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CardDetails.css';
import { useCart } from '../../context/CartProvider';
import axios from 'axios';
import ProductPopUp from 'components/ProductComponents/ProductPopUp';

const CardDetails = ({ products, onRemove }) => {
    const {dispatch} = useCart();

    const [showWarning,setShowWarning] = useState(false);

    const fetchLatestProductData = async () => {
        try{
            const productIds = products.map(product => product.id);
            const queryString = productIds.map(id => `productIds=${id}`).join('&');
            console.log(productIds);
            const response = await axios.get(`https://localhost:7061/api/Produkti/productsByIds?${queryString}`)
            // ).then((response)=>{
            console.log("Products from backend : ");
            const updatedProducts = response.data;
            console.log(updatedProducts);
            dispatch({ type: 'UPDATE_CART', payload: updatedProducts });
            // })

        }catch(error){
            console.log(error);
        }

    }

    useEffect(()=>{
        fetchLatestProductData();
    },[])
    // const retrieveProductFromDB =(produktiID)=>{
    //     const produkti = categoryData.products.find((produkt)=>produkt.id === produktiID);
    //     if(!produkti){
    //         return "Not Found";
    //     }
    // }
    const formatPrice = (price) => { 
        return parseFloat(price).toFixed(2);
    };

    const handleQuantityChange = async (operationType,IDProdukti)=>{ // kjo do lidhet edhe me back per me ndalu increment nese ska stock te mjaftueshem
        let sasiaNeStok = 0;

        if(IDProdukti){
            try{
                const response =  await axios.get(`https://localhost:7061/api/Produkti/shfaqProduktin/${IDProdukti}`)
                // .then((response)=>{
                sasiaNeStok = response.data.stoku;
                // })
            }catch(error){
                console.log(error);
            }
        }

        const productToUpdate= products.find(produkti => produkti.id === IDProdukti);

        const basePrice = productToUpdate.cmimiBaze;
        console.log ( "Base price is : "+basePrice);

        console.log(productToUpdate);
        if(productToUpdate){
            switch(operationType){
                case "increment":
                    let sasiaPerTuShtuar = productToUpdate.sasia;
                    if(sasiaNeStok >= (sasiaPerTuShtuar+=1)){
                        productToUpdate.sasia += 1;
                        console.log("sasia updated : "+productToUpdate.sasia);
                        productToUpdate.cmimi = productToUpdate.sasia * basePrice;
                        console.log("cmimi i ri: "+productToUpdate.cmimi);
                    }
                    else{
                        console.log("Nuk ka me shume stok per kete produkt!!")
                        setShowWarning(true);
                    }
                    break;
                case "decrement":
                    if (productToUpdate.sasia > 1) {
                        productToUpdate.sasia -= 1;
                        console.log("sasia updated : "+productToUpdate.sasia);
                        productToUpdate.cmimi = productToUpdate.sasia * basePrice;
                        console.log("cmimi i ri: "+productToUpdate.cmimi);
                      }
                    break;
                default:
                    console.log("operation type invalid");
                
            };

            dispatch({type:"NDRYSHO_SASINE",payload:productToUpdate});
        }
    }

    useEffect(() => {
        if (showWarning) {
          const timer = setTimeout(() => {
            setShowWarning(false);
          }, 1500);
          return () => clearTimeout(timer);
        }
      }, [showWarning]);


    return (
        <div className="product-container">
            {
                showWarning && (
                    <ProductPopUp
                        show={showWarning}
                        onHide={() => setShowWarning(false)}
                        notificationType="Stock is limited for this product !"
                        error="True"
                 />
                )
            }
            {

                products.length === 0 && 
                <div className="emptyCart">
                    <p>Your cart is empty</p>
                </div>
            }
            {products.map(product => {
                return(
                <div className="product-cart" key={product.id} style={{width:"350px",padding:"0px"}}>
                    <Link to={`/ProductDetails/${product.id}`}>
                        <img src={'/images/'+product.img} alt={product.name} className="product-img" style={{height:"320px"}} />
                    </Link>
                    <div className="cartProductDetails"  style={{padding:'10px'}}>
                        <h3 className="product-title">{product.name}</h3>
                        <p className="product-price">{formatPrice(product.cmimi)} €</p>
                        <div className="quantity-butonat">
                            <button className="quantity-button" onClick={()=>handleQuantityChange("decrement",product.id)}  disabled={product.sasia === 1}>-</button>
                            <span className="product-quantity">{product.sasia}</span>
                            <button className="quantity-button" onClick={()=>handleQuantityChange("increment",product.id)} type="button">+</button>
                        </div>
                        <button className="removeButton" onClick={() => onRemove(product.id)}>Remove</button>
                    </div>
                </div>
                )
            })}
        </div>
    );
}

export default CardDetails;
