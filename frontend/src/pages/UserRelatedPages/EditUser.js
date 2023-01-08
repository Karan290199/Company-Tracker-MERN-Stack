import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const EditUser = ({user}) => {
  const params = useLocation();
  const {id, companyId} = params.state;
  const {firstName, lastName, email, designation} = user;
  const [Email, setEmail] = useState(email);
  const [Designation, setDesignation] = useState(designation);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const user = {
      firstName,
      lastName,
      email: Email,
      designation: Designation,
    };

    const response = await fetch("/api/" + companyId + "/users/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
      setEmail("");
      setDesignation("");
      navigate(-1);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmitForm}>
      <label>Email</label>
      <input
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        value={Email}
      />

      <label>Designation</label>
      <input
        type="text"
        onChange={(e) => setDesignation(e.target.value)}
        value={Designation}
      />
      <button>Register User</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default EditUser;
