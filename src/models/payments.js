const { DataTypes } = require("sequelize")
const sequelize = require("../database/db")
const Jobs = require("./jobs")

const Payments = sequelize.define('payments', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    jobId: {
        type: DataTypes.INTEGER,
        references: {
            model: Jobs,
            key: 'id',
        },
    },
    operationDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    paymentValue: {
        type: DataTypes.REAL,
        allowNull: false,
    },
    }, {
        timestamps: false,
    }
);
  
module.exports = Payments;
