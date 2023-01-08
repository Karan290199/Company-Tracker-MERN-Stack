const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  streetAddress: {
    type: String
  },
  area: { 
    type: String,
    required: true
   },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  zipCode: { type: String }
});

const CompanySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: { type: AddressSchema }
});

module.exports = mongoose.model("company", CompanySchema);
