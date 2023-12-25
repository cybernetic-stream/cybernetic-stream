import { Client } from "undici";

export default async function encodeSegments(segments, filename, videoId) {
  return Promise.all(
    segments.map((segment, index) => {
      const client = new Client("http://encoder-service", {
        headersTimeout: 0,
        bodyTimeout: 0,
      });

      return client
        .request({
          path: "/",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            start: segment.start,
            end: segment.end,
            filename,
            videoId,
            index,
          }),
        })
        .then(async (response) => {
          const body = await response.body.json();
          client.close(); // Close the client after handling the response
          if (response.statusCode !== 200) {
            throw new Error("Encoder service error: " + JSON.stringify(body));
          }
          return body.filename;
        });
    }),
  );
}
