import { createContext, useState } from 'react'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA1SyZMa6XnFOPqG7puewuiWaSbrKf0h7k",
  authDomain: "badbank-72a01.firebaseapp.com",
  projectId: "badbank-72a01",
  storageBucket: "badbank-72a01.appspot.com",
  messagingSenderId: "860376193878",
  appId: "1:860376193878:web:f5d697a740cff9b1e594f7"
};
const firebaseapp = initializeApp(firebaseConfig);

export const AppContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
  firebaseapp: firebaseapp
})

export const AppContextProvider = (props) => {

  const setCurrentUser = (user) => {
    setState({...state, currentUser: user})
  }

  const initState = {
    currentUser: null,
    setCurrentUser: setCurrentUser,
    firebaseapp: firebaseapp
  } 

  const [state, setState] = useState(initState)

  return (
    <AppContext.Provider value={state}>
      {props.children}
    </AppContext.Provider>
  )
}