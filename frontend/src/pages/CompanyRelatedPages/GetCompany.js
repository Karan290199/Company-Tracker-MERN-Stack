import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UseFetchCoordinates from "../../hooks/useCompanyHook/useFetchCoordinates";
import { Button } from "react-bootstrap";
import { useUserContext } from "../../hooks/useUserHook/useUserContext";
import { Grid } from "@mui/material";
import UserDetail from "../../components/userComponent/UserDetail";

const GetCompany = () => {
  const params = useLocation();
  const { id } = params.state;
  const [company, setCompany] = useState({});
  const { users, dispatch } = useUserContext();

  const navigate = useNavigate();

  function editCompanyDetails(id, company) {
    navigate("/editcompany", {
      state: { id, company },
    });
  }

  function addUserDetails(id) {
    navigate("/addUser", {
      state: { id },
    });
  }

  function goBack(company) {
    navigate(-1);
  }

  useEffect(() => {
    const handleFetch = async () => {
      const response = await fetch("/api/company/" + id, {
        method: "GET",
      });
      const json = await response.json();
      setCompany(json);
    };
    handleFetch();
  }, [id]);

  useEffect(() => {
    const handleFetchUsers = async () => {
      const resp = await fetch("/api/" + id + "/users/", {
        method: "GET",
      });
      const json = await resp.json();
      if (resp.ok) {
        dispatch({ type: "SET_USERS", payload: json });
      }
    };
    if (id) {
      handleFetchUsers();
    }
  }, [dispatch, id]);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {company && (
        <div className="company-div">
          <div className="companyDetail-div">
            <h3>Company Details</h3>
            <div>
              <strong>Company </strong>
              {company.name}
              {company.address && (
                <UseFetchCoordinates address={company.address} />
              )}
            </div>
            <div>
              <Button
                key={id}
                variant="success"
                className="viewMore"
                onClick={() => {
                  editCompanyDetails(id, company);
                }}
              >
                Edit Details
              </Button>
            </div>
            <p></p>
            <div>
              <Button
                key={id + "1"}
                variant="secondary"
                className="viewMore"
                onClick={() => {
                  goBack(company);
                }}
              >
                Back to HomePage
              </Button>
            </div>
          </div>
        </div>
      )}
      {company && (
        <div className="UserContainer">
          <div className="UserDiv">
            <h3>User List </h3>
            <Button
              variant="primary"
              style={{ padding: "5px", width: "100px", height: "50px" }}
              key={company._id}
              onClick={() => {
                addUserDetails(id);
              }}
            >
              Add User
            </Button>
          </div>
          <Grid container>
            <Grid container item spacing={1}>
              {users &&
                users.map((user) => (
                  <Grid item xs key={user._id + "1"}>
                    <UserDetail user={user} company={company} key={user._id} />
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default GetCompany;
