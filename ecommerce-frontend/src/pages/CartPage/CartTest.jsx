import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ProductPopUp from "../../components/ProductComponents/ProductPopUp";
import Footer from "../Home/Footer";
import { useCart } from "../../context/CartProvider";
import BreadcrumbComponent from "../../components/Additional/BreadcrumbComponent";
import SideNav from "pages/Home/SideNav/SideNav";
import axios from "axios";
import TeDhenatKlientit from "components/Payment/TeDhenatKlientit";
import { useNavigate } from "react-router-dom";

import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import CardDetailsTest from "components/CartFolder/CartDetailsTest";
import "./CartTest.css";
import { Link } from "react-router-dom";

const CartTest = () => {
  const navigate = useNavigate();
  const [removedFromCart, setRemovedFromCart] = useState(false);
  const [shippingFee, setShippingFee] = useState(0);
  const [shfaqFormen, setShfaqFormen] = useState(false);
  const [removedPopUp, setRemovedPopUp] = useState(false);
  const [validationResult, setValidationResult] = useState(null);
  const [showError, setShowError] = useState(false);
  const [loggedIn, setloggedIn] = useState(false);
  const { state, dispatch } = useCart();

  let subtotali = 0;
  state.cartItems.map((item) => (subtotali += item.cmimi));

  const loggedUser = JSON.parse(localStorage.getItem("userDetails"));
  useEffect(() => {
    setloggedIn(loggedUser != null);
  }, []);

  useEffect(() => {
    if (subtotali >= 100) {
      setShippingFee(0);
    } else {
      setShippingFee(4);
    }
  }, [subtotali]);

  const formatCartItemsForDTO = (items) => {
    return items.map((item) => ({
      Id: item.id,
      Name: item.name,
      Sasia: item.sasia,
    }));
  };

  const handleShfaqFormen = async () => {
    if (!loggedIn) {
      navigate("/LogIn");
      return;
    }

    const formattedCartItems = formatCartItemsForDTO(state.cartItems);

    try {
      await axios.post(
        "https://localhost:7061/api/Porosia/validateCart",
        formattedCartItems
      );
      // .then(()=>{
      setShfaqFormen(true);
      // })
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // BACKEND VALIDIMI
        // console.log(error.response.data);
        setValidationResult(error.response.data);
        setShowError(true);
      } else {
        console.log("An unexpected error occurred.");
      }
    }
  };

  useEffect(() => {
    if (removedPopUp) {
      const timer = setTimeout(() => {
        setRemovedPopUp(false);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [removedPopUp]);

  const handleRemoveFromCart = (productId) => {
    const productToBeRemoved = state.cartItems.find(
      (produkti) => produkti.id === productId
    );
    if (productToBeRemoved) {
      console.log(
        "this product will be removed from cart: " +
          JSON.stringify(productToBeRemoved)
      );
      setRemovedPopUp(true);

      dispatch({ type: "REMOVE_FROM_CART", payload: productToBeRemoved });

      setRemovedFromCart(true);
      return;
    }
    setRemovedPopUp(false);
  };

  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
  };

  return (
    <>
      {showError && validationResult && (
        <ProductPopUp
          show={showError}
          onHide={() => setShowError(false)}
          notificationType={validationResult.errors}
          error="true"
        />
      )}

      {removedFromCart ? (
        <ProductPopUp
          show={removedPopUp}
          onHide={() => setRemovedPopUp(false)}
          notificationType="Product was removed from cart"
        />
      ) : (
        <ProductPopUp
          show={removedPopUp}
          onHide={() => setRemovedPopUp(false)}
          notificationType="Product couldn't be removed"
        />
      )}

      {shfaqFormen && (
        <TeDhenatKlientit // te dhenat e klientit per me bo Checkout-in
          cmimiTotalMeTvsh={formatPrice(
            subtotali + shippingFee + (subtotali + shippingFee) * 0.1
          )}
          mbyllTeDhenat={() => setShfaqFormen(false)}
        />
      )}
      <SideNav />
      <div className="BreadcrumbContainer" style={{ paddingTop: "100px" }}>
          <BreadcrumbComponent
            path={[{ pageType: "Cart", emri: "Shopping Bag" }]}
          />
        </div>
        <div  style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            justifyContent:"center",
            alignItems:"center",
            alignContent:"center"
            
        }}>
    
        <section      
          style={{
            backgroundColor: "white",
            flex: 1,
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
          }}
        >
          {state.cartItems.length === 0 ? (
            <div className="emptyCartTest">
              <p>Your cart is empty</p>
            </div>
          ) : (
            <MDBContainer className="py-5 h-100">
              <MDBRow className="justify-content-center align-items-center h-100">
                <MDBCol size="12">
                  <MDBCard
                    className="card-registration card-registration-2"
                    style={{
                      borderRadius: "15px",
                      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    <MDBCardBody className="p-0">
                      <MDBRow className="g-0">
                        <MDBCol lg="8">
                          <div className="p-5">
                            <div className="d-flex justify-content-center align-items-center mb-5">
                              <MDBTypography
                                tag="h2"
                                className="fw-bold mb-0 text-black"
                              >
                                Shopping Cart
                              </MDBTypography>
                            </div>
                            <CardDetailsTest
                              products={state.cartItems}
                              onRemove={handleRemoveFromCart}
                            />
                            <div className="pt-5">
                              <MDBTypography tag="h6" className="mb-0">
                                <MDBCardText
                                  className="text-body"
                                  style={{display:"flex",justifyItems:"flex-start"}}
                                >
                                  <MDBIcon
                                    fas
                                    icon="long-arrow-alt-left me-2"
                                  />{" "}
                                  <Link to="/" style={{color:"black"}}>
                                    Back to shop
                                  </Link>
                                </MDBCardText>
                              </MDBTypography>
                            </div>
                          </div>
                        </MDBCol>
                        <MDBCol lg="4" className="bg-grey">
                          <div className="p-5">
                            <MDBTypography
                              tag="h3"
                              className="fw-bold mb-5 mt-2 pt-1"
                            >
                              Summary
                            </MDBTypography>

                            <hr className="my-4" />

                            <div className="d-flex justify-content-between mb-4">
                              <MDBTypography
                                tag="h5"
                                className="text-uppercase"
                              >
                                Items
                              </MDBTypography>
                              <MDBTypography tag="h5">
                                {" "}
                                {state.cartItems.length}{" "}
                              </MDBTypography>
                            </div>
                            <div className="d-flex justify-content-between mb-4">
                              <MDBTypography
                                tag="h5"
                                className="text-uppercase"
                              >
                                Shipping Fee
                              </MDBTypography>
                              <MDBTypography tag="h5">
                                {" "}
                                {shippingFee} €
                              </MDBTypography>
                            </div>
                            <div className="d-flex justify-content-between mb-4">
                              <MDBTypography
                                tag="h5"
                                className="text-uppercase"
                              >
                                Subtotal
                              </MDBTypography>
                              <MDBTypography tag="h5">
                                {" "}
                                {formatPrice(subtotali)} €
                              </MDBTypography>
                            </div>
                            <div className="d-flex justify-content-between mb-4">
                              <MDBTypography
                                tag="h5"
                                className="text-uppercase"
                              >
                                Totali (pa tvsh)
                              </MDBTypography>
                              <MDBTypography tag="h5">
                                {" "}
                                {formatPrice(subtotali + shippingFee)} €
                              </MDBTypography>
                            </div>

                            <div className="d-flex justify-content-between mb-4">
                              <MDBTypography
                                tag="h5"
                                className="text-uppercase"
                              >
                                Tvsh (10%)
                              </MDBTypography>
                              <MDBTypography tag="h5">
                                {" "}
                                {formatPrice((subtotali + shippingFee) * 0.1)}€
                              </MDBTypography>
                            </div>
                            <hr className="my-4" />

                            <div className="d-flex justify-content-between mb-5">
                              <MDBTypography
                                tag="h5"
                                className="text-uppercase"
                                style={{fontWeight:"bold"}}
                              >
                                Totali (me tvsh)
                              </MDBTypography>
                              <MDBTypography tag="h5" 
                                style={{fontWeight:"bold"}}
                              >
                                {" "}
                                {formatPrice(
                                  subtotali +
                                    shippingFee +
                                    (subtotali + shippingFee) * 0.1
                                )}
                                €
                              </MDBTypography>
                            </div>

                            <button className="show-checkout" onClick={handleShfaqFormen}>
                              Checkout
                            </button>
                          </div>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          )}
        </section>
      </div>
     <Footer />
    </>
  );
};

export default CartTest;
