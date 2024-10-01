const Profiles = require("../models/profiles")

exports.getProfileBalance = async (req, res) => {
    try{
        const { id } = req.params
        const profile = await Profiles.findByPk(id)

        if (!profile){
            return res.status(404).json({"message": "Perfil não encontrado"})
        }

        return res.status(200).json({balance: profile.balance})
    }catch (error){
        return res.status(500).json({"message": "Erro ao resgatar saldo"})
    }
}