import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages & components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import GetCompany from "./pages/CompanyRelatedPages/GetCompany";
import EditCompany from "./pages/CompanyRelatedPages/EditCompany";
import UserForm from "./components/userComponent/UserForm";
import GetUser from "./pages/UserRelatedPages/GetUser";
import MigrateCompany from "./pages/CompanyRelatedPages/MigrateCompany";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/companydetails" element={<GetCompany />} />
            <Route path="/editcompany" element={<EditCompany />} />
            <Route path="/addUser" element={<UserForm />}/>
            <Route path='/getUser' element={<GetUser/>}/>
            <Route path='/migrate' element={<MigrateCompany/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
