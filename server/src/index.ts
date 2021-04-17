import express from "express";
import mongoose from "mongoose";
import cors from "cors";
require("dotenv").config();

const mongoDBUrl = process.env.MONGO_DB_URL!;
const port = process.env.PORT || 3030;

const app = express();
app.use(cors());

mongoose.connect(mongoDBUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const clickSchema = new mongoose.Schema({
  email: String,
  timestamp: Date,
  link: String,
});

const Click = mongoose.model("Click", clickSchema);

const feedbackSchema = new mongoose.Schema({
  email: String,
  timestemp: Date,
  feedback: String,
});
const Feedback = mongoose.model("Feedback", feedbackSchema);

app.get("/:id/small-image.png", (req, res) => {
  console.log(req.params.id);
  res.sendFile("1x1-00ffff7f.png", { root: "assets" });
});

app.post("/:email/interested", async (req, res) => {
  const email = req.params.email;
  const newClick = new Click({
    email,
    timestamp: Date.now(),
    link: "interested",
  });

  await newClick.save();

  res.send();
});

app.post("/:email/cannot-attend", async (req, res) => {
  const email = req.params.email;
  const newClick = new Click({
    email,
    timestamp: Date.now(),
    link: "cannot-attend",
  });

  await newClick.save();

  res.send();
});

const jsonParser = express.json();

app.post("/:email/feedback", jsonParser, async (req, res) => {
  const email = req.params.email;
  const newClick = new Feedback({
    email,
    timestamp: Date.now(),
    feedback: req.body.feedback,
  });

  await newClick.save();

  res.send();
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  app.listen(port, () => console.log(`listening on ${port}`));
});
