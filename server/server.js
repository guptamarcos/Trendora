require("dotenv").config();

const express = require("express");
const app = express();
const connectDb = require("./Db/connect.js");

const port = process.env.PORT || 8080;

// CONNECT THE DATABASE AND START THE SERVER 
connectDb()
  .then(() => {

    // CREATE AND START THE SERVER
    app.listen(port, () => {
      console.log(`Server is listening on the port ${port}`);
    });

    console.log("Database Connected Successfully!!");
  })
  .catch((err) => {
    console.log("Database connection failed \n", err);
    process.exit(1);
  });


app.use("/", (req, res) => {
  res.send("Welcome to the Trendora!!");
});

// ERROR HANDLING MIDDLEWARE 
app.use((req,res,next,err)=>{
   const { status=500 , message="Internal Server Error" } = err;
   return res.status(status).json({success: false, message })
});
