'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import LayoutRect from './layout-rect';
import { toNumberForm } from '../_lib/toNumberForm';
import { toDataGridRows } from '../_lib/toDataGridRows';
import { DataGridPremium } from '@mui/x-data-grid-premium';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import Box from '@mui/material/Box';
import { createTheme } from '@mui/material/styles';

export default function CyberneticStream({ initialRows }) {
  const [rows, setRows] = useState(initialRows);
  const firstListenerUpdate = useRef(true);

  useEffect(() => {
    const paymentsListener = async () => {
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
        query,
        collection,
        where,
        orderBy,
        getDocs,
      } = await import('firebase/firestore');
      const db = getFirestore(app);

      const unsubscribe = onSnapshot(
        query(
          collection(db, 'SublicensePayment'),
          where('sublicense', '==', process.env.NEXT_PUBLIC_SUBLICENSE),
          orderBy('created', 'desc')
        ),
        (snapshot) => {
          const update = {};
          snapshot.docs.forEach((doc) => {
            update[doc.id] = doc.data();
          });

          if (firstListenerUpdate.current) {
            const newRows = toDataGridRows(update);

            getDocs(
              query(
                collection(db, 'SublicensePayment'),
                where('Sublicense', '==', process.env.NEXT_PUBLIC_SUBLICENSE),
                orderBy('created', 'desc')
              )
            )
              .then((snapshot) => {
                let initialData = {};
                snapshot.docs.forEach(
                  (doc) => (initialData[doc.id] = doc.data())
                );
                const newRows = toDataGridRows(initialData);
                setRows(newRows);
                firstListenerUpdate.current = false;
              })
              .catch((error) => {
                console.error('Error getting documents: ', error);
              });
          } else {
            const newRows = toDataGridRows(update);
            setRows(newRows);
          }
        }
      );

      return () => unsubscribe();
    };

    paymentsListener().then(() => console.log('Payment db listener on'));
  }, []);

  return (
    <LayoutRect
      header={
        <>
          <Link href={'/'}> &lt;&lt; </Link>{' '}
        </>
      }
    >
      <ThemeProvider theme={DataGridTheme}>
        <Box
          sx={{
            maxHeight: 'calc(100% - 2rem)',
          }}
          className={'h-3/5 sm:h-1/2'}
        >
          <DataGridPremium
            disableRowSelectionOnClick
            disableColumnMenu
            hideFooter
            className=''
            density='compact'
            sx={{
              marginTop: '-1rem',
              borderStyle: 'none',
              height: '100%',
              width: '100%',
              '& .MuiDataGrid-columnHeaders, .MuiDataGrid-cell': {
                borderStyle: 'none',
              },
              '& .MuiButton-contained': {
                textTransform: 'lowercase',
              },
            }}
            columns={columns}
            rows={rows}
          />{' '}
        </Box>{' '}
      </ThemeProvider>{' '}
    </LayoutRect>
  );
}
export const columns = [
  {
    field: 'name',
    headerAlign: 'center',
    align: 'center',
    flex: 1,
    valueGetter: (x) =>
      x.value.replaceAll(String(new Date().getFullYear()).slice(-2), ''),
    sortable: false,
  },
  {
    field: 'amount',
    flex: 1,
    headerAlign: 'center',
    type: 'number',
    align: 'center',
    valueGetter: (x) => toNumberForm(x.value / 100),
    sortable: false,
  },
  {
    field: 'status',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    valueGetter: (x) => {
      if (
        x.value === 'requires_payment_method' ||
        x.value === 'requires_action'
      ) {
        return 'unlocked';
      } else {
        return x.value;
      }
    },
    sortable: false,
  },
];
export const DataGridTheme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ffffff',
    },
    background: {
      paper: '#000000',
      default: '#000000',
    },
  },
  typography: {
    fontFamily: 'var(--font-SFMonoRegular)',
  },
});

export function deepEqual(obj1, obj2) {
  if (obj1 === obj2) {
    // it's just the same object. No need to compare.
    return true;
  }

  // the number of properties should be the same
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }

  // the value of each property should be the same
  for (let prop in obj1) {
    if (!obj2.hasOwnProperty(prop)) {
      return false;
    }
    if (typeof obj1[prop] === 'object') {
      if (!deepEqual(obj1[prop], obj2[prop])) {
        // if properties are objects, do a deep comparison
        return false;
      }
    } else if (obj1[prop] !== obj2[prop]) {
      return false;
    }
  }
  return true;
}
