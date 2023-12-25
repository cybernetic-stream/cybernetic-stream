import Link from 'next/link';
import LayoutRect from './_components/layout-rect';
import ActionablePaymentsLinkTags from './_components/actionable-payments-link-tags';
import { db } from '../firestore.mjs';

export default async function Page() {
  const name = (
    await db.collection('place').doc(process.env.NEXT_PUBLIC_PLACE).get()
  ).data().name;

  const links = [
    { href: '/access', text: 'access' },
    { component: <ActionablePaymentsLinkTags /> },
    { href: '/payments', text: '...' },
  ];

  const header = (
    <>
      {name}
      <br />
      {links.map(({ href, text, component }, index) => (
        <div key={index}>
          {href && <Link href={href}>{text}</Link>}
          {component}
        </div>
      ))}
    </>
  );

  return <LayoutRect header={header} />;
}
