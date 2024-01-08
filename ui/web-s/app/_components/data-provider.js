'use client';
import { createContext, useEffect, useState } from 'react';
import namesAsKeys from '../_lib/namesAsKeys';

export const PlaceDataContext = createContext(null);
export const ActionablePaymentsContext = createContext(null);

export default function DataProvider({
  initialPlaceData,
  initialActionablePayments,
  children,
}) {
  const [placeData, setPlaceData] = useState(initialPlaceData);
  const [actionablePayments, setActionablePayments] = useState(
    initialActionablePayments
  );

  useEffect(() => {
    const initDbListeners = async () => {
      const firebaseConfig = {
        apiKey: 'AIzaSyAsxlVoVu08VZJpI2bzdYUruuQafQZyg3M',
        authDomain: 'projectid-x.firebaseapp.com',
        projectId: 'projectid-x',
        storageBucket: 'projectid-x.appspot.com',
        messagingSenderId: '211384317349',
        appId: '1:211384317349:web:d3d7253dd24942e695244c',
      };

      const { initializeApp } = await import('firebase/app');
      const app = initializeApp(firebaseConfig);
      const {
        getFirestore,
        onSnapshot,
        doc,
        query,
        collection,
        where,
        orderBy,
      } = await import('firebase/firestore');
      const db = getFirestore(app);

      onSnapshot(
        doc(db, 'Sublicense', process.env.NEXT_PUBLIC_SUBLICENSE),
        (snapshot) => setPlaceData(snapshot.data())
      );

      onSnapshot(
        query(
          collection(db, 'SublicensePayment'),
          where('Sublicense', '==', process.env.NEXT_PUBLIC_SUBLICENSE),
          where('status', 'in', ['requires_payment_method', 'requires_action']),
          orderBy('created', 'asc')
        ),
        (snapshot) => {
          const update = {};
          snapshot.docs.forEach((doc) => {
            update[doc.id] = doc.data();
            console.log(doc.id);
          });
          setActionablePayments(namesAsKeys(update));
        }
      );
    };

    initDbListeners().then(() =>
      console.log('sublicense Payment subset db listeners on')
    );
  }, []);

  return (
    <PlaceDataContext.Provider value={placeData}>
      <ActionablePaymentsContext.Provider value={actionablePayments}>
        {children}
      </ActionablePaymentsContext.Provider>
    </PlaceDataContext.Provider>
  );
}
