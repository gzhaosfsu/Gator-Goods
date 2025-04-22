import { useState } from 'react'
import './App.css'
import {BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import AboutMartha from './components/AboutMartha'
import Homepage from "./components/Homepage"
import AboutAnthony from './components/AboutAnthony'
import AboutGarvin from './components/AboutGarvin'
import AboutJace from './components/AboutJace'
import AboutVansh from './components/AboutVansh'
import AboutTeam from './components/AboutTeam'
import Chats from './components/Chats'
import Login from './components/Login'
import Register from './components/Register'
import CourierPage from './components/CourierPage'
import VendorPage from './components/VendorPage'
import UserListings from './components/UserListings'

function App() {
  const [count, setCount, user, setUser] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/aboutMartha" element={<AboutMartha/>}/>
        <Route path="/aboutAnthony" element={<AboutAnthony/>}/>
        <Route path="/aboutGarvin" element={<AboutGarvin/>}/>
        <Route path="/aboutJace" element={<AboutJace/>}/>
        <Route path="/aboutVansh" element={<AboutVansh/>}/>
        <Route path='/aboutTeam' element={<AboutTeam/>}/>
        <Route path='/chats' element={<Chats/>} />
        <Route path='/login' element={<Login setUser={setUser}/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/courierPage' element={<CourierPage/>} />
        <Route path="/vendorPage" element={<VendorPage/>} />
        <Route path="/userListings" element={<UserListings/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
