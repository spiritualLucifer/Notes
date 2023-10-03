const connectToDB = require('./db');
const expr = require('express');
const app =expr();
const cors = require('cors');
const dotenv = require("dotenv");

dotenv.config();

connectToDB();//connected to database
app.use(cors());
app.use(expr.json());

app.use("/api/auth", require('./routes/auth.js'));
app.use("/api/notes", require('./routes/notes.js'));

const PORT = process.env.PORT || 6969;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})