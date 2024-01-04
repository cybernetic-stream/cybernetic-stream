import CyberneticStream from '../_components/cybernetic-stream';
import { toDataGridRows } from '../_lib/toDataGridRows';
import { db } from '../../firestore.js';

export default async function Page() {
  const initialPaymentsSnapshot = await db
    .collection('SublicensePayment')
    .where('Sublicense', '==', process.env.NEXT_PUBLIC_SUBLICENSE)
    .where('status', 'in', ['requires_payment_method', 'requires_action'])
    .orderBy('created', 'desc')
    .get();
  let initialPayments = {};
  initialPaymentsSnapshot.forEach((doc) => {
    initialPayments[doc.id] = {
      ...doc.data(),
      created: new Date(doc.data().created.seconds * 1000),
    };
  });

  return (
    <>
      <CyberneticStream initialRows={toDataGridRows(initialPayments)} />
    </>
  );
}


