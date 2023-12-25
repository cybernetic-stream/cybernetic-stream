'use client';
import Link from 'next/link';
import LayoutRect from '../_components/layout-rect';

export default function Page() {
  return (
    <LayoutRect
      header={<Link href={'/'}>{`<< access: off`}</Link>}
    ></LayoutRect>
  );
}
