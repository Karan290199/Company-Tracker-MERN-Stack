import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../hooks/useUserHook/useUserContext";

const UserDetail = ({ company, user }) => {
  const { dispatch } = useUserContext();
  const navigate = useNavigate();

  const MigrateUser = (user) => {
    if(user.active) {
      if(user.active === true) {
        setError('Please Deactivate the user inorder to migrate')
        return error;
      }
    }
    navigate('/migrate', {
      state: {company, user}
    })
  }

  const fetchSpecificUser = (companyId, id) => {
    navigate('/getUser', {
      state: {id, companyId}
    })
  };
  const [error, setError] = useState("");
  const deleteUser = async () => {
    if(user.active === true) {
      setError('Please Deactivate the user inorder to delete successfully')
      return error;
    }

    const response = await fetch("/api/" + company._id + "/users/" + user._id, {
      method: "DELETE",
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      dispatch({ type: "DELETE_USER", payload: json });
    }
  };

  return (
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
        <Button
          variant="outline-primary"
          key={"view" + user._id}
          onClick={() => fetchSpecificUser(company._id, user._id)}
        >
          View
        </Button>
        <p></p>
        <Button variant="danger" key={"delete" + user._id} onClick={deleteUser}>
          Delete
        </Button>
        <p></p>
        <Button variant="warning" key={"migrate" + user._id} onClick={()=>(MigrateUser(user))}>
          Migrate
        </Button>
        {error && <div className="error">{error}</div>}
      </Card.Body>
    </Card>
  );
};

export default UserDetail;
