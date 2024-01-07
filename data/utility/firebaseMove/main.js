import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const app = initializeApp(
  {
    credential: cert({
      type: "service_account",
      project_id: "projectname-o",
      private_key_id: "2a9be63d9e2984b73b0f26ee97954f607026f469",
      private_key:
        "-----BEGIN PRIVATE KEY-----\nMIIEugIBADANBgkqhkiG9w0BAQEFAASCBKQwggSgAgEAAoIBAQCHhbr2q5FDPkgt\nY8JQ84L0rkVw52v4+ruYWqwoBgjYlrCtwpIXLtA/7/rLpP+69b7Tr725CYZpogVz\nSGaAwqfQpMKbOZD6IjeEBnz9ywjWYfSP0gSetP7ygj/eQSXVb4fS/ovIVbX/xCuw\nYgeOE8omqIp1m4Q9uGo4DO42vm5IicfMcYDT76Q9AlKJtsMM27LzTgUVeV3/92Lv\nyGfKehXMyWpxB0Uy+7PnHKF1rPicjmQzL9kLaxVa2qGyVv5EPYOYCePtesodEdCw\nRAdVAr94N5uQ0CRW406iAzi3rligZYMyKw4u564VJ9xSmF78VMkpa9lvf/cgBdE0\nW5PsZKRTAgMBAAECggEAKX+FtKrsnE6iA2QcyHUIkKwcj2oN4fvFHe4F8WuHoeri\nxxJhcb/f/PQbM+iedj1x5ZhW3CZShl4alSaCXMM+Z+FLxgRmpHF91mu2MnDNj/gG\nz1NcHs0FlHTV4dTJJQY17SIM45d7V4pWZnheH99nc1cAruqkH9IslGVBPHorgwJb\nmbDrTPTqf1CVIA4PYDwRe/njCETnDgulcTk3Q20mvzTmbuQl68dCmK10xk/dPgsR\njbp1iwP5WC9u3lYFcRSEIdQhCoc51eeVR8Lm8tfGVMTMgMLv8520/mOnKF1dj4jg\neqcvwjlNNOkWkHf1QpM0/5B9nmeYRlFyHYHdB9LXgQKBgQC9TFyrgtauJT54f7Ep\n1/Kiy/FPjb0Jp97A39Pu+fO+ylTwDwY58tRujNADPiQmF7gWwasEKzv8YxR8moKD\nSvTckse2aZd/HGoenIVwBkEdVfZjTAX0YglnhBfUq1aIY1mWPrP9cEh+ts6CuJ3r\ndHv+PYtfigiXb/7UOxJt4BBTAwKBgQC3RoRQREl+lfcgs+ZGg7PSDc5Oh/3bK2nf\nsPXyC5uxOEre20/rqodS0xQP6C4aVwLnoqhA1DlzibMs05ihDQ6erF3zXLIzafSn\na8NNTARpfMlxwXRnFWKLRJbfBZnRMkzHtSp+sFIka7BOTgTJoY7pZl9dLrmSb0Cx\nkegDRxAAcQKBgCuzp2lJKXrGymdTQ3lfi3qeDrXJCS1jff+VLP5s4iLX30gUj+Fs\n+DIVfChjfkD1FODcETlDKfQYg7BIk3zwHxuVH1ozgnAsBSvQAtZb+0hkgh9me7Fx\nuK4XRtEoRS/zj8kp7K/D7liip4ZyTLMBD2cgmj6SRW2Aw5oHkTeglOQ1An8LdFzQ\np3PwdW78nEHIJnMWrcY3Iki7afsz/9tfRVp1uQ703sAf+oh6pLacR+aZvtZvo7rg\nUmNE1VZddtwTNL21LRCyJRj+HaEs1Y9fRWEBNstgULb1umBuU9saFT+H05z43lnJ\nkTuRCyn5uuaRs4c7DyrmqATxIgLpFjVp/wcBAoGAaBFiuNPMV0rtbJ+m5JeYLkQY\nbWhzKqMKq+sTl0x0bYNBbjGWodE2szyRneeAEv+Royt8rBunFkJ08wKAuNiX7VAT\nZoK5Sme+501JlSlgCVMxvz2iflJCxHFtxekAxdY03qij6ZBrGDJ0aEKIxLcRbP+g\ns6GR5mELP9zEsz0T1kM=\n-----END PRIVATE KEY-----\n",
      client_email:
        "firebase-adminsdk-hoptm@projectname-o.iam.gserviceaccount.com",
      client_id: "105263168589833665130",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-hoptm%40projectname-o.iam.gserviceaccount.com",
      universe_domain: "googleapis.com",
    }),
  },
  "defaultApp",
);

const db = getFirestore(app);

const toApp = initializeApp(
  {
    credential: cert({
      type: "service_account",
      project_id: "projectid-x",
      private_key_id: "400a1bfd0f51c64cf5e13361eeed5104cbb2752c",
      private_key:
        "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCvvxgl1nSLyN6O\naP+Ky+GYZkd1b7oqwlXZ5M9qs+n4J2EjxXJhNCJd0QFCWAPndahSjAHAw7TY8roB\npUZsdFelUgCNjJCllNVZN7esc7z5vrznq2C5pPZGF5KgGoQ85wwjfC/GF0Qgthgh\n1sbu7J0c9Fxi/LmVws3QIjW2zASmgBU0XcBi4nTwpbp5ss2EaNbmpTVt4P0aHIIC\ntTh/xgiBKXNs57UzXcRK5V3c+4QcCEZtSAf9PBbSEGztq0KdnOFW6m2BzdlVuzjT\nHfthyrwmhcGsqvPTBD7RcAzxHaggadVbiGJfH/lTxfP5vdmFaMbzYJ5/0anHeecD\nwTitl0n5AgMBAAECggEAF5tAgBydTQVvN4vM/3TBWborUQ/v3rx50anVXozKGaYY\neziTU5EwKI/hbmrqI1X/hQ7/UUg4a4e3Cm+L1RePikpIfrrp1wP14GUGi+iD8rv3\nHds8Q9NvrRyPemf1aUTTsZSFykLnyMkM1sbFs+QeenwsSLOPrhkbkiB2PJaM7Vw/\n/eA14sHWFJsEVh5brGzGGUT5at4jqedIeKHJsC3g1fkHRe1GlCE5MRc5KeE68I8o\n2H0iTFl4bbQDkdry7JPQD+U+q8zujrSM0szxbdz7NNlQrH3NYcJvyhD/3n/OylJk\nTcs1VN+oE+OGO4+7PNhdBDq/fVUd/Vu+bk2+mgTpXQKBgQDYwbSPzNInsTuGLmfe\nEIV18H7R3ghdd95fmrAdk4cVgTL8DTVgQgYlsaEsIXfcAY+NRxn7Lx9db2LJx2Tq\nfobPNfn5nv/MT0mBCr1j78prwjtn///Rku+AKsMSKIdbQTF4d8uVhyOsqVudjJNi\nPJ6cFAmykP21HPm/3NgmQxwMPwKBgQDPkKM0vubHYAMGzrf3T5UE8q/sCymZQ4cH\nkSl55v6uBik0musroszdYBwzVDUG4m37Bx85k2eG5VOJVFLxVXmvB3SUiueS1l7F\nUwNhXDyYzvHBHwe7OqXuIC6nVe4d0KyjubrKOVlcLdgOgbK3XLFWGT8kOzwzpEGE\nwyhTazj7xwKBgDxB5VtQml+0cpLD1dYzC5cU63yWWAb76tLzIuCmAZil2TGezmbb\nE/BoqCCnkTWVLX4d9QgSOor0CyeDCffygrGaFMsjO4Nly05XWP0uTTyVu4QW89wk\nF/aubJpgr/hbcFBIJU2FSxKV5kUvLk3SAlnrbCK7EfzGeFuxHlnMsEBrAoGAN2Pg\nucWr7k6n4BwwKbY6DTz6R2JfMoA7u4A4ckh7dFM+kcQ5t8ZVJ0prnCL/l5u7P78R\nzRqSCQSPu1keXTqzI0s5CB7dV2kPl1bk0wl7PkgTabbvKD6pYxeBe7RJu/kg6Pw6\nZZbSSvAM9SoVWCtLQ6+vEusf0KQnu9ccns5BQacCgYAw/7wNG+RY+vZzhW1xnEJE\n1etz6FskcYhzfoLmQo2mHEWu5/nymkLJsmduXq7RjkZD+FcM8B6S76LRbKy5befA\nFdFoLMFTs1gYRcds10HD5GP56P9+oHQMba7gioRqvzgQOfJgHk7qHwtaBaAd62dN\niPatLPKQpSAB/atLwlFNpg==\n-----END PRIVATE KEY-----\n",
      client_email: "service-account-name@projectid-x.iam.gserviceaccount.com",
      client_id: "103669381510870608507",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/service-account-name%40projectid-x.iam.gserviceaccount.com",
      universe_domain: "googleapis.com",
    }),
  },
  "secondaryApp",
);

const toDb = getFirestore(toApp);
export async function transferCollection(fromColRef, toColRef = null) {
  const returnObject = {};
  (await fromColRef.get()).forEach((elem) => {
    if (toColRef) {
      const update = { ...elem.data(), Sublicense: elem.data().place };
      delete update.place;
      toColRef.doc(elem.id).set(update);
      console.log("set " + elem.id);
    }
    returnObject[elem.id] = { ...elem.data(), Sublicense: elem.data().place };
    delete returnObject.place;
  });
  return returnObject;
}

transferCollection(
  db.collection("Payment"),
  toDb.collection("SublicensePayment"),
).then((res) => {
  console.log(res);
});
