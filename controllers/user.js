const { default: mongoose } = require("mongoose");
const Users = require("../models/user")
const Worlds = require("../models/world")
const bcrypt = require('bcrypt');

const encrypt = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

exports.login = async (req, res) => {
    const { username, password } = req.query;

    await Users.findOne({ username: { $regex: new RegExp('^' + username + '$', 'i') } })
    .then(async user => {
        if (user && (await user.matchPassword(password))){

            const world = await Worlds.findOne({owner: "qweqwe123"})
            .then(data => data)

            const data = {}

            data["stageone"] = world["stageone"]
            data["stagetwo"] = world["stagetwo"]
            data["stagethree"] = world["stagethree"]
            data["stagefour"] = world["stagefour"]
            data["stagefive"] = world["stagefive"]

            return res.json({message: "success", data: data})
        }
        else{
            return res.status(400).json({message: "invalidcredentials", data: "Please input your valid credentials and try again!"})
        }
    })
    .catch(err => res.status(400).json({ message: "bad-request", data: "There's a problem with the server! Please try again later" }))
}

exports.register = async (req, res) => {
    const {username, password, fullname} = req.body

    const user = await Users.findOne({ username: { $regex: new RegExp('^' + username + '$', 'i') } })
    .then(data => data)
    .catch(err => res.status(400).json({ message: "bad-request", data: "There's a problem with the server! Please try again later" }))

    if (user){
        return res.status(400).json({message: "failed", data: "Existing user! Please use different username"})
    }

    await Users.create({username: username, password: password, fullname: fullname})
    .catch(err => res.status(400).json({ message: "bad-request", data: "There's a problem with the server! Please try again later" }))

    await Worlds.create({owner: username, stageone: 1, stagetwo: 0, stagethree: 0, stagefour: 0, stagefive: 0 })
    .catch(async err => {
        await Users.findOneAndDelete({username: username})

        res.status(400).json({ message: "bad-request", data: "There's a problem with the server! Please try again later" })
    })

    return res.json({message: "success"})
}