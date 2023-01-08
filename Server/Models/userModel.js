const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  designation: {
    type: String
  },
  dateOfBirth: {
    type: Date
  },
  active: {
    type: Boolean
  },
  company_id: {
    type: String
  }
});
module.exports = mongoose.model("user", UserSchema);