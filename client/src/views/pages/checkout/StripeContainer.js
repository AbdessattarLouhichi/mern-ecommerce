import React from 'react'
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51MOg2eIl0tEk0oiz3q2rM8nozGglmsLFRqcevGhqy5aBgLFgjBj6BedeF1tFZ5mFA87FQ6DJWFpDzOUsmM5t8Exh00IzyXpSX7');


function Stripe() {
  return (
    <Elements stripe={stripePromise}>
        <CheckoutForm />
    </Elements>
  )
}

export default Stripe