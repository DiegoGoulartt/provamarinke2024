const Profiles = require("../models/profiles")
const Deposits = require("../models/deposits")

exports.createDeposit = async (req, res) => {
    try{
        const { clientId, depositValue } = req.body
        if (depositValue < 0){
            return res.status(400).json({message: "O valor inválido para depósito." })
        }
        const clientProfile = await Profiles.findByPk(clientId)
        if (!clientProfile) {
            return res.status(404).json({ message: "Cliente inexistente." })
        }
        const DepositCreated = await Deposits.create({
            clientId,
            depositValue,
        })

        clientProfile.balance += depositValue;
        await clientProfile.save()

        return res.status(201).json({
            message: "Depósito realizado com sucesso!",
            deposit: DepositCreated
        })
    } catch (error){
        console.error("Erro ao fazer depósito:", error)
        return res.status(500).json({ message: 'Erro ao fazer depósito'});
    }
}

