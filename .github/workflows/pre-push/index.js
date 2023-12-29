import {initializeApp} from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import {writeFile} from 'fs/promises';
import { promises as fsPromises } from 'fs';
import { join } from 'path';

const app = initializeApp({
    apiKey: "AIzaSyAsxlVoVu08VZJpI2bzdYUruuQafQZyg3M",
    authDomain: "projectid-x.firebaseapp.com",
    projectId: "projectid-x",
    storageBucket: "projectid-x.appspot.com",
    messagingSenderId: "211384317349",
    appId: "1:211384317349:web:d3d7253dd24942e695244c"
});

const db = getFirestore(app);

async function main() {
    const querySnapshot = await getDocs(collection(db, 'Sublicense'));

    const writes = await Promise.all(querySnapshot.docs.map(async (doc) => {
        const sublicense = doc.data();
        const filename = `../z-deploy-build-web-s-${doc.id.replaceAll(' ', '-')}.yaml`;

        const content = `name: Z build deploy ${doc.id}

on: [push]

jobs:
  publish:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ui/web-s
    permissions:
      contents: read
      deployments: write
    name: Publish to Cloudflare Pages
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '21' 

      - name: Install dependencies
        run: npm install

      - name: Build
        env:
          NEXT_PUBLIC_SUBLICENSE: ${doc.id}
        run: npx @cloudflare/next-on-pages@1

      - name: Publish to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: \${{ secrets.WORKERS_API_TOKEN }}
          accountId: 6ce4136310d824f1913793767b70aad8
          projectName: web-s-${doc.id.replaceAll(' ', '-')}
          directory: ui/web-s/.vercel
          gitHubToken: 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
          branch: main
          wranglerVersion: '3'
`;

        await writeFile(filename, content, 'utf8');
        console.log(`Created file: ${filename}`);
        return 'succeeded';
    }));

    console.log(writes);
}

async function deleteZPrefixedFiles(directory = '../') {
  try {
    const files = await fsPromises.readdir(directory);
    const zPrefixedFiles = files.filter(file => file.startsWith('z-'));

    for (const file of zPrefixedFiles) {
      await fsPromises.unlink(join(directory, file));
      console.log(`Deleted file: ${file}`);
    }
  } catch (error) {
    console.error('Error deleting files:', error);
    throw error;
  }
}

deleteZPrefixedFiles().then(() => {
  main().then(() => process.exit(0));
})
