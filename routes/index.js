const routers = app => {
    console.log("Routers are all available");

    app.use("/user", require("./user"))
    app.use("/world", require("./world"))
}

module.exports = routers