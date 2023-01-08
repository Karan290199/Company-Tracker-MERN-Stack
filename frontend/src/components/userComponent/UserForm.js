import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const UserForm = () => {
  const params = useLocation();
  const { id } = params.state;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const navigate = useNavigate();
  
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const user = {
      firstName,
      lastName,
      email,
      designation,
      dateOfBirth,
      active: true
    };

    const response = await fetch("/api/" + id + "/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      console.log(json);
      setEmptyFields([]);
      setError(null);
      setFirstName("");
      setLastName("");
      setEmail("");
      setDesignation("");
      setDateOfBirth("");
      navigate(-1);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmitForm}>
      <label>FirstName</label>
      <input
        type="text"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
        className={
          emptyFields && emptyFields.includes("firstName") ? "error" : ""
        }
      />
      <label>LastName</label>
      <input
        type="text"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
        className={
          emptyFields && emptyFields.includes("lastName") ? "error" : ""
        }
      />

      <label>Email</label>
      <input
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label>Designation</label>
      <input
        type="text"
        onChange={(e) => setDesignation(e.target.value)}
        value={designation}
      />

      <label>Date Of Birth</label>
      <input
        type="date"
        onChange={(e) => setDateOfBirth(e.target.value)}
        value={dateOfBirth}
      />

      <button>Register User</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default UserForm;
