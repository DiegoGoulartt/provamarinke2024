const { DataTypes } = require("sequelize")
const sequelize = require("../database/db")
const Profiles = require("./profiles")

const Contracts = sequelize.define('contracts', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    termes: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    clientId: {
      type: DataTypes.INTEGER,
      references: {
        model: Profiles,
        key: 'id',
      },
    },
    contractorId: {
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
    status: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },
  }, {
    timestamps: false,
  });
  
module.exports = Contracts;
