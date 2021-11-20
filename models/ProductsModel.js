const mongoose = require("mongoose");

const ProductModel = new mongoose.Schema({
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  name: {
    type: String,
    required: [true, "The name is required to Identify the Product!"],
  },
  price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    dafault: Date.now(),
  },
  company: {
    type: String,
    required: true,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "{VALUE} is not supported",
    },
  },
});

module.exports = mongoose.model("ProductModel", ProductModel);

//use requiresd true array [true,"custom message"]
//to only able to enter some predefined values not some random words into some particular
//data pair then use enum:[types...]

//for getting the time and date stamps for a particular evtry into the database we use
// createdAt: {
//     type: Date,
//     dafault: Date.now(),
// },
//whatever nver force push refs to github nigga`
