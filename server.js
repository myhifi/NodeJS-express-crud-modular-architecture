// 1) Import Express
const express = require("express");

// 2) Create a Server
const app = express();

// Middleware to Read JSON
app.use(express.json());

// import routes
const userRoutes = require("./routes/users_route");

// use Routes
app.use("/users" , userRoutes);


// 3) Listen
app.listen(5000 , ()=>{
    console.log("Server is Runnng on Port 5000");
})

// Task make another route:
// products:
//     id
//     name
//     salary(Price)