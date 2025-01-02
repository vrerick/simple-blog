import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3010;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

let data = [];

app.get("/", (req, res) => {
  res.render(__dirname + "/views/index.ejs", {
    homeActive: "active",
    editActive: "",
    newActive: "",
    aboutActive: "",
    data: data,
  });
});

app.get("/edit", (req, res) => {
  res.render("editOnClick.ejs", {
    homeActive: "",
    editActive: "active",
    newActive: "",
    aboutActive: "",
  });
});

app.post("/edit", (req, res) => {
  res.render("edit.ejs", {
    index: req.body.editIndex,
    data: data,
    homeActive: "",
    editActive: "active",
    newActive: "",
    aboutActive: "",
  });
});

app.post("/change", (req, res) => {
  data[req.body.editIndex] = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    createdAt: new Date().toLocaleString(),
  };
  res.redirect("/");
});

app.get("/new", (req, res) => {
  res.render("new.ejs", {
    homeActive: "",
    editActive: "",
    newActive: "active",
    aboutActive: "",
  });
});

app.get("/about", (req, res) => {
  res.render("about.ejs", {
    homeActive: "",
    editActive: "",
    newActive: "",
    aboutActive: "active",
  });
});

app.post("/submit", (req, res) => {
  data.push({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    createdAt: new Date().toLocaleString(),
  });
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  data.splice(req.body.deleteIndex, 1);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}. `);
});
