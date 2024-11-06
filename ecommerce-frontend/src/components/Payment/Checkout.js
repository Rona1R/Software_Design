import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Style/PaymentForm.css";
import { useLocation } from "react-router-dom";
import { useCart } from "context/CartProvider";
import "./Style/Checkout.css";
import SideNav from "pages/Home/SideNav/SideNav";
import Footer from "pages/Home/Footer";
import { MDBTypography } from "mdb-react-ui-kit";
import {
  faUser,
  faEnvelope,
  faPhone,
  faLocationDot,
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [subtotali,setSubtotali] = useState(0);
  const { state } = useCart();
  const adresaData = location.state ? location.state.orderData : null;

  const loggedUser = JSON.parse(localStorage.getItem('userDetails'));


  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
  };

  useEffect(() => {
    if(!adresaData || state.cartItems.length === 0)
    {
      navigate("/Cart");
    }
  }, [navigate,adresaData,state.cartItems.length]);


  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const calculateTotal = () => {
      let subtotal = 0;
      state.cartItems.forEach((item) => {
        subtotal += item.cmimi;
      });
  
      setSubtotali(subtotal);
      let shippingCost = subtotal >= 100 ? 0 : 4;
      let tax = (subtotal + shippingCost) * 0.1;
      let total = subtotal + shippingCost + tax;
  
      return total * 100; // Convert total to cents
    };
  
    const fetchClientSecret = async () => {
      const totalAmountInCents = calculateTotal();
      console.log("Totali i pageses ne cent eshte "+totalAmountInCents);
      const response = await axios.post(
        "https://localhost:7061/api/Payements/payment_intents",
        {
          amount: 
          totalAmountInCents.toFixed()
          
        }
       )//.then((response)=>{
        setClientSecret(response.data);
      // })
    };

    
    fetchClientSecret();
    
  }, [state.cartItems]);

  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#32325d",
      colorBackground: "#f9f9f9",
      colorText: "#32325d",
      colorDanger: "#fa755a",
      fontFamily: "Arial, sans-serif",
      spacingUnit: "4px",
      borderRadius: "4px",
    },
    rules: {
      ".Input": {
        borderColor: "#ccc",
        boxShadow: "none",
      },
      ".Input:hover": {
        borderColor: "#888",
      },
      ".Input:focus": {
        borderColor: "#555",
      },
      ".Label": {
        color: "#1e1b46",
        fontWeight: "bold",
      },
      // '.PaymentElement': {
      //   boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      //   padding: '10px',
      // },
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="checkout-body">
      <SideNav />
      <div className="checkout-content">
        <div className="link-to-cart">
          <Link to="/Cart">
            <FontAwesomeIcon icon={faArrowLeft}/> <span>Kthehu te shporta</span>
          </Link>
        </div>
        
        <div className="page-header">
          <h2> Kryej Pagesen </h2>
        </div>
        <div className="checkout-wrapper">
          <div className="tedhenat-perdoruesit">
            {adresaData && (
              <div className="porosia-detajet-wrapper">
                <h2>Te dhenat e Porosise</h2>
                <div className="tedhenat-klientit">
                  <h4>Te dhenat e tua</h4>
                  <div className="d-flex justify-content-between">
                    <MDBTypography tag="h6" className="text-uppercase">
                      <FontAwesomeIcon icon={faUser} />
                      <span className="teDhenat-left">Klienti</span>
                    </MDBTypography>
                    <MDBTypography tag="h6">{loggedUser && loggedUser.username}</MDBTypography>
                  </div>
                  <div className="d-flex justify-content-between">
                    <MDBTypography tag="h6" className="text-uppercase">
                      <FontAwesomeIcon icon={faEnvelope} />
                      <span className="teDhenat-left">Email</span>
                    </MDBTypography>
                    <MDBTypography tag="h6">{loggedUser && loggedUser.email}</MDBTypography>
                  </div>
                  <div className="d-flex justify-content-between">
                    <MDBTypography tag="h6" className="text-uppercase">
                      <FontAwesomeIcon icon={faPhone} />
                      <span className="teDhenat-left">Nr.Tel</span>
                    </MDBTypography>
                    <MDBTypography tag="h6">{adresaData.nrTel}</MDBTypography>
                  </div>
                  <div className="d-flex justify-content-between">
                    <MDBTypography tag="h6" className="text-uppercase">
                      <FontAwesomeIcon icon={faLocationDot} />
                      <span className="teDhenat-left">Adresa</span>
                    </MDBTypography>
                    <MDBTypography tag="h6">
                      {adresaData.adresa},<br/>
                      {adresaData.selectedCity} , {adresaData.zipCode}
                      <br />
                      {adresaData.selectedCountry}
                    </MDBTypography>
                  </div>
                </div>
                <div className="detajet-porosia">
                  <h4>Faturimi</h4>
                  <div className="d-flex justify-content-between">
                    <MDBTypography tag="h6" className="text-uppercase">
                      Subtotali
                    </MDBTypography>
                    <MDBTypography tag="h6">
                      {formatPrice(subtotali)} €
                    </MDBTypography>
                  </div>
                  <div className="d-flex justify-content-between">
                    <MDBTypography tag="h6" className="text-uppercase">
                      Shipping Fee
                    </MDBTypography>
                    <MDBTypography tag="h6">
                      {subtotali >= 100 ? 0 : 4} €
                    </MDBTypography>
                  </div>
                  <div className="d-flex justify-content-between">
                    <MDBTypography tag="h6" className="text-uppercase">
                      Totali (pa tvsh)
                    </MDBTypography>
                    <MDBTypography tag="h6">
                      {formatPrice(subtotali + (subtotali >= 100 ? 0 : 4))} €
                    </MDBTypography>
                  </div>
                  <div className="d-flex justify-content-between">
                    <MDBTypography tag="h6" className="text-uppercase">
                      TVSH (10%)
                    </MDBTypography>
                    <MDBTypography tag="h6">
                      {formatPrice(
                        (subtotali + (subtotali >= 100 ? 0 : 4)) * 0.1
                      )}{" "}
                      €
                    </MDBTypography>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <MDBTypography tag="h6" className="text-uppercase">
                      Totali (me TVSH)
                    </MDBTypography>
                    <MDBTypography tag="h6">
                      {formatPrice(
                        subtotali +
                          (subtotali >= 100 ? 0 : 4) +
                          (subtotali + (subtotali >= 100 ? 0 : 4)) * 0.1
                      )}{" "}
                      €
                    </MDBTypography>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="payment-component">
            {clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <div className="payment-form-wrapper">
                  <PaymentForm
                  teDhenatAdreses = {adresaData}
                  cmimiTotal = {formatPrice(
                    subtotali +
                      (subtotali >= 100 ? 0 : 4) +
                      (subtotali + (subtotali >= 100 ? 0 : 4)) * 0.1
                  )}
                  />
                </div>
              </Elements>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
