// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  gender: {
    type: DataTypes.ENUM('male', 'female'),
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  profile_picture: {
    type: DataTypes.STRING,
  },
  bio: {
    type: DataTypes.TEXT,
  }
}, {
  timestamps: true
});

module.exports = User;
