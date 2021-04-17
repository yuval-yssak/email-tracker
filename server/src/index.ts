import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // dependent on utc plugin
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("America/Nassau");

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
  timestamp: String,
  link: String,
});

const Click = mongoose.model("Click", clickSchema);

const feedbackSchema = new mongoose.Schema({
  email: String,
  timestamp: String,
  feedback: String,
});
const Feedback = mongoose.model("Feedback", feedbackSchema);

app.get("/:id/small-image.png", (req, res) => {
  console.log(req.params.id);
  res.sendFile("1x1-00ffff7f.png", { root: "assets" });
});

app.post("/:email/interested", async (req, res) => {
  const email = decodeURIComponent(
    Buffer.from(req.params.email, "base64").toString()
  );
  const newClick = new Click({
    email,
    timestamp: dayjs().format("YYYY-MM-DD HH:mm:ss.SSSZ"),
    link: "interested",
  });

  await newClick.save();

  res.send();
});

app.post("/:email/cannot-attend", async (req, res) => {
  const email = decodeURIComponent(
    Buffer.from(req.params.email, "base64").toString()
  );
  const newClick = new Click({
    email,
    timestamp: dayjs().format("YYYY-MM-DD HH:mm:ss.SSSZ"),
    link: "cannot-attend",
  });

  await newClick.save();

  res.send();
});

const jsonParser = express.json();

app.post("/:email/feedback", jsonParser, async (req, res) => {
  const email = decodeURIComponent(
    Buffer.from(req.params.email, "base64").toString()
  );
  const newClick = new Feedback({
    email,
    timestamp: dayjs().format("YYYY-MM-DD HH:mm:ss.SSSZ"),
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
