//controllers

const getAllProducts = (req, res) => {
  throw new Error("Testing async errors");
  res.status(200).json({ test: "main page url" });
};

const getAllProductsStatic = (req, res) => {
  res.status(200).json({ name: "test static" });
};

module.exports = { getAllProducts, getAllProductsStatic };
