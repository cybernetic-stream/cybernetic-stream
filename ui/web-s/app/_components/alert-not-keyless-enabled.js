'use client';
import { useEffect, useState } from 'react';

export default function AlertNotKeylessEnabled() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!shown) {
      alert('not yet keyless enabled');
      setShown(true);
    }
  }, []);

  return <></>;
}
