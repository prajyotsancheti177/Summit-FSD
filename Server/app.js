const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
require("./db/connection");
const router = require("./Routes/router")
const port = 8001;

app.get("/",(req,res)=>{
    res.send("server start")
})

//middleware
app.use(express.json());
app.use(cors());

app.use(router);


app.listen(port,()=>{
    console.log("Server start at port no "+ port);
})