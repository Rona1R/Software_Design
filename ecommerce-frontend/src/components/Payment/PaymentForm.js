import React, { useState} from "react";
import {
  useStripe,
  useElements,
  PaymentElement
} from "@stripe/react-stripe-js";

import "./Style/PaymentForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "context/CartProvider";

export default function PaymentForm(props) {
  const stripe = useStripe();
  const navigate = useNavigate();
  const { state ,dispatch} = useCart();

  const adresaUserit = props.teDhenatAdreses;
  const cmimiTotalMeTvsh = props.cmimiTotal;
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const loggedUser = JSON.parse(localStorage.getItem('userDetails'));


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setMessage("Stripe.js has not loaded yet.");
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Provide the URL the customer should be redirected to after the authentication process
        return_url: "http://localhost:3000/checkout-success",
      },
      redirect: 'if_required' 
    });
    
    if (error) {
      setMessage(`Error: ${error.message}`);
      console.log("Something went wrong!")
    } else if (paymentIntent.status === "succeeded") {
      console.log("Your payment was successful!");
      // API Call to insert order upon successful payment 
      try{
       const response =  await axios.post("https://localhost:7061/api/Porosia/shtoPorosine",{
          nrProdukteve: state.cartItems.length,
          cmimiTotal: parseFloat(cmimiTotalMeTvsh),
          adresa: adresaUserit.adresa,
          shteti:adresaUserit.selectedCountry,
          qyteti: adresaUserit.selectedCity,
          metodaPageses:"Stripe",
          nrKontaktues : adresaUserit.nrTel,
          zipKodi:String(adresaUserit.zipCode),
          userId:parseInt(loggedUser.userId),
          items : state.cartItems.map(item=>({
              sasia: item.sasia,
              produktiId: item.id,
              cmimi: item.cmimiBaze
          }))
        })//.then((response)=>{
          const porosiaVendosurId = response.data;
          // clearing cart:
          dispatch({ type: "EMPTY_CART" });
          navigate('/checkout-success',{state:{porosiaVendosurId}},{ replace: true })
        // })
      }catch(error){
        if(error.response && error.response.status === 400){
          console.log(error.response.data);
          setMessage(error.response.data);
        }
        else{
          console.log("Unexpected error occured.");
        }
      }
    //  window.location.href = "http://localhost:3000/checkout-success";
    } else if (paymentIntent.status === "processing") {
      console.log("Your payment is being processed. Please wait.");
    } else if (paymentIntent.status === "requires_payment_method") {
      setMessage("Your payment was unsuccessful. Please check your payment details and try again.");
    } else if (paymentIntent.status === "requires_action") {
      setMessage("Additional action required to complete the payment. Please follow the instructions.");
    } else {
      setMessage("Something went wrong. Please try again.");
    }

    setIsLoading(false);
  };

  
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <div className="payment-label-wrappper">
          <span className="payment-label"> Powered by <span>Stripe</span></span>
      </div>
      <PaymentElement id="payment-element" className="payment-elements" />
      <div className="pay-buton-wrapper">
        <button type="submit" disabled={isLoading || !stripe || !elements} id="submit" className="pay-butoni">
          <span id="button-text">{isLoading ? <div className="spinner" id="spinner"></div> : 'Proceed with Payment'}</span>
        </button>
      </div>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
