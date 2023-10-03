const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require("../middleware/fetchUser");

// bcrption installing
const bcrypt = require('bcryptjs');

//jwt import
const jwt = require("jsonwebtoken");
const secrete = "iLikeBurgur";

//sign-up
router.post('/CreatUser', [
     // predifiend validation
     body('name', "enter Proper Name").isLength({ min: 5 }),
     body('email', "enter Valid Email").isEmail(),
     body('password', "make ProperPassword").isLength({ min: 5 })
], async (req, res) => {

     //here it is used t send the erro massage 
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() })
     }
     //checking for the duplicate user
     try {
          let success = false;
          let user = await User.findOne({ email: req.body.email });
          if (user) {
               return res.status(401).json({ success ,error: "sorry this User Already exist" });
          }
          //encrypting the password and adding some salt
          let salt = await bcrypt.genSalt(10);
          let hashPassword = await bcrypt.hashSync(req.body.password, salt);

          //enterying the data into the database
          user = await User.create({
               name: req.body.name,
               email: req.body.email,
               password: hashPassword
          })

          //return token 
          let data = {
               user: {
                    id: user.id
               }
          }
          const jwtData = await jwt.sign(data, secrete);
          success=true;
          res.json({success,jwtData});
     } catch (error) {
          console.error(error.maessage);
          res.status(500).send("some Error Occured");
     }
})

// login 
router.post('/login', [
     // predifiend validation
     body('email', "enter Valid Email").isEmail(),
     body('password', "Password Cant Be Blank").exists()
], async (req, res) => {
     //here it is used t send the erro massage 
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() })
     }

     const {email,password} = req.body;
     try {
           let success=false;
          //checking there user exist or not
          let user = await User.findOne({email:email});
          if(!user){
               return res.status(401).json({success,error:"invalid Credential"});
          }


          //comparing the passwords
          var validPass=await bcrypt.compare(password , user.password);
          if(!validPass){
               return res.status(401).json({success,error:"invalid Credential"});
          }

          //sending the token after authentification
          let data = {
               user: {
                    id: user.id
               }
          }
          const jwtData = await jwt.sign(data, secrete);
          success=true;
          res.json({success,jwtData});

     } catch (error) {
          console.error(error.maessage);
          res.status(500).send("some Error Occured");
     }
})

//get User data
router.post('/GetUser', fetchuser,async(req,res)=>{
     try {
          let userId=req.user.id;
          let user = await User.findOne({_id:userId}).select("-password");
          res.send(user);
     } catch (error) {
          console.error(error.message);
          res.status(500).send("some Error Occured");
     }
})

module.exports = router;