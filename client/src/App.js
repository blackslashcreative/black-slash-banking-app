import { createContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from './components/navbar';
import Home from './components/home';
import CreateAccount from './components/createaccount';
import LoginForm from './components/login';
import Deposit from './components/deposit';
import Withdraw from './components/withdraw';
import Balance from './components/balance';
import AllData from './components/alldata';
import 'bootstrap/dist/css/bootstrap.min.css';

export const UserContext = createContext(null);

function App() {
  return (
    
      <div>
        <NavBar/>
        <UserContext.Provider value={{users: [{name:'ghosty', email:'ghosty@blacksla.sh', password:'secret', balance:100}]}}>
          <div className = "container" style={{padding: "20px"}}>
          <Router>
            <Routes>
              <Route path="/" exact element={ <Home/> } />
              <Route path="/register/" exact element={ <CreateAccount/> } />
              <Route path="/login/" exact element={ <LoginForm/> } />
              <Route path="/deposit/" exact element={ <Deposit/> } />
              <Route path="/withdraw/" exact element={ <Withdraw/> } />
              <Route path="/balance/" exact element={ <Balance/> } />
              <Route path="/data/" exact element={ <AllData/> } />
            </Routes>
          </Router>
          </div>
        </UserContext.Provider>
      </div>
  )
}

export default App;
