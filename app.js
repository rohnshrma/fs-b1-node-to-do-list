// Import the "express" framework to build a web application.
import express from "express";

// Import the "body-parser" middleware to parse incoming request bodies.
import bodyParser from "body-parser";

// Create an Express application instance.
const app = express();

// Define the port number on which the server will listen for requests.
const port = 3000;

// Initialize an empty array to store to-do list items.
var items = [];

// Middleware setup

// Serve static files (like CSS, JS, images) from the "public" directory.
app.use(express.static("public"));

// Use "body-parser" to parse URL-encoded form data in HTTP POST requests.
app.use(bodyParser.urlencoded({ extended: true }));

// Set the view engine to "ejs" for rendering dynamic HTML templates.
app.set("view engine", "ejs");

// Route definitions

// Define the root ("/") route with both GET and POST handlers.
app
  .route("/")
  // Handle GET requests to the root route.
  .get(function (req, res) {
    // Render the "index" EJS template and pass dynamic data like title, heading, and items.
    res.render("index", {
      title: new Date().toLocaleDateString(), // Today's date as the title.
      heading: "To Do List", // Page heading.
      items: items.length > 0 ? items : "No Items Found", // Display items or a fallback message if no items exist.
    });
  })
  // Handle POST requests to the root route.
  .post(function (req, res) {
    // Add the new item (from the form submission) to the "items" array.
    items.push(req.body.itemName);

    // Log the current items for debugging purposes.
    console.log("Items =>", items);

    // Redirect the user back to the root route after adding the item.
    res.redirect("/");
  });

// Define a route for deleting items by their index in the "items" array.
app.route("/delete/:id").get(function (req, res) {
  // Retrieve the "id" parameter from the request URL and convert it to an integer.
  var id = parseInt(req.params.id);

  // Filter the "items" array to exclude the item at the specified index.
  items = items.filter(function (item, index) {
    console.log(index, id, index !== id); // Log the comparison for debugging.
    return index !== id; // Keep all items except the one with the matching index.
  });

  // Redirect the user back to the root route after deletion.
  res.redirect("/");
});

// Start the server and listen for incoming requests on the specified port.
app.listen(port, function () {
  // Log a message to indicate that the server has started.
  console.log("Server started on port:", 3000);
});
