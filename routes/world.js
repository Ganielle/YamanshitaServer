const router = require("express").Router()
const { getworlds, saveworlds } = require("../controllers/world")

router
    .get("/getworlds", getworlds)
    .post("/saveworlds", saveworlds)

module.exports = router;