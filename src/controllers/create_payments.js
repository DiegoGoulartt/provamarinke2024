const Payments = require("../models/payments")
const Jobs = require("../models/jobs")
const Contracts = require("../models/contracts")
const Profiles = require("../models/profiles")


exports.createPayment = async (req, res) => {
    const { jobId, paymentValue } = req.body;

    try{
        if(paymentValue < 0){
            return res.status(400).json({ message: "O valor de pagamento inferior a 0" })
        }

        const job = await Jobs.findByPk(jobId)
        if (!job){
            return res.status(404).json({ message: "Job inexistente." })
        }

        const contract = await Contracts.findByPk(job.contractId)
        if (!contract) {
            return res.status(404).json({ message: "Contrato inexistente." })
        }

    
        const client = await Profiles.findByPk(contract.clientId);
        const contractor = await Profiles.findByPk(contract.contractorId);
        if (!client || !contractor) {
            return res.status(404).json({ message: "Cliente ou contratado inexistente." })
        }

        client.balance -= paymentValue
        contractor.balance += paymentValue

        if (client.balance < 0) {
            return res.status(400).json({ message: 'O cliente não possui saldo suficiente.' })
        }

        await client.save();
        await contractor.save();

        const payment = await Payments.create({ jobId, paymentValue })

        res.status(201).json({
            message: 'Pagamento realizado com sucesso!',
            payment
        })

    } catch (error){
        return res.status(500).json({ message: "Erro ao realizar pagamento" })
    }
}
