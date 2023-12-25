'use client';
import Link from 'next/link';
import { useContext } from 'react';
import { PlaceDataContext } from '../_components/data-provider';
import LayoutRect from '../_components/layout-rect';

export default function Page() {
  const placeData = useContext(PlaceDataContext);

  return (
    <LayoutRect
      header={
        <Link href={'/'}>
          {`<< autopay: ${placeData['autopay'] ? 'on' : 'off'}`}
        </Link>
      }
    ></LayoutRect>
  );
}
