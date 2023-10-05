import { createContext,useState} from 'react';
export const UserContext = createContext(null);
const ContactProvider = ({children}) => {
  const [contact,setContact]=useState([]);
  return (
    <UserContext.Provider value={{contact,setContact}}>{children}</UserContext.Provider>
  )
}

export default ContactProvider;