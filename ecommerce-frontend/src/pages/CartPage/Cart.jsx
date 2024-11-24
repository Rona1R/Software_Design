import React from "react";
//import { Link } from "react-router-dom";
import CardDetails from "../../components/CartFolder/CardDetails";
import "./Cart.css";
//import placeholderImage from "../../images/placeholder-image.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useEffect } from "react";
import ProductPopUp from "../../components/ProductComponents/ProductPopUp";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
// import Header from "../Home/Header";
// import NavBar from "../Home/NavBar";
import Footer from "../Home/Footer";
import { useCart } from "../../context/CartProvider";
import BreadcrumbComponent from "../../components/Additional/BreadcrumbComponent";
import SideNav from "pages/Home/SideNav/SideNav";
//import { useNavigate } from 'react-router-dom';
import axios from "axios";
import TeDhenatKlientit from "components/Payment/TeDhenatKlientit";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Cart = () => {
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

    // nese shkaku i ndonje errori nga response
    // setRemovedFromCart(false);
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
      <div className="cart-container">
        <div
          className="cart-header"
          style={{
            backgroundColor: "#f0f0f0",
            color: "#333",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {" "}
          <span>
            <FontAwesomeIcon
              icon={faCheckCircle}
              style={{ marginRight: "5px" }}
            />
            Your Shopping Cart
          </span>
          <div
            className="link"
            style={{
              backgroundColor: "#f0f0f0",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Link
              to="/Wishlist"
              style={{
                textDecoration: "none",
                color: "white",
                fontWeight:"bold",
                display: "inline-block",
                padding: "15px",
                background: "#333",
                borderRadius: "5px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                transition: "background-color 0.3s",
              }}
            >
              <FontAwesomeIcon
                icon={faHeart}
                style={{ marginRight: "5px", color: "#9b95f3" }}
              />
              Go to your Wishlist
            </Link>
          </div>
        </div>
        <div className="BreadcrumbContainer" style={{ paddingTop: "10px" }}>
          <BreadcrumbComponent
            path={[{ pageType: "Cart", emri: "Shopping Bag" }]}
          />
        </div>
        <div className="cart-content">
          <div className="cart-item-wrapper">
            <CardDetails
              products={state.cartItems}
              onRemove={handleRemoveFromCart}
            />
          </div>

          {state.cartItems.length !== 0 && (
            <div
              className="order-details"
              style={{
                margin: "0px auto", 
                padding : "50px"
              }}
            >
              <div className="order-summary">
                <div className="order-summary-title">Detajet e shportes</div>
                <div className="order-summary-detail">
                  <span>Transporti:</span>
                  <span>{shippingFee} €</span>
                </div>
                <div className="order-summary-detail">
                  <span>Subtotali:</span>
                  <span>{formatPrice(subtotali)} €</span>
                </div>
                <div className="order-summary-detail">
                  <span>Totali (pa tvsh):</span>
                  <span>{formatPrice(subtotali + shippingFee)} €</span>
                </div>
                <div className="order-summary-detail">
                  <span>Tvsh (10%):</span>
                  <span>{formatPrice((subtotali + shippingFee) * 0.1)} €</span>
                </div>

                <div className="order-summary-detail">
                  <span>Totali (me tvsh):</span>
                  <span>
                    {formatPrice(
                      subtotali + shippingFee + (subtotali + shippingFee) * 0.1
                    )}
                    €
                  </span>
                </div>
              </div>

              <div className="action-buttons">
                <button className="continue-shopping">
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Vazhdo Blerjen
                  </Link>
                </button>
                <button
                  className="proceed-to-checkout"
                  onClick={handleShfaqFormen}
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
