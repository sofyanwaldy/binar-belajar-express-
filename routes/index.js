const express = require("express");
const router = express.Router();
const articleRouter = require("./apiArticles");
const passport = require("../lib/passport");
const { users } = require("../models");

// const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

/* GET home page. */
router.get("/", (req, res) => {
  res.render("index", { user: req.user });
});

// MVC
router.get("/register", (req, res) => res.render("register"));
router.post("/register", (req, res) => {
  users
    .register(req.body)
    .then(() => {
      res.redirect("/login");
    })
    .catch((err) => next(err));
});

// MCR
router.get("/users", authMiddleware.authApi, (req, res) => {
  users
    .findAll()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json({
        err: err.message,
      });
    });
});

router.post("/users", (req, res) => {
  const { username, password } = req.body;
  users
    .register({
      username,
      password,
    })
    .then((result) => {
      res.json({
        message: "berhasil membuat user baru",
      });
    });
});

// MVC
router.get("/login", function (req, res, next) {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

// MCR/RESTAPI jsonWebToken
router.post("/user/login", async function (req, res, next) {
  const { username, password } = req.body;

  const userData = await users.findOne({
    username: username,
  });

  const token = jwt.sign(
    {
      username: userData.username,
      userId: userData.id,
      isSuperuser: userData.isSuperuser,
    },
    "secret-key"
  );

  users
    .authenticate({ username, password })
    .then(() => {
      return res.json({
        token: token,
      });
    })
    .catch(() => {
      return res.json({
        message: "invalid username or password",
      });
    });
});

router.get("/logout", function (req, res, next) {
  req.session.is_logged_in = false;
  res.send("berhasil logout");
});

// router.post("/user/login", function (req, res, next) {
//   const { username, password } = req.body;

//   if (username === superuser.username && password === superuser.password) {
//     req.session.is_logged_in = true;
//     return res.redirect("/articles");
//   }

//   req.session.is_logged_in = false;
//   return res.send("username atau password salah");
// });

router.use("/articles", articleRouter);
// router.get('/users', () => {
//   users.find({
//     where: {
//       isSuperuser: true
//     }
//   })
// })

module.exports = router;
