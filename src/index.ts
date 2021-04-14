import express from "express";
const app = express();

app.get("/:id/small-image.png", (req, res) => {
  console.log(req.params.id);
  res.sendFile("1x1-00ffff7f.png", { root: "assets" });
});

app.listen(3030, () => console.log("listening on 3030"));
