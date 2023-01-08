import { useState } from "react";
import { useCompanyContext } from "../../hooks/useCompanyHook/useCompanyContext";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import {Select, MenuItem} from "@mui/material";

const CompanyForm = () => {
  const { dispatch } = useCompanyContext();

  const [name, setName] = useState("");
  const [streetaddress, setStreetAddress] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

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
    const company = {
      name,
      address: {
        streetaddress,
        area,
        city,
        state,
        country,
        zipCode,
      },
    };

    const response = await fetch("/api/company/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(company),
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setEmptyFields([]);
      setError(null);
      setName("");
      setStreetAddress("");
      setArea("");
      setCity("");
      setState("");
      setCountry("");
      setZipCode("");
      dispatch({ type: "CREATE_COMPANY", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Register your Company</h3>

      <label>Name</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className={emptyFields && emptyFields.includes("name") ? "error" : ""}
      />

      <label>Address</label>
      <input
        type="text"
        onChange={(e) => setStreetAddress(e.target.value)}
        value={streetaddress}
      />
      <label>Area</label>
      <input
        type="text"
        onChange={(e) => setArea(e.target.value)}
        value={area}
        className={emptyFields && emptyFields.includes("area") ? "error" : ""}
      />
      <label>Country</label>
      <Select
        style={{ width: "150px" }}
        value={country}
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
        value={state}
        className={emptyFields && emptyFields.includes("state") ? "error" : ""}
      />
      <label>City</label>
      <input
        type="text"
        onChange={(e) => setCity(e.target.value)}
        value={city}
        className={emptyFields && emptyFields.includes("city") ? "error" : ""}
      />
      <label>Postal Code</label>
      <input
        type="text"
        onChange={(e) => setZipCode(e.target.value)}
        value={zipCode}
      />

      <button>Register Company</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default CompanyForm;
