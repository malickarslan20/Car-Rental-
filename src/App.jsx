import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home'
import Cars from "./Pages/Cars"
import About from './Pages/About';
import Contact from './Pages/Contact';
import Login from './Pages/Login';
import Layout from './Components/Layout';
import Navbar from './Components/Navbar';
import BrowseCar from './Pages/BrowseCar';
import Signup from './Pages/Signup'
import Logout from './Pages/Logout';
import ProtectedRoute from './Components/Protectedroute';
import Admin from "./Components/Admin"
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setuser } from './Redux/Slices';

function App() {
  let parsedUser;
    const dispatch = useDispatch();
  useEffect(() => {

      const storedUser = localStorage.getItem("user");
  
  if (storedUser) {
     parsedUser = JSON.parse(storedUser); // ✅ Parse first
    console.log(parsedUser.email); // ✅ Now you can access .email
    dispatch(setuser(parsedUser));
  }
  }, [dispatch]);


  return (
   <BrowserRouter>
   <Navbar />
      <Routes>
         {/* <Route path="/" element={ <Layout/>} /> */}
          <Route path="/" element={<Layout><Home/></Layout>} />
        <Route path="/cars" element={
          <ProtectedRoute>
            <Layout><Cars /></Layout>
          </ProtectedRoute>} />
        <Route path="/browse" element={
          <ProtectedRoute>
            <Layout><BrowseCar/></Layout>
          </ProtectedRoute>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/contact" element={
          <ProtectedRoute>
           <Layout><Contact /></Layout>
            </ProtectedRoute>} />
             {parsedUser.email==="malickarslan1122@gmail.com" && <Route path="/admin" element={<Layout><Admin /></Layout>} />}
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/signup" element={<Layout><Signup /></Layout>} />
        <Route path="/logout" element={<Layout><Logout /></Layout>} />
       
      </Routes>
    </BrowserRouter>
  )
}

export default App
