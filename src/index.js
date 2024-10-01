const express = require('express')
const cors = require("cors")
const routers = require("./routers/index")
const sequelize = require("./database/db")


require("dotenv").config()
const app = express();
app.use(express.json())
app.use(cors())
app.use(routers)

const PORT = process.env.PORT


sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    app.listen(PORT, () => {
        console.log(`Application running on localhost:${PORT}...`)
    })
})
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
});
