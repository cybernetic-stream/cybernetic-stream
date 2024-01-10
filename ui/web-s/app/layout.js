import localFont from 'next/font/local';
import './globals.css';
import Script from 'next/script';
import LayoutRect from './_components/layout-rect';
import DataProvider from './_components/data-provider';
import namesAsKeys from './_lib/namesAsKeys';
import HiddenPaymentModals from './_components/PaymentModal/hidden-payment-modals';
import { db } from '../firestore.js';

const SFMonoRegular = localFont({
  src: 'SF-Mono-Regular.otf',
  variable: '--SFMono-Regular',
  display: 'swap',
});

export const metadata = {
  title: process.env.NEXT_PUBLIC_SUBLICENSE,
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
};

export default async function RootLayout({ children }) {
  const placeData = (
    await db
      .collection('Sublicense')
      .doc(process.env.NEXT_PUBLIC_SUBLICENSE)
      .get()
  ).data();
  const initialPlaceData = { name: placeData.name };

  const initialActionablePaymentsSnapshot = await db
    .collection('SublicensePayment')
    .where('Sublicense', '==', process.env.NEXT_PUBLIC_SUBLICENSE)
    .where('status', 'in', ['requires_payment_method', 'requires_action'])
    .orderBy('created', 'asc')
    .get();
  let initialActionablePayments = {};
  initialActionablePaymentsSnapshot.forEach((doc) => {
    initialActionablePayments[doc.id] = {
      ...doc.data(),
      created: new Date(doc.data().created.seconds * 1000),
    };
  });
  initialActionablePayments = namesAsKeys(initialActionablePayments);

  return (
    <html>
      <body
        className={
          `bg-black ${SFMonoRegular.className} ` +
          (initialPlaceData.name.length >= 17
            ? 'text-3xl app-sm:text-4xl short:sm:text-2xl'
            : 'sm:text-4xl xx-sm:text-4xl short:sm:text-3xl 2xl:text-[2.5rem] 4xl:text-[3.1rem] 6xl:text-[3.2rem]')
        }
      >
        <div id='map-container' className='fixed w-[100%] h-[100%]'>
          <Script src='/map.js' />
        </div>

        <LayoutRect background />
        <DataProvider
          initialPlaceData={initialPlaceData}
          initialActionablePayments={initialActionablePayments}
        >
          {children}
          <HiddenPaymentModals />
        </DataProvider>
      </body>
    </html>
  );
}
