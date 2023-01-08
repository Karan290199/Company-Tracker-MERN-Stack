const mongoose = require('mongoose');
const userModel = require('../Models/userModel')

const listAllUsers = async (req, resp) => {
    console.log(req.params);
    const {company_id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(company_id))
    return resp.status(404).json({
      error: "User does not exist"
    });
    const userList = await userModel.find({company_id});
    if(!userList) return resp.status(200).json({});
    return resp.status(200).json(userList);
};

const getSpecificUser = async (req, resp) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return resp.status(404).json({
      error: "User does not exist"
    });
  const user = await userModel.findById(id)
  if (!user)
    return resp.status(404).json({
      error: "User does not exist"
    });

  resp.status(200).json(user);
};

const createUser = async (req, resp) => {
  const {company_id} = req.params
  const { firstName, lastName, email, designation, dateOfBirth } = req.body
  let emptyFields = []
  if (!firstName) emptyFields.push("firstName")
  if (!lastName) emptyFields.push("lastName")
  if (emptyFields.length > 0)
    return resp
      .status(400)
      .json({ error: "Please fill all the fields", emptyFields })
  try {
    const user = await userModel.create({
      firstName,
      lastName,
      email,
      designation,
      dateOfBirth,
      active: true,
      company_id
    });
    resp.status(200).json(user);
  } catch (error) {
    resp.status(404).json({ error: error.message })
  }
};

const updateUser = async (req, resp) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return resp.status(404).json({
      error: "User does not exist"
    });
  const user = await userModel.findByIdAndUpdate({ _id: id }, { ...req.body })
  if (!user)
    return resp.status(404).json({
      error: "User does not exist"
    });

  resp.status(200).json(user);
};

const deleteUser = async (req, resp) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return resp.status(404).json({
      error: "User does not exist"
    });
  const user = await userModel.findByIdAndDelete({ _id: id })
  if (!user)
    return resp.status(404).json({
      error: "User does not exist"
    });
    return resp.status(200).json(user);
};

module.exports = {
  listAllUsers,
  getSpecificUser,
  createUser,
  updateUser,
  deleteUser
};
