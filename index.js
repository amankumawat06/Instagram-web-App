const express = require("express");
const path = require("path");
const app = express()
const PORT = 8080;
const { v4 : uuidv4 } = require("uuid")
const methodOverride = require("method-override")

app.use(methodOverride("_method"))

app.use(express.static(path.join(__dirname, "public")))
app.use(express.static(path.join(__dirname, "public/css")))
app.use(express.static(path.join(__dirname, "public/js")))

app.use(express.urlencoded({extended:true}))
app.use(express.json())

let instaUsers = [
    {
        userId : uuidv4(),
        name : "Aman kumawat",
        username: "amankumawat06",
        Img: "/Images/aman.png",
        bio : "Full Stack Developer Intern at webMobi360",
        followers: 289,
        following: 192,
        isFollow: false
    },
    {
        userId : uuidv4(),
        name : "Nikhil sharma",
        username: "nikhilkhandal45",
        Img: "/Images/nikhil.avif",
        bio : "Founder & CEO of AdMediaX",
        followers: 170,
        following: 89,
        isFollow: false
    },
    {
        userId : uuidv4(),
        name : "Saurabh kumawat",
        username: "saurabhkmwt23",
        Img: "/Images/saurabh.avif",
        bio : "Pharmacy Student at Dhanmantri University",
        followers: 590,
        following: 700,
        isFollow: false
    },
    {
        userId : uuidv4(),
        name : "Nishant",
        username: "nishantt98",
        Img: "/Images/nishant.jpg",
        bio : "BCA Final Year student at Apex university",
        followers: 51,
        following: 49,
        isFollow: false
    }
]


// Index Route
app.get("/instagram", (req,res) => {
    res.render("Home.ejs", { instaUsers })
})

//Add new user
app.get("/instagram/new",(req,res) => {
    res.render("new.ejs")
})

app.post("/instagram", (req,res) => {
    let {name,username,bio,Img,followers,following} = req.body;
    let userId = uuidv4();
    instaUsers.push({userId,name,username,bio,Img,followers:Number(followers),following:Number(followers)})
    res.redirect("/instagram")
})

// Edit Profile
app.get("/instagram/:id/edit",(req,res) =>{
    let {id} = req.params
    let User = instaUsers.find((i) => i.userId === id)
    if(!User){
        return res.status(404).send("User not found")
    }
    res.render("Edit.ejs", {User})
})

app.patch("/instagram/:id", (req,res) => {
    let {id} = req.params;
    let updatedUserProfile = req.body.bio
    let userData = instaUsers.find((i) => i.userId === id) 
    userData.bio = updatedUserProfile;
    userData.followers = req.body.followers;
    userData.following = req.body.following;
    res.redirect("/instagram")
})


// Show user
app.get("/instagram/:id",(req,res) => {
    let {id} = req.params;
    let user = instaUsers.find((u) => u.userId === id)
    if(!user){
        return res.render("Error.ejs")
    }
    res.render("Show.ejs", { user })
})

// Destroy User
app.delete("/instagram/:id",(req,res) => {
    let {id} = req.params;
    instaUsers = instaUsers.filter((u) => u.userId !== id)
    res.redirect("/instagram")
})

// Send Message
app.get("/instagram/:id/msg",(req,res) => {
    let {id} = req.params;
    let user = instaUsers.find((u) => u.userId === id)
    if(!user){
        return res.status(404).send("User not found")
    }
    res.render("Message.ejs",{user})
})

app.post("/instagram/:id/sent",(req,res) => {
    let {id} = req.params;
    let {message} = req.body
    let user = instaUsers.find((u) => u.userId === id)
    res.render("MessageSent.ejs", {user,message})
})

//Follow User
app.post("/instagram/:id/follow",(req,res) => {
    let {id} = req.params;
    let user = instaUsers.find((u) => u.userId === id)
    if(!user){
        return res.render("Error.ejs")
    }
    if(user.isFollow){
        user.followers -= 1
        user.isFollow = false
    }else{
        user.followers += 1
        user.isFollow = true
    }
    res.redirect(`/instagram`)
})

app.use((req,res) => {
    res.render("Error.ejs")
})

app.listen(PORT, () => {
    console.log(`Server is waiting for requests on Port ${PORT}`)
})