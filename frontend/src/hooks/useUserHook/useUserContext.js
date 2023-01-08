import { useContext } from "react"
import {UserContext} from '../../context/UserContext'

export const useUserContext = () => {
    const userContext = useContext(UserContext)

    if(!userContext) {
      throw Error('useUserContext must be used inside a userContextProvider')
    }
  
    return userContext
}
