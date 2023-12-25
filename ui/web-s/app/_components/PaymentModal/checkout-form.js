'use client';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@mui/material';

export const CheckoutForm = ({ payment }) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handlePaymentMethodChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSubmitted(true);

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/`,
      },
    });

    if (error) {
      console.log(error);
      if (error.code.includes('incomplete')) {
        setError('');
      } else {
        setError(error.message);
      }
    } else {
      if (paymentIntent && paymentIntent.status === 'succeeded') {
        router.push('/success');
      }
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement
        onReady={() => {
          setError(null);
        }}
        onChange={handlePaymentMethodChange}
      />
      {submitted && error && (
        <p style={{ color: 'black', marginTop: '10px' }}>{error}</p>
      )}
      <Button
        fullWidth
        type='submit'
        variant='contained'
        sx={{ mt: '15px' }}
        color='primary'
        disableElevation
        disabled={isLoading || !stripe || !elements}
        style={{ color: 'white' }}
      >
        {isLoading
          ? 'Processing...'
          : `initiate ${new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: payment.amount % 100 === 0 ? 0 : 2,
              maximumFractionDigits: payment.amount % 100 === 0 ? 0 : 2,
            })
              .format(payment.amount / 100)
              .replace(/,/g, ' ')} transfer [${payment.id}]`}
      </Button>
    </form>
  );
};
