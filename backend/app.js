require('dotenv').config()
const mongoose=require("mongoose");
const bodyParser= require("body-parser")
const cookieParser=require("cookie-parser")
const cors=require("cors");
const express = require('express');
const app = express();
const authRoutes=require("./routes/auth")

//db connections
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }).then(()=>{
    console.log("DB CONNECTED");
  })

//middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//my routes
app.use("/api",authRoutes)

//ports
const port = process.env.PORT;

//server 
app.listen(port, () => {
  console.log(`server running at port: ${port}`)
});