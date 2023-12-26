// import dotenv from "dotenv";
import Stripe from "stripe";
// dotenv.config()
// dotenv.config({path: '../.env.local', override: true})

const stripe = new Stripe(
  "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",
);

async function payment(placeId, amount, paymentName) {
  return await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    automatic_payment_methods: { enabled: true },
    metadata: {
      place: placeId,
      name: paymentName,
    },
    statement_descriptor: `${paymentName} ${placeId.toLowerCase()}`.substring(
      0,
      21,
    ),
  });
}

payment("18572 Cull Canyon Rd Castro Valley, CA 94552", 5000, "projects").then(
  (x) => console.log(x),
);
