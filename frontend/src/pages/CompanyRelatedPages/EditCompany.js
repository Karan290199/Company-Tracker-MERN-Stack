import React, {useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import {Select, MenuItem} from "@mui/material";


const EditCompany = () => {
    const params = useLocation();
    const { id, company } = params.state;

    const {name, address} = company;
    const {streetAddress, area, country, state, city, zipCode } = address;

    const [Name, setName] = useState(name);
    const [Streetaddress, setStreetAddress] = useState(streetAddress);
    const [Area, setArea] = useState(area);
    const [City, setCity] = useState(city);
    const [State, setState] = useState(state);
    const [Country, setCountry] = useState(country);
    const [ZipCode, setZipCode] = useState(zipCode);
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    const navigate = useNavigate();

    const setCountryHandler = (value) => setCountry(value);
    countries.registerLocale(enLocale);
  
    const countryObj = countries.getNames("en", { select: "official" });
  
    const countryArr = Object.entries(countryObj).map(([key, value]) => {
      return {
        label: value,
        value: key
      };
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newCompany = {
            name: Name,
            address: {
              streetAddress: Streetaddress,
              area: Area,
              city: City,
              state: State,
              country: Country,
              zipCode: ZipCode,
            },
        };
        const response = await fetch("/api/company/" + id, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCompany)
        })
        
        const json = await response.json();
        console.log(json)
        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
          }
          if (response.ok) {
            setEmptyFields([]);
            setError(null);
            setName('');
            setStreetAddress('');
            setArea('');
            setCity('');
            setState('');
            setCountry('');
            setZipCode('');
            navigate(-1);
          }
    }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Register your Company</h3>

      <label>Name</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={Name}
        className={emptyFields && emptyFields.includes("name") ? "error" : ""}
      />

      <label>Address</label>
      <input
        type="text"
        onChange={(e) => setStreetAddress(e.target.value)}
        value={Streetaddress}
      />
      <label>Area</label>
      <input
        type="text"
        onChange={(e) => setArea(e.target.value)}
        value={Area}
        className={emptyFields && emptyFields.includes("area") ? "error" : ""}
      />
      <label>Country</label>
      <Select
        style={{ width: 'max-content' }}
        value={Country}
        label='country'
        onChange={(e) => setCountryHandler(e.target.value)}
        className={emptyFields && emptyFields.includes("country") ? "error" : ""}
      >
        {!!countryArr?.length &&
          countryArr.map(({ label, value }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
      </Select>
      <label>State</label>
      <input
        type="text"
        onChange={(e) => setState(e.target.value)}
        value={State}
        className={emptyFields && emptyFields.includes("state") ? "error" : ""}
      />
      <label>City</label>
      <input
        type="text"
        onChange={(e) => setCity(e.target.value)}
        value={City}
        className={emptyFields && emptyFields.includes("city") ? "error" : ""}
      />
      <label>Postal Code</label>
      <input
        type="text"
        onChange={(e) => setZipCode(e.target.value)}
        value={ZipCode}
      />
      <button>Save/Cancel</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default EditCompany