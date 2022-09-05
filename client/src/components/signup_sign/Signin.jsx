import React, { useState } from "react";
import "./Signup.css";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signin = () => {

    const navigate = useNavigate();
    const [logdata, setData] = useState({
        email:"",
        password:""
    });
    console.log(logdata);

    

    const adddata = (e) =>{
        const {name, value} = e.target;

        setData(() =>{
            return{
                ...logdata,
                [name]:value
            }
        })
    }

    const senddata = async (e) => {
        e.preventDefault();
        const { email,password } = logdata;
        if (email === "") {
            toast.warn("email required", {
                position: "top-center",
            })
        } else if (password === "") {
            toast.warn("password required", {
                position: "top-center",
            })
        } else {

        const res = await fetch("/login",{
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                email,password
            })
        });
        const data = await res.json();
        console.log(data);

        if(res.status === 400 || !data){
            console.log("Invalid details");
            toast.warn("Invalid details",{
                position: "top-center",
            })
        }else{
            console.log("Data Valid");
            toast.success("User Login Successfully ",{
                position: "top-center",
            })
            setData({...logdata,email:"",password:""});
            navigate(`/home`);
        }
           
    }
}
    

    return(
        <>
            <section >
                <div className="sign_container">
                    <div className="sign_form">
                        <form method="POST">
                            <h1>Sign-In</h1>
                            <div className="form_data">
                                <label htmlFor="email">Email</label>
                                <input type="text" onChange={adddata} value={logdata.email} name="email" id="email" />
                            </div>
                            <div className="form_data">
                                <label htmlFor="password">Password</label>
                                <input type="password" onChange={adddata} value={logdata.password} placeholder="At least 6 char" name="password" id="password" />
                            </div>
                            <button className="signin_btn" onClick={senddata}>Continue</button>
                        </form>
                    </div>
                    <div className="create_accountinfo">
                        <p>New To Amazon</p>
                        <NavLink to="/signup">
                        <button>Create Your amazon account</button>
                        </NavLink>
                    </div>
                </div>
                <ToastContainer />
            </section>
            
        </>
    );
}
export default Signin;
