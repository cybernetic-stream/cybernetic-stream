export default function namesAsKeys(payments) {
  const updatedPayments = {};

  for (let key in payments) {
    let payment = payments[key];
    let newName = payment.name.replace(/\d+/g, '');

    if (!(newName in updatedPayments)) {
      updatedPayments[newName] = payment;
    } else {
      updatedPayments[key] = payment;
    }
  }

  return updatedPayments;
}
