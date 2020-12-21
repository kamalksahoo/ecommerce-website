import React, { useState, useEffect } from "react";
import { isAutheticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";
import { createOrder } from "./helper/orderHelper";

const StripeCheckout = ({
  products,
  setReload = f => f,
  reload = undefined
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: ""
  });

  const token = isAutheticated() && isAutheticated().token;
  const userId = isAutheticated() && isAutheticated().user._id;

  const getFinalAmount = () => {
    let amount = 0;
    products.map(p => {
      amount = amount + p.price;
    });
    return amount;
  };

  const makePayment = token => {
    const body={
      token,
      products
    }
    const headers={
      "content-type":"application/json"
    }
    return fetch(`${API}/stripepayment`,{
      method:"POST",
      headers,
      body:JSON.stringify(body)
    }).then(response=>{
      const {status}=response
      console.log(status)
      //console.log(response)

    }).catch(err=>console.log(err))
  };
  

  const showStripeButton = () => {
    return isAutheticated() && products.length>0 ? (
      <StripeCheckoutButton
        stripeKey="pk_test_51I0KymL19MYBDiXRTMN5D3x1kyr7b417E7GICBilNmyvosz8nRqg90FLiRYlafWrimQVXIOc250zeSLUJ7OxbKhx00BJw4GdPq"
        token={makePayment}
        amount={getFinalAmount() * 100}
        name="Buy Mobiles"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay Now</button>
      </StripeCheckoutButton>
    ) : (
      products.length>0  ?(
        <Link to="/signin">
        <button className="btn btn-warning"> Signin</button>
      </Link>
      ):(
        <Link to="/">
        <button className="btn btn-warning"> add item to cart </button>
      </Link>
      )
      
    );
  };

  return (
    <div>
      <h3 className="text-white">Stripe Checkout {getFinalAmount()}</h3>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
