const router = require("express").Router()
const { login, register } = require("../controllers/user")

router
    .get("/login", login)
    .post("/register", register)

module.exports = router;