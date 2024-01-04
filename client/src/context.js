import { createContext, useState } from 'react'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDxsrogudOOExtyk1UJ2fjQH1MUNeMF0tc",
  authDomain: "try-ap.firebaseapp.com",
  projectId: "try-ap",
  storageBucket: "try-ap.appspot.com",
  messagingSenderId: "832219077499",
  appId: "1:832219077499:web:e3328d438eac5a6bd33bde",
  measurementId: "G-S6XR8YQGFP"
};
const firebaseapp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
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