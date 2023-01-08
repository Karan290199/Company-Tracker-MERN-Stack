import { useEffect } from "react"
import { useCompanyContext } from "../hooks/useCompanyHook/useCompanyContext"

// components
import CompanyDetail from "../components/companyComponent/CompanyDetail"
import CompanyForm from "../components/companyComponent/CompanyForm"

const Home = () => {
  const { companies, dispatch } = useCompanyContext()
  useEffect(() => {
    const fetchCompanyDetails = async () => {
      const response = await fetch('/api/company/')
      let json = await response.json()
      if (response.ok) {
        dispatch({type: 'SET_COMPANY', payload: json})
      }
    }

    fetchCompanyDetails()
  }, [dispatch])


  return (
    <div className="home">
      <div className="workouts">
        {companies && companies.map(company => (
          <CompanyDetail company = {company} key = {company._id}/>
        ))}
      </div>
      <div className="form"><CompanyForm /></div>
    </div>
  )
}

export default Home