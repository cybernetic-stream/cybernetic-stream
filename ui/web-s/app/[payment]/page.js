import RootPage from '../page';
import ShowPaymentModal from '../_components/PaymentModal/show-payment-modal';
import namesAsKeys from '../_lib/namesAsKeys';
import { db } from '../../firestore.mjs';

export async function generateStaticParams() {
  const initialActionablePaymentsSnapshot = await db
    .collection('payment')
    .where('place', '==', process.env.NEXT_PUBLIC_PLACE)
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

  return Object.keys(initialActionablePaymentsSnapshot).map((key) => ({
    payment: key,
  }));
}
export default function Page({ params }) {
  return (
    <>
      <ShowPaymentModal paymentID={params.payment} />
      <RootPage />
    </>
  );
}
