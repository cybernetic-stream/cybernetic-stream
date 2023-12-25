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
        apiKey: 'AIzaSyAYeaFR2_91kcRKNLy1okBcSGlMcu1F3tE',
        authDomain: 'projectname-o.firebaseapp.com',
        projectId: 'projectname-o',
        storageBucket: 'projectname-o.appspot.com',
        messagingSenderId: '131875772321',
        appId: '1:131875772321:web:7565dbe934f82dfe715de0',
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

      onSnapshot(doc(db, 'place', process.env.NEXT_PUBLIC_PLACE), (snapshot) =>
        setPlaceData(snapshot.data())
      );

      onSnapshot(
        query(
          collection(db, 'payment'),
          where('place', '==', process.env.NEXT_PUBLIC_PLACE),
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
