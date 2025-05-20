import {BrowserRouter, Route, Routes, useLocation, matchPath } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Header from './components/Header';
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
import RealUserProfile from './components/RealUserProfile'
import UserProfile from './components/UserProfile'
import CourierNav from "./components/CourierNav";
import OrderStatus from "./components/OrderStatus";
import VendorDeliveryRequest from "./components/VendorDeliveryRequest"
import ProductListing from './components/ProductListing'

function AppContent() {
  const location = useLocation(); 

   const hideHeaderRoutes = [
    '/login',
    '/register',
    '/courierNav/:deliveryId',
  ];
   const shouldHideHeader = hideHeaderRoutes.some((path) =>
    matchPath({ path, end: true }, location.pathname)
  );

  const showHeader = !shouldHideHeader;

  const [isSearching, setIsSearching] = useState(false); // deals with toggeling the display body if we using Category or Search bar or Both or none 
  const [dataReturned, setDataReturned] = useState([]); // This is returns an array of data from fetch request that Header.jsx deals with
  const [selectedCategoryName, setSelectedCategoryName] = useState(""); // tells you what category was selected 
  const [filters, setFilters] = useState({
        condition: "",
        priceSort: "",
        datePosted: "",
        minDiscount: "",
        minRating: "",
    })


  const [count, setCount] = useState(0)
  const [user, setUser] = useState(null)

  return (
    <>

      {
        showHeader && (
          <Header  setSelectedCategoryName={setSelectedCategoryName} setDataReturned={setDataReturned} setIsSearching={setIsSearching} isSearching={isSearching} filters={filters} setFilters={setFilters}/>
        )}
      
      <Routes>
        <Route path="/" element={<Homepage dataReturned={dataReturned} isSearching={isSearching} selectedCategoryName={selectedCategoryName} filters={filters} />}/>
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
        <Route path="/realUserProfile" element={<RealUserProfile/>} />
        <Route path="/userProfile" element={<UserProfile/>} />
        <Route path="/CourierNav" element={<CourierNav/>} />
        <Route path="/OrderStatus" element={<OrderStatus/>} />
        <Route path="/vendorDeliveryRequest" element={<VendorDeliveryRequest/>} />
          <Route path="/courierNav/:deliveryId" element={<CourierNav />} />
          <Route path="/productListing/:id" element={<ProductListing/>} />
      </Routes>
    </>
)
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App
