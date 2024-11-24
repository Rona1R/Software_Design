import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartProvider";
import axios from "axios";
import ProductPopUp from "components/ProductComponents/ProductPopUp";
import {
    MDBCardImage,
    MDBCol,
    MDBIcon,
    MDBRow,
    MDBTypography,
  } from "mdb-react-ui-kit";
import "./CardDetailsTest.css"; 
import { Link } from "react-router-dom";

const CardDetailsTest = ({ products , onRemove }) => {
  const { dispatch } = useCart();

  const [showWarning, setShowWarning] = useState(false);

  const fetchLatestProductData = async () => {
    try {
      const productIds = products.map((product) => product.id);
      const queryString = productIds.map((id) => `productIds=${id}`).join("&");
      console.log(productIds);
      const response = await axios.get(
        `https://localhost:7061/api/Produkti/productsByIds?${queryString}`
      );

      console.log("Products from backend : ");
      const updatedProducts = response.data;
      console.log(updatedProducts);
      dispatch({ type: "UPDATE_CART", payload: updatedProducts });

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLatestProductData();
  }, []);

  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
  };

  const handleQuantityChange = async (operationType, IDProdukti) => {
    // kjo do lidhet edhe me back per me ndalu increment nese ska stock te mjaftueshem
    let sasiaNeStok = 0;

    if (IDProdukti) {
      try {
        const response = await axios.get(
          `https://localhost:7061/api/Produkti/shfaqProduktin/${IDProdukti}`
        );
        // .then((response)=>{
        sasiaNeStok = response.data.stoku;
        // })
      } catch (error) {
        console.log(error);
      }
    }

    const productToUpdate = products.find(
      (produkti) => produkti.id === IDProdukti
    );

    const basePrice = productToUpdate.cmimiBaze;
    console.log("Base price is : " + basePrice);

    console.log(productToUpdate);
    if (productToUpdate) {
      switch (operationType) {
        case "increment":
          let sasiaPerTuShtuar = productToUpdate.sasia;
          if (sasiaNeStok >= (sasiaPerTuShtuar += 1)) {
            productToUpdate.sasia += 1;
            console.log("sasia updated : " + productToUpdate.sasia);
            productToUpdate.cmimi = productToUpdate.sasia * basePrice;
            console.log("cmimi i ri: " + productToUpdate.cmimi);
          } else {
            console.log("Nuk ka me shume stok per kete produkt!!");
            setShowWarning(true);
          }
          break;
        case "decrement":
          if (productToUpdate.sasia > 1) {
            productToUpdate.sasia -= 1;
            console.log("sasia updated : " + productToUpdate.sasia);
            productToUpdate.cmimi = productToUpdate.sasia * basePrice;
            console.log("cmimi i ri: " + productToUpdate.cmimi);
          }
          break;
        default:
          console.log("operation type invalid");
      }

      dispatch({ type: "NDRYSHO_SASINE", payload: productToUpdate });
    }
  };

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
      {showWarning && (
        <ProductPopUp
          show={showWarning}
          onHide={() => setShowWarning(false)}
          notificationType="Stock is limited for this product !"
          error="True"
        />
      )}
      {products.map((product) => (
        <div key={product.id}>
        <hr className="my-4" />
        <MDBRow className="mb-4 d-flex justify-content-between align-items-center">
            <MDBCol md="2" lg="2" xl="2">
              <Link to={`/ProductDetails/${product.id}`}>   
              <MDBCardImage
                src={'/images/'+product.img} alt={product.name}
                fluid
                className="rounded-3"
                />
             </Link>
            </MDBCol>
          <MDBCol md="3" lg="3" xl="3">
            <MDBTypography tag="h6" className="text-black mb-0" style={{ padding: "16px" }}>
            {product.name}
            </MDBTypography>
          </MDBCol>
          <MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center">
            <button className="quantity-button" onClick={()=>handleQuantityChange("decrement",product.id)}  disabled={product.sasia === 1}>-</button>
            <span className="product-quantity-field">{product.sasia}</span>
            <button className="quantity-button" onClick={()=>handleQuantityChange("increment",product.id)} type="button">+</button>
          </MDBCol>
          <MDBCol md="3" lg="2" xl="2" className="text-end">
            <MDBTypography tag="h6" className="mb-0">
              € {formatPrice(product.cmimi)}
            </MDBTypography>
          </MDBCol>
          <MDBCol md="1" lg="1" xl="1" className="text-end">
            <button className="text-muted" style={{border:"none",backgroundColor:"inherit"}} onClick={() => onRemove(product.id)}>
              <MDBIcon fas icon="times" />
            </button>
          </MDBCol>
        </MDBRow>
        </div>
      ))}
    </div>
  );
};

export default CardDetailsTest;
