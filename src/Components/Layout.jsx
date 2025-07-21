import React from "react";
import Home from "./Home";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";


const Layout=({children})=>{
    return (
        <div>
            

             <div className='content'>{children}

                </div> 
             <Footer/>

        </div>
    )
}
export default Layout