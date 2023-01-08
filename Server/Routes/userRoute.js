const express = require("express");
const router = express.Router();

const {
  listAllUsers,
  getSpecificUser,
  createUser,
  updateUser,
  deleteUser,
  migrateUser
} = require("../Controller/userController")

router.get("/:company_id/users", listAllUsers);
router.get("/:company_id/users/:id", getSpecificUser);
router.post("/:company_id/users/", createUser);
router.patch("/:company_id/users/:id", updateUser);
router.patch("/migrate/:id", updateUser);
router.delete("/:company_id/users/:id", deleteUser);


module.exports = router;
