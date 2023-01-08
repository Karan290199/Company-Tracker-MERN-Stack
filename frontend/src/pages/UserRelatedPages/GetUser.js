import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import {Button as MButton} from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import EditUser from "./EditUser";

const GetUser = () => {
  const params = useLocation();
  console.log(params);
  const { id, companyId } = params.state;
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  function goBack() {
    navigate(-1);
  }

  useEffect(() => {
    const getUser = async () => {
      const resp = await fetch("/api/" + companyId + "/users/" + id, {
        method: "GET",
      });
      const json = await resp.json();
      setUser(json);
    };
    getUser();
  }, [id, companyId]);

  const handleClick = async (e) => {
    if (user && user.active === true) {
      const { firstName, lastName } = user;
      const reqBody = {
        firstName,
        lastName,
        active: false,
      };
      const response = await fetch("/api/" + companyId + "/users/" + id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody),
      });
      const json = await response.json();
      if (response.ok) {
        setUser(json);
      }
    } else if (user && user.active === false) {
      const { firstName, lastName } = user;
      const reqBody = {
        firstName,
        lastName,
        active: true,
      };
      const response = await fetch("/api/" + companyId + "/users/" + id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody),
      });
      const json = await response.json();
      if (response.ok) {
        setUser(json);
      }
    }
    navigate(-1);
  };

  return (
    <div>
      {user && !edit && (
        <div style={{padding: '10px'}}>
          <p>
            <strong>Name: </strong>
            {user.firstName}
            {user.lastName}
          </p>
          <p>
            <strong>Email: </strong>
            {user.email}
          </p>
          <p>
            <strong>Designation: </strong>
            {user.designation}
          </p>
          <p>
            <strong>D.O.B: </strong>
            {user.dateOfBirth}
          </p>
          <Button
            key={"edit" + user._id}
            variant="outline-primary"
            onClick={() => {
              setEdit(true);
            }}
            disabled={edit}
          >
            Edit Details
          </Button>
          <p></p>
          {user.active && (
            <Button
              key={"deactive" + user._id}
              variant="outline-danger"
              onClick={handleClick}
            >
              Deactivate
            </Button>
          )}
          {!user.active && (
            <Button
              key={"deactive" + user._id}
              variant="outline-danger"
              onClick={handleClick}
            >
              Activate the User
            </Button>
          )}
          <p></p>
          <MButton variant='contained' disableElevation onClick={goBack} endIcon={<ChevronLeftIcon/>}>Back</MButton>
        </div>
      )}
      {user && edit && <EditUser user={user} edit={edit} key={user._id} />}
    </div>
  );
};

export default GetUser;
