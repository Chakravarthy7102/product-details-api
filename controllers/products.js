const ProductsModel = require("../models/ProductsModel");

//controllers
//testing route
const getAllProductsStatic = async (req, res) => {
  const body = await ProductsModel.find().sort("-name");
  res.status(200).json({ noResult: body.length, body: { body } });
};

const getAllProducts = async (req, res) => {
  //making sure that the query params are only ones that are present in database not
  //any random params..
  const { featured, company, name, sort } = req.query;
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
  //removing the await because of addition chainning of the sort params
  let body = ProductsModel.find(queryObject);
  //implement the sorting of the data
  //line 51
  if (sort) {
    const sortList = sort.split(",").join(" ");
    body = await body.sort(sortList);
    console.log(sortList);
  } else {
    body = await body.sort("createdAt");
  }
  const Products = await body;
  res.status(200).json({ Products, noHits: body.length });
};

module.exports = { getAllProducts, getAllProductsStatic };

//for sort method a regual parameter will give back the exact string value
//but putting the - in front of the parameter makes the sorting them in exact reverse orderr
//line 35 :
//resons for removing the await form the first fetch of data and using let keyword
//let helps in modifying the data inside the first stop data and
//reoving of await removes the error confilcts
