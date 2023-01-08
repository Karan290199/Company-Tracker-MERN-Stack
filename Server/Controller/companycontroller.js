const mongoose = require("mongoose");
const companyModel = require("../Models/companyModel")

const listAllCompanies = async (req, resp) => {
  try {
    const companyList = await companyModel.find().sort()
    resp.status(200).json(companyList);
  } catch (error) {
    resp.status(404).json({ error: error.message });
  }
};

const findCompanyById = async (req, resp) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return resp.status(404).json({
      error: "Company does not exist"
    });
  const company = await companyModel.findById(id);
  if (!company)
    return resp.status(404).json({
      error: "Company does not exist"
    });

  resp.status(200).json(company);
};

const addCompany = async(req, resp) => {
  const {name, address} = req.body
  const {city, state, area, country} = address;
  let emptyFields = []
  if(!name) emptyFields.push('name')
  if(!city) emptyFields.push('city')
  if(!state) emptyFields.push('state')
  if(!area) emptyFields.push('area')
  if(!country) emptyFields.push('country')
  if(emptyFields.length > 0) return resp.status(400).json({error: 'Please fill all the fields', emptyFields})
    try {
        const company = await companyModel.create({name, address})
        resp.status(200).json(company);
    } catch (error) {
      resp.status(404).json({ error: error.message });
    }
}

const updateCompany = async(req, resp) => {
    const { id } = req.params;
    const {name} = req.body
    const {city, state, area, country} = req.body.address;
    let emptyFields = []
    if(!name) emptyFields.push('name')
    if(!city) emptyFields.push('city')
    if(!state) emptyFields.push('state')
    if(!area) emptyFields.push('area')
    if(!country) emptyFields.push('country')
    if(emptyFields.length > 0) return resp.status(400).json({error: 'Please fill all the fields', emptyFields})
    if (!mongoose.Types.ObjectId.isValid(id))
      return resp.status(404).json({
        error: "Company does not exist"
      });
    const company =  await companyModel.findByIdAndUpdate(
        { _id: id }, {...req.body})
    if (!company)
      return resp.status(404).json({
        error: "Company does not exist"
      });
  
    resp.status(200).json(company);
}

const deleteCompany = async (req, resp) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return resp.status(404).json({
        error: "Company does not exist"
      });
    const company = await companyModel.findByIdAndDelete({_id: id});
    if (!company)
      return resp.status(404).json({
        error: "Company does not exist"
      });
  
    resp.status(200).json(company);
  };

module.exports = {listAllCompanies, findCompanyById, addCompany, deleteCompany, updateCompany}
