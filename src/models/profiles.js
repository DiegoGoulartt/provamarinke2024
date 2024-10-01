const { DataTypes } = require("sequelize")
const sequelize = require("../database/db")

const Profiles = sequelize.define('profiles', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(180),
      allowNull: false,
    },
    profession: {
      type: DataTypes.STRING(200),
    },
    balance: {
      type: DataTypes.REAL,
      allowNull: false,
      defaultValue: 0.0,
    },
    type: {
      type: DataTypes.ENUM('cliente', 'contratado'),
      allowNull: false,
    }
  }, {
    timestamps: false, 
  });
  
module.exports = Profiles;
