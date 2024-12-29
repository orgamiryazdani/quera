const fs = require("fs");
const cors = require("cors");

const express = require("express");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const techList = JSON.parse(
  fs.readFileSync("./server/techs.json", { encoding: "utf8" })
);

app.get("/", (req, res) => {
  const matchedTechs = techList.filter((tech) => {
    return tech.name.includes(req.query.search);
  });

  res.status(200).json({
    status: "success",
    data: { matchedTechs },
  });
});

app.patch("/posts", (req, res) => {
  const postList = JSON.parse(fs.readFileSync("./server/posts.json"));
  const randNum = Math.floor(Math.random() * 10);
  setTimeout(() => {
    if (randNum % 2 === 0) {
      postList.forEach((post) => {
        if (post.id === 0) post.rate = req.body.rate;
        fs.writeFile("./server/posts.json", JSON.stringify(postList), () => {
          res.status(200).json({
            status: "success",
            message: "Your rate for this post has been registered.",
          });
        });
      });
    } else {
      res.status(500).json({
        status: "error",
        message: "Rating registering failed, try again.",
        rate: postList[0].rate,
      });
    }
  }, 2000);
});

app.listen(8000, () => console.log("Server Running..."));
