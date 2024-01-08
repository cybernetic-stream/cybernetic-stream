import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const x = {
  type: 'service_account',
  project_id: 'projectid-x',
  private_key_id: '400a1bfd0f51c64cf5e13361eeed5104cbb2752c',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCvvxgl1nSLyN6O\naP+Ky+GYZkd1b7oqwlXZ5M9qs+n4J2EjxXJhNCJd0QFCWAPndahSjAHAw7TY8roB\npUZsdFelUgCNjJCllNVZN7esc7z5vrznq2C5pPZGF5KgGoQ85wwjfC/GF0Qgthgh\n1sbu7J0c9Fxi/LmVws3QIjW2zASmgBU0XcBi4nTwpbp5ss2EaNbmpTVt4P0aHIIC\ntTh/xgiBKXNs57UzXcRK5V3c+4QcCEZtSAf9PBbSEGztq0KdnOFW6m2BzdlVuzjT\nHfthyrwmhcGsqvPTBD7RcAzxHaggadVbiGJfH/lTxfP5vdmFaMbzYJ5/0anHeecD\nwTitl0n5AgMBAAECggEAF5tAgBydTQVvN4vM/3TBWborUQ/v3rx50anVXozKGaYY\neziTU5EwKI/hbmrqI1X/hQ7/UUg4a4e3Cm+L1RePikpIfrrp1wP14GUGi+iD8rv3\nHds8Q9NvrRyPemf1aUTTsZSFykLnyMkM1sbFs+QeenwsSLOPrhkbkiB2PJaM7Vw/\n/eA14sHWFJsEVh5brGzGGUT5at4jqedIeKHJsC3g1fkHRe1GlCE5MRc5KeE68I8o\n2H0iTFl4bbQDkdry7JPQD+U+q8zujrSM0szxbdz7NNlQrH3NYcJvyhD/3n/OylJk\nTcs1VN+oE+OGO4+7PNhdBDq/fVUd/Vu+bk2+mgTpXQKBgQDYwbSPzNInsTuGLmfe\nEIV18H7R3ghdd95fmrAdk4cVgTL8DTVgQgYlsaEsIXfcAY+NRxn7Lx9db2LJx2Tq\nfobPNfn5nv/MT0mBCr1j78prwjtn///Rku+AKsMSKIdbQTF4d8uVhyOsqVudjJNi\nPJ6cFAmykP21HPm/3NgmQxwMPwKBgQDPkKM0vubHYAMGzrf3T5UE8q/sCymZQ4cH\nkSl55v6uBik0musroszdYBwzVDUG4m37Bx85k2eG5VOJVFLxVXmvB3SUiueS1l7F\nUwNhXDyYzvHBHwe7OqXuIC6nVe4d0KyjubrKOVlcLdgOgbK3XLFWGT8kOzwzpEGE\nwyhTazj7xwKBgDxB5VtQml+0cpLD1dYzC5cU63yWWAb76tLzIuCmAZil2TGezmbb\nE/BoqCCnkTWVLX4d9QgSOor0CyeDCffygrGaFMsjO4Nly05XWP0uTTyVu4QW89wk\nF/aubJpgr/hbcFBIJU2FSxKV5kUvLk3SAlnrbCK7EfzGeFuxHlnMsEBrAoGAN2Pg\nucWr7k6n4BwwKbY6DTz6R2JfMoA7u4A4ckh7dFM+kcQ5t8ZVJ0prnCL/l5u7P78R\nzRqSCQSPu1keXTqzI0s5CB7dV2kPl1bk0wl7PkgTabbvKD6pYxeBe7RJu/kg6Pw6\nZZbSSvAM9SoVWCtLQ6+vEusf0KQnu9ccns5BQacCgYAw/7wNG+RY+vZzhW1xnEJE\n1etz6FskcYhzfoLmQo2mHEWu5/nymkLJsmduXq7RjkZD+FcM8B6S76LRbKy5befA\nFdFoLMFTs1gYRcds10HD5GP56P9+oHQMba7gioRqvzgQOfJgHk7qHwtaBaAd62dN\niPatLPKQpSAB/atLwlFNpg==\n-----END PRIVATE KEY-----\n',
  client_email: 'service-account-name@projectid-x.iam.gserviceaccount.com',
  client_id: '103669381510870608507',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/service-account-name%40projectid-x.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com',
};

if (!getApps().length) {
  initializeApp({
    credential: cert(x),
  });
}
export const db = getFirestore();
