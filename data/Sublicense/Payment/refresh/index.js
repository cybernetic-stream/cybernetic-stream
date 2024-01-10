import express from 'express';
import bodyParser from 'body-parser';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import Stripe from 'stripe';
import { defineSecret } from 'firebase-functions/params';

initializeApp({
    credential: applicationDefault(),
});

const db = getFirestore();
const stripe = new Stripe(defineSecret('STRIPE_SECRET_KEY').value());

const app = express();
app.use(bodyParser.json());


app.post()

app.post('/refresh', async (req, res) => {
    const {sublicense} = req.body;
    const data = await refresh(sublicense)
    res.json(data)
})

app.post('/process-payment', async (req, res) => {
    try {
        const { place } = req.body;

        const placeData = (await db.collection('place').doc(place).get()).data();
        if (placeData.price > 0 && placeData.start) {
            const paymentsSnapshot = await db.collection('payment')
                .where('place', '==', place)
                .get();

            let end = new Date(new Date().getTime() - placeData.timing * 24 * 60 * 60 * 1000);

            if (placeData.end) {
                if (placeData.end.toDate() < end) {
                    end = placeData.end.toDate();
                }
            }

            const calculatedPayments = getMonthsBetweenDates(placeData.start.toDate(), end);
            const actualPayments = [];

            paymentsSnapshot.docs.map((doc) => {
                if (isValidFormat(doc.data().name)) {
                    actualPayments.push(doc.data().name);
                }
            });

            const missingPayments = calculatedPayments.filter((payment) => !actualPayments.includes(payment));
            const extraPayments = actualPayments.filter((payment) => !calculatedPayments.includes(payment));

            const createdPromises = missingPayments.map((name) => stripe.paymentIntents.create({
                amount: placeData.price * 100,
                currency: 'usd',
                automatic_payment_methods: { enabled: true },
                metadata: { place: place, name: name },
                statement_descriptor: `${name} ${placeData.name.toLowerCase()}`.substring(0, 21),
            }));
            const created = await Promise.all(createdPromises);

            const canceledPromises = extraPayments.map(async (name) => {
                const colSnapshot = await db.collection('payment')
                    .where('place', '==', place)
                    .where('name', '==', name)
                    .get();
                return colSnapshot.docs.map((doc) => stripe.paymentIntents.cancel(doc.id));
            });
            const canceled = await Promise.all(canceledPromises.flat());

            console.log(created.map((x) => JSON.stringify(x)));
            console.log(canceled.map((x) => JSON.stringify(x)));
        } else {
            console.log(place + ' does not have price or start');
        }

        console.log('done');
        res.status(200).send({ message: 'Payment processing completed' });
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

function getMonthsBetweenDates(startDate, endDate) {
    const monthArray = [];
    const cursorDate = new Date(startDate);

    while (cursorDate <= endDate) {
        const monthString = getMonthString(cursorDate) + cursorDate.getFullYear().toString().slice(-2);

        if (!monthArray.includes(monthString)) {
            monthArray.push(monthString);
        }
        cursorDate.setDate(cursorDate.getDate() + 1);
    }

    return monthArray;
}

function getMonthString(date) {
    const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    return monthNames[date.getMonth()];
}

function isValidFormat(str) {
    const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    if (str.length !== 5) return false;

    const monthPart = str.substring(0, 3);
    const yearPart = str.substring(3);

    if (!monthNames.includes(monthPart)) return false;

    return /^\d{2}$/.test(yearPart);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
