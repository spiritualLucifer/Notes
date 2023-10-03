const mongo = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();
const mongooseURL=process.env.MONGO_URL;

const connectToDB =()=>{
    mongo
    .connect(mongooseURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }) 
    .then(() => console.log('Database connected!'))
    .catch((err) => console.log(err))
}
module.exports = connectToDB;