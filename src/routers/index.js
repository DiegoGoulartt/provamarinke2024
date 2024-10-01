const { Router } = require("express")

const sequelize = require("../database/db")
const Deposits = require('../models/deposits')
const Contracts = require('../models/contracts')
const Jobs = require('../models/jobs')
const Payments = require('../models/payments')
const createProfileController = require("../controllers/create_profile")
const getProfileBalanceController = require("../controllers/get_profile_balance")
const createDepositController = require("../controllers/create_deposits")
const createContractController = require("../controllers/create_contract")
const createjobController = require("../controllers/create_jobs")
const getJobByIdContractController = require("../controllers/get_jobs_by_contract")
const createPaymentController = require("../controllers/create_payments")
const getUnpaidJobsTotalController = require("../controllers/get_unpaid_jobs")

sequelize.sync({ force: false })
  .then(() => {
    console.log('Tabelas sincronizadas com sucesso');
})
  .catch(err => {
    console.error('Erro ao sincronizar tabelas:', err);
})

const routers = Router()

// POST
routers.post("/create/profile/", createProfileController.createProfile)
routers.post("/create/deposit", createDepositController.createDeposit)
routers.post("/create/contract", createContractController.createContract)
routers.post("/create/job", createjobController.createJob)
routers.post("/create/payment", createPaymentController.createPayment)

//GET
routers.get("/get-balace/:id/profile", getProfileBalanceController.getProfileBalance)
routers.get("/get-jobs/:contractId/contract", getJobByIdContractController.getJobByIdContract)
routers.get("/get-unpaid-jobs-sum", getUnpaidJobsTotalController.getUnpaidJobsTotal)

module.exports = routers
