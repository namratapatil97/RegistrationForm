const express = require("express");
const router = express.Router();
const USER = require("../models/userSchema");
const bcrypt = require("bcryptjs");



// register Data
router.post("/register", async(req,res) => {
    // console.log(req.body);
    const {fname,email,mobile,password,cpassword} = req.body;

    if(!fname || !email || !mobile || !password || !cpassword){
        res.status(422).json({error: "fill the all data"})
        console.log("No data available");
    };

    try{
        const preuser = await USER.findOne({email:email})
        if(preuser){
            res.status(422).json({error:"This user is already present"})
        }else if(password !== cpassword){
            res.status(422).json({error:"password and cpassword not match"})
        }else{
            const finalUser = new USER({
                fname,email,mobile,password,cpassword
            });

            const storedata = await finalUser.save();
            console.log(storedata);

            res.status(201).json(storedata);
        }
    }catch(error){

    }
})


// Login user api

router.post("/login",async(req,res) => {
    const {email,password} = req.body;

    // Manual validation
    if(!email || !password){
        res.status(400).json({error:"fill the all data"}) 
    };

    try{
        const userlogin = await USER.findOne({email:email});
        // console.log(userlogin);
        
        if(userlogin){
            const isMatch = await bcrypt.compare(password,userlogin.password);
            console.log(isMatch + "pass match");

            if(!isMatch){
                res.status(400).json({error:"Invalid details"})
            }else{
            // token generate
             const token = await userlogin.generateAuthtoken();
             //  console.log(token);
 
             res.cookie("Register",token,{
                 expires:new Date(Date.now() + 900000),
                 httpOnly:true
             })
                res.status(201).json(userlogin)
            }
        }else{
            res.status(400).json({error:"User not registered"})
        }
    } catch (error){
        res.status(400).json({error:"Invalid details"})
    }
})





module.exports = router;