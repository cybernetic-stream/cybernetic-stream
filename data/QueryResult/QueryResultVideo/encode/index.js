import express from "express";

import mp4 from "./mp4.js";

const app = express();

app.use(express.json());

app.post("/", async (req, res) => {
  const { start, end, filename, videoId, index } = req.body;

  console.log(start, end, filename, videoId, index);
  const mp4Filename = await mp4({ start, end, filename, videoId, index });
  res.send({ filename: mp4Filename });
});

app.listen(process.env.PORT, () => {
  console.log(`listening at port ${process.env.PORT}`);
});
