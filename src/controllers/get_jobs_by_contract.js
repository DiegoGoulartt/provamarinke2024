const Jobs =  require("../models/jobs")

exports.getJobByIdContract = async (req, res) => {
    try{
        const { contractId } = req.params
        const jobsList = await Jobs.findAll({ where: {contractId: contractId} })

        if (jobsList.length == 0){
            return res.status(404).json({ message: "Nenhum job encontrado para este contrato."})
        }

        return res.status(200).json(jobsList)
    }catch (error){
        return res.status(500).json({ message: "Erro ao listar jobs",})
    }
}