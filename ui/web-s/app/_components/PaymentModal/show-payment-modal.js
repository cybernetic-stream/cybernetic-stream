'use client';
import { useEffect } from 'react';

export default function ShowPaymentModal({ paymentID }) {
  useEffect(() => {
    let element;
    let timeoutId = null;

    function checkElement() {
      element = document.getElementById(paymentID);

      if (element) {
        element.classList.remove('invisible');
        element.classList.remove('-z-50');

        // Clean up the effect when element is found
        clearTimeout(timeoutId);
        return () => {
          element.classList.add('invisible');
          element.classList.add('-z-50');
        };
      } else {
        timeoutId = setTimeout(checkElement, 1);
      }
    }

    checkElement();

    // Clean up the effect when unmounting or when paymentID changes
    return () => {
      clearTimeout(timeoutId);
      if (element) {
        element.classList.add('invisible');
        element.classList.add('-z-50');
      }
    };
  }, [paymentID]);

  return <></>;
}
