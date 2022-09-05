import React from "react";
import "./Navbar.css"
import { NavLink} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';



const Navbar = () => {
    return(
        <>
            <header>
                <nav>   
                    <div className="right">
                        <div className="nav_btn">
                            <NavLink to="/signin">Sign In</NavLink>
                        </div>
                      
                        </div>
                </nav>
            </header>
        </>
    );
}

export default Navbar;