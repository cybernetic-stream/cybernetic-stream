'use client';
import PaymentModal from './payment-modal';
import { ActionablePaymentsContext } from '../data-provider';
import { Suspense, useContext } from 'react';

export default function HiddenPaymentModals() {
  const actionablePayments = useContext(ActionablePaymentsContext);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {Object.keys(actionablePayments).map((paymentKey) => (
        <PaymentModal
          key={paymentKey}
          payment={{ ...actionablePayments[paymentKey], id: paymentKey }}
        />
      ))}
    </Suspense>
  );
}
