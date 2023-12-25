'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { CheckoutForm } from './checkout-form';
import { loadStripe } from '@stripe/stripe-js';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { Elements } from '@stripe/react-stripe-js';
import createTheme from '@mui/material/styles/createTheme';

const stripePromise = loadStripe(
  'pk_live_51MqnIsKaqC0LBJQA7htbxiB9Ao1Bhox8eUM2ErMEjNkdu7jYeGsUAHFi1lL1wAkSccOiyqg29qeVIzGixijSE1yQ00lXP6w1Nr'
);

export const MUIWhiteBackgroundBlackText = createTheme({
  palette: {
    primary: { main: 'rgba(0,0,0,1) !important' },
  },
  typography: { fontFamily: ['var(--SFMono-Regular)'] },
  components: {
    MuiInputLabel: {
      styleOverrides: { root: { color: 'black !important' } },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          '&:hover:not(.Mui-disabled):before': {
            borderBottomColor: 'black',
          },
        },
      },
    },
  },
});
export default function PaymentModal({ payment }) {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/');
  }, []);

  const appearance = {
    variables: {
      colorPrimary: '#000000',
      colorText: '#000000',
      colorDanger: '#000000',
      fontFamily:
        'SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace, arial',
      colorIcon: '#000000',
    },
  };

  return (
    <ThemeProvider theme={MUIWhiteBackgroundBlackText}>
      <Dialog
        id={payment.id}
        className={
          usePathname().split('/').pop() !== payment ? 'invisible -z-50' : ''
        }
        open={true}
        onClose={() => router.push(`/`)}
        fullWidth
        maxWidth={false}
        scroll={'body'}
        PaperProps={{ style: { borderRadius: 0, maxWidth: '400px' } }}
        hideBackdrop
      >
        <DialogContent>
          {payment.client_secret && (
            <Elements
              options={{ clientSecret: payment.client_secret, appearance }}
              stripe={stripePromise}
            >
              <CheckoutForm payment={payment} />
            </Elements>
          )}
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}
