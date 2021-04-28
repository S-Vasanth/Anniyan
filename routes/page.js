const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});
router.get("/register", (req, res) => {
  res.render("register");
});
router.get("/login", (req, res) => {
  res.render("type");
});
router.get("/userlogin", (req, res) => {
  res.render("userlogin");
});
router.get("/adminlogin", (req, res) => {
  res.render("adminlogin");
});

module.exports = router;
