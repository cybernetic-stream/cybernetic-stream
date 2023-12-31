import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { writeFile } from "fs/promises";
import { promises as fsPromises } from "fs";
import { join } from "path";

const app = initializeApp({
  apiKey: "AIzaSyAsxlVoVu08VZJpI2bzdYUruuQafQZyg3M",
  authDomain: "projectid-x.firebaseapp.com",
  projectId: "projectid-x",
  storageBucket: "projectid-x.appspot.com",
  messagingSenderId: "211384317349",
  appId: "1:211384317349:web:d3d7253dd24942e695244c",
});

const db = getFirestore(app);

async function main() {
  const querySnapshot = await getDocs(collection(db, "Sublicense"));

  const writes = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const sublicense = doc.data();
      const filename = `../ui-web-s-${doc.id
        .replaceAll(" ", "-")
        .toLowerCase()}.yaml`;

      const content = `name: ui-web-s ${doc.id}
on:
  push:
    branches:
      - main
    paths:
      - "ui/web-s/**"

jobs:
  deploy:
    runs-on: ubuntu-latest
    env:
      NEXT_PUBLIC_SUBLICENSE: ${doc.id}
    defaults:
      run:
        working-directory:  web-s-${doc.id
          .replaceAll(" ", "-")
          .replaceAll(",", "")
          .toLowerCase()}
    steps:
      - name: Checkout
        uses: actions/checkout@v3


      - name: Rename directory
        run: mv ui/web-s web-s-${doc.id
          .replaceAll(" ", "-")
          .replaceAll(",", "")
          .toLowerCase()}
        working-directory: \${{ github.workspace }}

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '21'

      - name: Install dependencies
        run: npm install

      - name: Vercel Project Settings
        run: vercel pull --yes --scope teamname-x --environment=production --token \${{ secrets.VERCEL_TOKEN }}

      - name: Vercel Build
        run: npx vercel build --prod --token \${{ secrets.VERCEL_TOKEN }}
        env:
          BASE64_GCP_SERVICE_ACCOUNT: \${{ secrets.BASE64_GCP_SERVICE_ACCOUNT }}

      - name: Vercel Deploy
        run: npx vercel deploy --prebuilt --token \${{ secrets.VERCEL_TOKEN }} --prod
        env:
          BASE64_GCP_SERVICE_ACCOUNT: \${{ secrets.BASE64_GCP_SERVICE_ACCOUNT }}
`;

      await writeFile(filename, content, "utf8");
      console.log(`Created file: ${filename}`);
      return "succeeded";
    }),
  );

  console.log(writes);
}

async function deleteZPrefixedFiles(directory = "../") {
  try {
    const files = await fsPromises.readdir(directory);
    const zPrefixedFiles = files.filter((file) => file.startsWith("ui-web-s"));

    for (const file of zPrefixedFiles) {
      await fsPromises.unlink(join(directory, file));
      console.log(`Deleted file: ${file}`);
    }
  } catch (error) {
    console.error("Error deleting files:", error);
    throw error;
  }
}

deleteZPrefixedFiles().then(() => {
  main().then(() => process.exit(0));
});
