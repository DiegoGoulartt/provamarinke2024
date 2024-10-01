const { DataTypes } = require("sequelize")
const sequelize = require("../database/db")
const Contracts = require("./contracts")

const Jobs = sequelize.define('jobs', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    contractId: {
        type: DataTypes.INTEGER,
        references: {
            model: Contracts,
            key: 'id',
        },
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    paymentDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    operationDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    price: {
        type: DataTypes.REAL,
        allowNull: false,
    },
    paid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    timestamps: false,
});
  
module.exports = Jobs;
