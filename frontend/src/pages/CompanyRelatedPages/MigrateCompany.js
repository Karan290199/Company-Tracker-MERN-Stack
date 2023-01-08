import { Grid, MenuItem, Select } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { useCompanyContext } from "../../hooks/useCompanyHook/useCompanyContext";

const MigrateCompany = () => {
  const params = useLocation();
  const { user, company } = params.state;
  const userId = user._id;
  const { firstName, lastName, email, designation, dateOfBirth } = user;
  const [error, setError] = useState("");
  const { companies, dispatch } = useCompanyContext();
  const [companyName, setCompanyName] = useState(company.name);
  const setCompanyHandler = (value) => setCompanyName(value);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      const response = await fetch("/api/company/");
      let json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_COMPANY", payload: json });
      }
    };

    fetchCompanyDetails();
  }, [dispatch]);

  let compArr = [];
  if (companies) {
    compArr = companies.map((company) => {
      return {
        name: company.name,
        id: company._id,
      };
    });
  }
  function returnComId(compName) {
    if (compArr) {
      for (let comp of compArr) {
        if (comp.name === compName) return comp.id;
      }
    }
  }

  const goBack = async (e) => {
    e.preventDefault();
    if(companyName) {
        const newCompId = returnComId(companyName);
        const reqBody = {
          firstName,
          lastName,
          active: true,
          dateOfBirth,
          designation,
          email,
          company_id: newCompId,
        };
        console.log(JSON.stringify(reqBody));
        const response1 = await fetch("/api/migrate/" + userId, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reqBody)
          });
        const json = await response1.json();
        console.log(json);
        if (!response1.ok) {
          setError(json.error);
        }
        if (response1.ok) {
          setError(null);
          navigate("/");
        }
    }
  };

  return (
    <Grid
      container
      spacing={1}
      key={user._id + "1"}
      direction="column"
      justifyContent="center"
      alignItems="center"
      padding="20px"
    >
      <Grid item>
        <Card style={{ width: "12rem" }}>
          <Card.Body>
            <Card.Title>{user.firstName}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {user.lastName}
            </Card.Subtitle>
            <Card.Text>
              <strong>{user.designation}</strong>
            </Card.Text>
            <Card.Text>{user.active ? "Active" : "NotActive"}</Card.Text>
            {error && <div className="error">{error}</div>}
          </Card.Body>
        </Card>
      </Grid>
      <Grid item>
        <form className="create" onSubmit={goBack}>
          <Select
            style={{
              width: "12rem",
              backgroundColor: "white",
            }}
            value={companyName}
            lable="company"
            title="company"
            onChange={(e) => setCompanyHandler(e.target.value)}
          >
            {!!compArr?.length &&
              compArr.map(({ name, id }) => (
                <MenuItem key={id} value={name}>
                  {name}
                </MenuItem>
              ))}
          </Select>
          <p></p>
          <button>Migrate</button>
        </form>
        {error && <div className="error">{error}</div>}
      </Grid>
    </Grid>
  );
};

export default MigrateCompany;
