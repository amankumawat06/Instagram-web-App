const multer = require("multer")
const {CloudinaryStorage} = require("multer-storage-cloudinary")
const cloudinary = require("../config/cloudinary")

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder: "instagram-users",
        allowed_formats: ["jpg","png","avif","webp","jpeg"]
    }
})

module.exports = multer({storage})