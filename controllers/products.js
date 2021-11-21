const ProductsModel = require("../models/ProductsModel");

//controllers
//testing route
const getAllProductsStatic = async (req, res) => {
  const { select } = req.query;
  const result = await ProductsModel.find().select(select).limit(5);
  res.status(200).json({ noResult: result.length, result: { result } });
};

const getAllProducts = async (req, res) => {
  //making sure that the query params are only ones that are present in database not
  //any random params..
  const { featured, company, name, sort, fields } = req.query;
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
  let result = ProductsModel.find(queryObject);

  // //limit results
  // if (limit) {
  //   result = result.limit(limit * 1); //by multiplying a string with number any number it becomes a number
  // }

  //implement the sorting of the data
  //line 51
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }
  //select only some fileds
  if (fields) {
    const fieldList = fields.split(",").join(" ").toString();
    result = result.select(fieldList);
  }
  //pagination feature
  const limit = req.query.limit * 1 || 10;
  const page = req.query.page * 1 || 1;
  const skipIndex = (page - 1) * limit;

  result = result.limit(limit).skip(skipIndex);

  const Products = await result; //use this await at the end of giving out the final result
  res.status(200).json({ noHits: Products.length, Products });
};

module.exports = { getAllProducts, getAllProductsStatic };

//for sort method a regual parameter will give back the exact string value
//but putting the - in front of the parameter makes the sorting them in exact reverse orderr
//line 35 :
//resons for removing the await form the first fetch of data and using let keyword
//let helps in modifying the data inside the first stop data and
//reoving of await removes the error confilcts

//for more deep and clean understafing of the sort and functinalities
//https://mongoosejs.com/docs/queries.html
