const Jobs = require("../models/jobs")
const Payments = require("../models/payments")

exports.getUnpaidJobsTotal = async (req, res) => {
    try{
        const jobsList = await Jobs.findAll()

        let unpaidJobsTotal = 0

        for (const job of jobsList) {
            const totalPayments = await Payments.sum('paymentValue', { where: { jobId: job.id } });
      
            if (totalPayments < job.price) {
              unpaidJobsTotal += job.price - totalPayments; 
            }
        }

        return res.status(200).json({
            message: "Soma total de jobs não pagos integralmente calculada com sucesso!",
            unpaidJobsTotal
        })

    }catch (error){
        return res.status(500).json(
            { message: "Erro ao calcular a soma de jobs não pagos integralmente"}
        )
    }
}
