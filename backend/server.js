import express from 'express';
import cors from 'cors';
import { readFile, writeFile } from 'fs/promises';

const app = express();
app.use(cors());
app.use(express.json());

app.get("/comments", async (req, res) => {
  try {
    const data = await readFile("comments.json");
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/comments", async (req, res) => {
  try {
    const data = await readFile("comments.json");
    const comments = JSON.parse(data);
    comments.push(req.body);
    await writeFile("comments.json", JSON.stringify(comments));
    res.status(200).send("Comment added");
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(3000, () => console.log("Server running on port http://localhost:3000"));