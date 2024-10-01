const { DataTypes } = require("sequelize")
const sequelize = require("../database/db")
const Profiles = require ("./profiles")

const Deposits = sequelize.define('deposits', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      references: {
        model: Profiles,
        key: 'id',
      },
    },
    operationDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    depositValue: {
      type: DataTypes.REAL,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });
  
module.exports = Deposits;
