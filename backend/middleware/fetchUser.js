//jwt import
const jwt = require("jsonwebtoken");
const secrete = "iLikeBurgur";

const fetchUser =(req,res,next)=>{
      // fetch the token from the header
      const token = req.header('auth-token');
      
      if(!token){
        return res.status(401).send({error:"please authenticate using valid token"});
      }
      try { 
      let data = jwt.verify(token,secrete);
      req.user= data.user;
      next();
      } catch (error) {
        console.error("some internal Error Occured : ",error.messasge);
        res.json({error:"internal Error"});
      }
}
module.exports = fetchUser;