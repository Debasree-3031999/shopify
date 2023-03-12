import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios"
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from './pages/UserList';
import UserDetails from './pages/UserDetails';
// import {customers} from "./users.json"

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    let url = `http://localhost:8080/customers`
    console.log(url);
    axios.get(url).then((res) => {
      console.log(res);
      setUsers(res.data.customers)
    })
    // console.log("=>",customers);
    // setUsers(customers)
  },[])
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<UserList users={users}/>}/>
          <Route path={`/customers/:id`} element={<UserDetails users={users}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

