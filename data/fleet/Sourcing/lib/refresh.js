import searchResults from "./searchResults.js";
import parse from "./parse.js";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import listingImages from "./listingImages.js";
import listing from "./listing.js";


const credential = cert({
  "type": "service_account",
  "project_id": "projectid-x",
  "private_key_id": "2a5cd894976f0efb34767be11009e92d90903015",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC2mlsvMlEiOtuZ\nh86v65GOmRPKdQLg2nFRXlH4dr5Y7Zs5PaTbWvYR7gzb/HCA8Q6nv4vmvCComlgS\nr+Ow0hzvod5xVmJXhbUlHn50jQCRG0786ovnPRR/knfs7Ce7TCW/nQADJBwiZ/wM\nV1bZASITlZHpKqVIf1VUyeP2/4hi7zQyhBa1iYHNZaj+7OvW6OhkXPqZFZW4E0+B\n3ULq0Dakw0m04haG7g6RQsUc0FbG9se/pAw93ePGnyRqusq5KySM54bdykUDZKrA\nBmi8nFva6illHpXu2PP+Rf7d9LGP2phia+TToowYC2EN5gbAYRj+Qb6uO18nXlXh\nDooMU0/7AgMBAAECggEAP+T7CyS8JxIZTTusIvp20ELYHfubqjpFdIdgf2RtboiV\nzA255deKSvPVJBTM+RFgY2ou9enWM6juMHvDXFfpMCCfyWDEwINUw0xMS1QbYqr/\nlJgtpBhHV+xUcl6f+HXIr6esHW1BOvjPxTG6fexblCa+C6yUcS29GhIa5o67loIt\nK4oB0APTsuPYW590lyxEH8GHGXtKGP2evezktgjf8Pgi5z55OU9a3pwiPn67RwVL\ntxwIn4Z3KI64Js+GY7WOz1mF6jq1H2qZaKMBRq7397ddyC+UNaVcvmuCdWeZLCWZ\npaLqf2BhFmYJ7vTOV9vrU+vQN9KsGjhuQ2eFUxpuAQKBgQDpgnNV3IEZ2FHF27+C\nkGpfuaKb4BwQ3WW8XVIFAuQ7OiC+NpydsE4Qq3vuQDHzZcoOdywUXJ/6i5jwUx70\ngW+6F1OlRk4AlakwjXQ+YYV0i7TNXFwVbDk2BTgN2wD/xktokQ8DXfVu5v9R1yHT\nRLq80DNi63m8oRoPxMLfEyQ5wQKBgQDIMLjcEGKcIJNWZQs0PfSyD4mqYIiYJDnV\n0N3pQR9P1hIuQ1uSBogwd+Ua4oCKKgVabxjQaS2VHSFBeKUcguKMkIt44aX7LDp2\noj7R95khBElv3ZB8QSTfdzLQzlOr2eqSsJSm2S1mK2LF+H0Nm/QzXj9AtGPoTu9K\n2H3C4OUguwKBgQCVF0l0pNl5Gvj7D5dzUanZfLkqNSk2S2XNovffYz0945tMV6of\ntJXjZto2AJ7j/TXJjqWCSrGKUt9PcoLtMkeX1ZT+jaj4DpZ7/ZUezz1acGj8ReA1\nfWf56dMkZZR5uq4jEZs4VyGBsdOK+YULU3K3Y2er3RVZLrNpJgQWUi5rAQKBgGFs\nhKpkNvkwSUPkTL2R4UG+mgqWjCMujg7mZPidPrXFwndNRIUeNK0RzCd3T4LtzEkk\ng/j5FrvYv1RzeDcV41bxCU880WAZOCJ/9v6L9rPAuFR+iVBPC7jM86f2oXWiyau1\nz8IbMyLjvmAF/CXhXciZ90JwB6cIsx/DmAB9HkT9AoGBAOYx3qJrwE4TEUbqvifS\nuxMLTnp/50EYp6T/E2g60frhIJVKDA781KCsCTRlOTkegMO69PJg0wsgeZsOySTx\nQTDoQAVsXnhC8mlqf5WkM/SNiI2p1N1ekH0B37SgU5mrap52DQADPU28qLMPuEvu\nbky2naAJ3I0EfdC7trXy+vgl\n-----END PRIVATE KEY-----\n",
  "client_email": "service-account-name@projectid-x.iam.gserviceaccount.com",
  "client_id": "103669381510870608507",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/service-account-name%40projectid-x.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
})

initializeApp({
  credential,
});

const db = getFirestore();

export default async function refresh(query) {
  const res = await parse(await searchResults(query));

  for (const unit of res) {
    const images = await listingImages(await listing(unit.source_id));

    await db
      .collection("FleetSourcing")
      .doc(unit.vin)
      .set(
        {
          ...unit,
          query,
          as_of: Timestamp.now(),
          status: "active",
          images,
        },
        {
          merge: true,
        },
      );
  }

  const found_vins = res.map((elem) => elem.vin);
  const batchSize = 10;
  for (let i = 0; i < found_vins.length; i += batchSize) {
    const batch = found_vins.slice(i, i + batchSize);
    const batchQuery = db
      .collection("FleetSourcing")
      .where("status", "==", "active")
      .where('query', '==', query)
      .where("vin", "not-in", batch);

    const querySnapshot = await batchQuery.get();

    querySnapshot.forEach(async (doc) => {
      await db
        .collection("FleetSourcing")
        .doc(doc.id)
        .update({ status: "inactive" }, { merge: true });
    });
    
  }
}
