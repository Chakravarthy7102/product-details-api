const ProductsModel = require("../models/ProductsModel");

//controllers
//testing route
const getAllProductsStatic = async (req, res) => {
  const body = await ProductsModel.find({
    company: "liddy",
  });
  res.status(200).json({ noResult: body.length, body: { body } });
};

const getAllProducts = async (req, res) => {
  //making sure that the query params are only ones that are present in database not
  //any random params..
  const { featured, company, name } = req.query;
  //creating new params object that will pass in the valid params into the find
  const queryObject = {};
  //checking for the value of featured and setting it into the query object JMS
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  //checking for the valid company
  if (company) {
    queryObject.company = company;
  }
  //ckecking for the name
  if (name) {
    //{ $regex: name, $options: "i" } helps in filtering the matching pattern thats
    //entered by the user...for more info
    //https://docs.mongodb.com/manual/reference/operator/query/regex/
    queryObject.name = { $regex: name, $options: "i" };
  }
  console.log(queryObject);
  const body = await ProductsModel.find(queryObject);
  res.status(200).json({ body, noHits: body.length });
};

module.exports = { getAllProducts, getAllProductsStatic };
