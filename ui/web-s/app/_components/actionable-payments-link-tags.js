'use client';
import { useContext } from 'react';
import Link from 'next/link';
import { ActionablePaymentsContext } from './data-provider';

export default function ActionablePaymentsLinkTags() {
  const actionablePayments = useContext(ActionablePaymentsContext);
  const keys = Object.keys(actionablePayments);

  return (
    <>
      {keys.map((key) => {
        return (
          <Link key={key} href={`/${key}`}>
            {key}
            <br />
          </Link>
        );
      })}
    </>
  );
}
