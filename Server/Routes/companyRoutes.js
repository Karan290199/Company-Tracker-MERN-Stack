const express = require("express");
const router = express.Router();

const {
  listAllCompanies,
  findCompanyById,
  addCompany,
  deleteCompany,
  updateCompany,
} = require("../Controller/companycontroller");

router.get("/", listAllCompanies);
router.get("/:id", findCompanyById);
router.post("/", addCompany);
router.patch("/:id", updateCompany);
router.delete("/:id", deleteCompany);

module.exports = router;
