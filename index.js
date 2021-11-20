const express = require("express");
const app = express();
const productRoutes = require("./routes/productRoutes");
require("dotenv").config();
//instead of using the try catch blocks we can utilize this cool package...
require("express-async-errors");

const error404 = require("./middlewares/404");
const errorHandler = require("./middlewares/error-handler");
const connectDB = require("./db/connectdb");

const PORT = process.env.PORT || process.env.PORT_THIS;
//json middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send(
    '<h1 ><a href="/api/v1/products">Hello click here to navigate</a></h2>'
  );
});

//app routes
app.use("/api/v1/products", productRoutes);

//for 404 errors and custom errors... keep this 404 fucker at last of middleware !!!!
app.use(error404);
app.use(errorHandler);

const start = () => {
  try {
    //connect DB
    connectDB();
    app.listen(PORT, () => {
      console.log("listening at port number 3000");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
