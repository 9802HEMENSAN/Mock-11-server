const express = require("express")
const { connection } = require("./controllers/connection")
const {  UserDetails } = require("./routes/user.route")
const { EMIRouter } = require("./routes/emi.route")
const { auth } = require("./Middleware/auth.middleware")
const cors = require("cors")
require("dotenv").config()
const app = express()
app.use(cors())
app.use(express.json())
 
app.use("/user", UserDetails)
app.use(auth)
app.use("/emi",  EMIRouter )
 
app.listen(8081 , async () => {
    try {
        await connection
        console.log("connected")
    } catch (error) {
        console.log(error)
    }   
    console.log("connected to db")
})



