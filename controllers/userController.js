const User = require("../models/userModel");
const mongoose = require("mongoose");

exports.home = async (req, res) => {
  let instaUsers = await User.find();
  res.render("home.ejs", { instaUsers });
};

//Add user
exports.newUser = (req, res) => {
  res.render("new.ejs");
};

exports.createUser = async (req, res) => {
  let { name, username, bio, Img, followers, following, isFollow } = req.body;
  let ImageURL = req.file?.path;

  await User.create({
    name,
    username,
    bio,
    Img: ImageURL,
    followers: Number(followers),
    following: Number(following),
    isFollow: isFollow,
  });
  res.redirect("/");
};

// Edit
exports.editUserPage = async (req, res) => {
  let { id } = req.params;

  InvaildIdHandler(id);
  let user = await User.findById(id);
  if (!user) {
    return res.status(404).send("User not found");
  }
  res.render("Edit.ejs", { user });
};

exports.updateUser = async (req, res) => {
  let { id } = req.params;

  InvaildIdHandler(id);
  await User.findByIdAndUpdate(id, {
    bio: req.body.bio,
    followers: req.body.followers,
    following: req.body.following,
  });
  res.redirect("/");
};

// Show
exports.showUser = async (req, res) => {
  let { id } = req.params;

  InvaildIdHandler(id);
  let user = await User.findById(id);
  if (!user) {
    return res.render("Error.ejs");
  }
  res.render("Show.ejs", { user });
};

// Delete
exports.deleteUser = async (req, res) => {
  let { id } = req.params;

  InvaildIdHandler(id);
  instaUsers = await User.findByIdAndDelete(id);
  res.redirect("/");
};

// Message
exports.MessagePage = async (req, res) => {
  let { id } = req.params;

  InvaildIdHandler(id);
  let user = await User.findById(id);
  if (!user) {
    return res.status(404).send("User not found");
  }
  res.render("Message.ejs", { user });
};

exports.sendMessage = async (req, res) => {
  let { id } = req.params;

  InvaildIdHandler(id);
  let { message } = req.body;
  let user = await User.findById(id);
  res.render("MessageSent.ejs", { user, message });
};

// Follow
exports.followUser = async (req, res) => {
  let { id } = req.params;

  InvaildIdHandler(id);
  let user = await User.findById(id);
  if (!user) {
    return res.render("Error.ejs");
  }
  if (user.isFollow) {
    user.followers -= 1;
    user.isFollow = false;
  } else {
    user.followers += 1;
    user.isFollow = true;
  }
  await user.save();
  res.redirect(`/`);
};

const InvaildIdHandler = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("Invalid user id");
  }
};
