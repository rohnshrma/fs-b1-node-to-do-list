import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var items = [];

// middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// console.log(process.cwd() + "/pages/index.html");

// routes
// "/" : home / root route

app
  .route("/")
  .get(function (req, res) {
    // res.sendFile(`${process.cwd()}/pages/index.html`);
    res.render("index", {
      title: new Date().toLocaleDateString(),
      heading: "To Do List",
      items: items.length > 0 ? items : "No Items Found",
    });
  })
  .post(function (req, res) {
    items.push(req.body.itemName);
    console.log("Items =>", items);
    res.redirect("/");
  });

app.route("/delete/:id").get(function (req, res) {
  var id = parseInt(req.params.id);
  items = items.filter(function (item, index) {
    console.log(index, id, index !== id);
    return index !== id;
  });
  res.redirect("/");
});

// server setup
app.listen(port, function () {
  console.log("Server started on port:", 3000);
});
