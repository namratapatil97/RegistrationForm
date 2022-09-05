import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signup = () => {
   const navigate = useNavigate();

    const [udata, setUdata] = useState({
        fname:"",
        email:"",
        mobile:"",
        password:"",
        cpassword:""
    })
    console.log(udata);

    const adddata = (e) =>{
        const{name, value} = e.target;

        setUdata(() => {
            return{
                ...udata,
                [name]:value
            }
        })
    }

    const senddata = async (e) => {
        e.preventDefault();
        const { fname,email,mobile,password,cpassword } = udata;

        if(fname === ""){
            toast.warn("Full Name Provide",{
                position: "top-center",
            })
        }else if(email === ""){
            toast.warn("Email Provide",{
                position: "top-center",
            })
        }else if(mobile === ""){
            toast.warn("Mobile Provide",{
                position: "top-center",
            })
        }
        else if(password === ""){
            toast.warn("Password Provide",{
                position: "top-center",
            })
        }
        else if(cpassword === ""){
            toast.warn("Confirm password Provide",{
                position: "top-center",
            })
        }else{
            
            //
            const res = await fetch("/register",{
                method: "POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    fname,email,mobile,password,cpassword
                })
            });
            const data = await res.json();
            // console.log(data);
    
            if(res.status === 422 || !data){
                toast.warn("Invalid details",{
                    position: "top-center",
                })
            }else{
                // alert("Data Successfully added");
                toast.success("User Register Successfully",{
                    position: "top-center",
                })
                setUdata({...udata,fname:"",email:"",mobile:"",password:"",cpassword:""});
                navigate("/signin");
            }
            
        }
    
        }



        
    
    return (
        <>
            <section >
                <div className="sign_container">
             
                    <div className="sign_form">
                        <form method='POST'>
                            <h1>Sign-Up</h1>
                            <div className="form_data">
                                <label htmlFor="fname">Your Name</label>
                                <input type="text" onChange={adddata} value={udata.fname} name="fname" id="fname" />
                            </div>
                            <div className="form_data">
                                <label htmlFor="email">Email</label>
                                <input type="text" onChange={adddata} value={udata.email} name="email" id="email" />
                            </div>
                            <div className="form_data">
                                <label htmlFor="number">Mobile</label>
                                <input type="number" onChange={adddata} value={udata.mobile} name="mobile" id="mobile" />
                            </div>
                            <div className="form_data">
                                <label htmlFor="password">Password</label>
                                <input type="password" onChange={adddata} value={udata.password} placeholder="At least 6 char" name="password" id="password" />
                            </div>
                            <div className="form_data">
                                <label htmlFor="cpassword">Conform Password</label>
                                <input type="password" onChange={adddata} value={udata.cpassword} name="cpassword" id="cpassword" />
                            </div>
                            <button className="signin_btn"  onClick={senddata}>Continue</button>

                            <div className="signin_info">
                                <p>Already have an account?</p><NavLink to="/signin" className="sign">Signin</NavLink>
                            </div>
                        </form>
                    </div>
                        <ToastContainer />
                </div>
            </section>
        </>
    );
}
export default Signup;
