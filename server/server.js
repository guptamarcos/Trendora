const express = require("express");
const app = express();

const port = 8080;

app.use("/",(req,res)=>{
    res.send("Welcome to the Trendora!!")
});

// CREATE AND START THE SERVER 
app.listen(port,()=>{
    console.log(`Server is listening on the port ${port}`);
})