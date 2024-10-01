const Contracts = require("../models/contracts")

exports.createContract = async (req, res) => {
    try {
        const {termes, clientId, contractorId, status } = req.body

        const ContractCreated = await Contracts.create({
            termes, clientId, contractorId, status
        })
        return res.status(201).json(ContractCreated)
    } catch (error){
        return res.status(500).json({message: "Erro ao fazer contrato"})
    }
}
