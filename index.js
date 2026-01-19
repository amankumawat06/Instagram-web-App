require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express()
const port = process.env.PORT || 8080;
const methodOverride = require("method-override")
const userRoutes = require("./routes/userRoutes")
const {connectDB} = require("./config/db")

app.set("views", path.join(__dirname,"/views"))
app.set("view engine", "ejs")
app.use(methodOverride("_method"))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use("/", userRoutes)

// MongoDB Connection
connectDB()

app.use((req,res) => {
    res.render("Error.ejs")
})

app.listen(port, () => {
    console.log(`Server is waiting for requests on Port ${port}`)
})