import {useCompanyContext} from "../../hooks/useCompanyHook/useCompanyContext";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const CompanyDetail = ({ company }) => {
  const { dispatch } = useCompanyContext();
  const navigate = useNavigate();

  function handleNavigate(id) {
    navigate("/companydetails", {
      state: { id },
    });
  }

  const handleDelete = async () => {
    const response = await fetch("/api/company/" + company._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_COMPANY", payload: json });
    }
  };

  return (
    <div className="workout-details">
      <h4>{company.name}</h4>
      <p>
        <strong>Country </strong> {company.address.country}
      </p>
        <Button
          key={'delete' + company._id}
          variant="outlined"
          color="error"
          style={{  position: 'absolute',
            top: '15px',
            right: '20px',
            cursor: 'pointer',
            padding: '3px'}}
          onClick={handleDelete}
          startIcon={<DeleteOutlineIcon />}
        >
          Delete
        </Button>
        <Button
          key={'view' + company._id}
          variant="outlined"
          style={{  position: 'absolute',
            color: 'blue',
            bottom: '15px',
            right: '20px',
            cursor: 'pointer',
            padding: '3px'}}
          onClick={() => handleNavigate(company._id)}
        >
          {"View More"}
        </Button>
      </div>
  );
};

export default CompanyDetail;
