import Link from 'next/link';
import LayoutRect from './_components/layout-rect';
import ActionablePaymentsLinkTags from './_components/actionable-payments-link-tags';
import { db } from '../firestore.js';

export default async function Page() {
  const name = (
    await db
      .collection('Sublicense')
      .doc(process.env.NEXT_PUBLIC_SUBLICENSE)
      .get()
  ).data().name;

  const links = [
    { href: '/unlock', text: 'unlock' },
    { href: '/lock', text: 'lock' },
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
