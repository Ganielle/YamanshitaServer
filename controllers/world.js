const { default: mongoose } = require("mongoose");
const Worlds = require("../models/world")

exports.getworlds = async (req, res) => {
    const {username} = req.query

    const worldsdata = await Worlds.find({owner: username})
    .then(data => data)
    .catch(err => res.status(301).json({ message: "bad-request", data: "There's a problem with the server! Please try again later" }))

    return res.json({message: "success", data: worldsdata})
}

exports.saveworlds = async (req, res) => {
    const {username, stageone, stagetwo, stagethree, stagefour, stagefive} = req.body

    await Worlds.findOneAndUpdate({owner: username}, {stageone: stageone, stagetwo: stagetwo, stagethree: stagethree, stagefour: stagefour, stagefive: stagefive})
    .catch(err => res.status(301).json({ message: "bad-request", data: "There's a problem with the server! Please try again later" }))
    
    return res.json({message: "success"})
}