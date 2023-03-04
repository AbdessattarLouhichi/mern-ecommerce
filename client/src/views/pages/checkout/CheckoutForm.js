import React from 'react';
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify';
import axios from '../../../config/config';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    try {
        const response = await axios.post('/checkout', paymentMethod)
        console.log(response)
        .then((response) => {
            if (response.data.url) {
              window.location.href = response.data.url;
            }
          })
        toast.success(response.data)
    } catch (error) {
        toast.error(error.message)
    }
    if(error){
        console.log(error)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <ToastContainer />
        <div className='from-group mx-4 p-3'>
            <div className='bg-white p-2'>
                <CardElement options={{hidePostalCode : true}} />
            </div>
            
            <button type="submit" disabled={!stripe || !elements} className="btn btn-primary btn-block my-3">
                Pay
            </button>
        </div>
    </form>
  );
};

export default CheckoutForm