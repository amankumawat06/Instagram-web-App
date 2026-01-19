const { name } = require("ejs")
const mongoose = require("mongoose")

let userSchema = new mongoose.Schema({
    name: String,
    username : {
        type: String,
        unique: true
    },
    Img: String,
    bio: String,
    followers: {
        type: Number,
        default: 0,
    },
    following: {
        type: Number,
        default: 0,
    },
    isFollow:{
        type: Boolean,
        default: false
    }
})

let User = mongoose.model("User",userSchema)

module.exports = User 