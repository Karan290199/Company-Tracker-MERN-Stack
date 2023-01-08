import { createContext, useReducer } from 'react'

export const CompanyContext = createContext()

export const companyReducer = (state, action) => {
  switch (action.type) {
    case 'SET_COMPANY':
      return { 
        companies: action.payload
      }
    case 'CREATE_COMPANY':
      return { 
        companies: [action.payload, ...state.companies] 
      }
    case 'DELETE_COMPANY':
      return { 
        companies: state.companies.filter(w => w._id !== action.payload._id) 
      }
    default:
      return state
  }
}

export const CompanyContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(companyReducer, { 
    companies: null
  })
  
  return (
    <CompanyContext.Provider value={{ ...state, dispatch }}>
      { children }
    </CompanyContext.Provider>
  )
}