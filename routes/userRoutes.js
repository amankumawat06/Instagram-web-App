const express = require("express")
const router = express.Router()
const userControllers = require("../controllers/userController")
const upload = require("../middleware/upload")
const{
    home,
    newUser,
    createUser,
    editUserPage,
    updateUser,
    showUser,
    deleteUser,
    MessagePage,
    sendMessage,
    followUser
} = require("../controllers/userController")


// Home
router.get("/", home)

// Add user
router.get("/new", newUser)
router.post("/",upload.single("Img"),createUser)

// Edit
router.get("/:id/edit",editUserPage)
router.patch("/:id", updateUser)

// Message 
router.get("/:id/msg", MessagePage)
router.post("/:id/sent", sendMessage)

// Follow
router.post("/:id/follow", followUser)

// show 
router.get("/:id", showUser)

// Delete
router.delete("/:id",deleteUser)

module.exports = router;