const Jobs = require("../models/jobs")
const Contracts = require("../models/contracts")

exports.createJob = async (req, res) => {
    try {
        const {description, contractId, paymentDate, price} = req.body

        const contract = await Contracts.findByPk(contractId)

        if (!contract){
            return res.status(404).json({"message": "Contrato inexistente."})
        }

        const JobCreated = await Jobs.create({
            description, contractId, paymentDate, price
        })
        return res.status(201).json(JobCreated)
    } catch (error){
        return res.status(500).json({message: "Erro ao fazer um job"})
    }
}
