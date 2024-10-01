const Profiles = require("../models/profiles")

exports.createProfile = async (req, res) => {
    try {
        const {
            firstName, lastName, profession, balance, type } = req.body

        const profilesCreated = await Profiles.create({
            firstName, lastName, profession, balance, type
        })

        return res.status(201).json(profilesCreated)
    } catch (error){
        return res.status(500).json({message: "Erro no cadstro de perfil"})
    }
}
