const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const posts = [
  {
    id: 1,
    title: "پست ۱",
    body: "این اولین پست است.",
  },
  {
    id: 2,
    title: "پست ۲",
    body: "این دومین پست است.",
  },
  {
    id: 3,
    title: "پست ۳",
    body: "این سومین پست است.",
  },
  {
    id: 4,
    title: "پست ۴",
    body: "این چهارمین پست است.",
  },
];

app.get("/posts", (req, res) => {
  res.json(posts);
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
