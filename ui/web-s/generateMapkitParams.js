import dotenv from 'dotenv';
import fs from 'fs';
import { db } from './firestore.js';

dotenv.config();
dotenv.config({ path: './.env.local.local', override: true });

async function main() {
  try {
    const placeData = {
      ...(
        await db
          .collection('Sublicense')
          .doc(process.env.NEXT_PUBLIC_SUBLICENSE)
          .get()
      ).data(),
      id: process.env.NEXT_PUBLIC_SUBLICENSE,
    };

    const scalar =
      placeData.id === '2300 9th Ave SW UNIT A5 Olympia, WA 98502' ? 0.925 : 1;

    const config = {
      lat: placeData.coordinates[0],
      lng: placeData.coordinates[1],
      unit: placeData.unit,
      latitudeDeltaDefault: 0.00050441895 * scalar,
      longitudeDeltaDefault: 0.00030487805 * scalar,
      latitudeDeltaNarrow: 0.000557951 * scalar,
      longitudeDeltaNarrow: 0.001209302 * scalar,
      latitudeDeltaShort: 0.00100884 * scalar,
      longitudeDeltaShort: 0.00060976 * scalar,
      latitudeOffsetShort: -0.00008 * scalar,
      longitudeOffsetWide: 0.0000475 * scalar,
      latitudeOffsetNarrow: -0.155 * scalar,
    };

    const filePath = 'public/map.js';

    fs.readFile(filePath, 'utf-8', (err, content) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }

      const lines = content.split('\n');
      lines.shift();
      const updatedContent = `const config = ${JSON.stringify(
        config
      )};\n${lines.join('\n')}`;

      fs.writeFile(filePath, updatedContent, (err) => {
        if (err) {
          console.error('Error writing file:', err);
        } else {
          console.log(
            `Successfully wrote to ${filePath} with config: ${JSON.stringify(
              config
            )}`
          );
        }
      });
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
