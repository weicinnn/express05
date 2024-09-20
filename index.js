const express = require("express");
const { singers } = require("./singers.json");


const app = express();

console.log(singers);

app.get("/", (req, res) => {
  res.send("Pawer主頁")
})

app.get("/singer/:id.html", (req, res) => {
  const { id } = req.params;
  const result = singers.find(singer => {
    if (singer.id == id) {
      return true;
    }
  });
  if (!result) {
    res.send("<h1>Not found 404 - 找不到歌手</h1>>")
    return;
  }
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        img{
            width: 50%;
        }
    </style>
    <title>歌手：${result.singer_name}</title>
</head>
<body>
    <h1>${result.singer_name}</h1>
    <h3>${result.singer_id}</h3>
    <img src="${result.singer_img}" alt="">
</body>
</html>`)
})

app.all("*", (req, res) => {
  res.send("Not found 404")
})

app.listen(3000, () => {
  console.log("Server running for http://localhost:3000");
})