// models/Group.js
const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./User');

const Group = sequelize.define('Group', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
  },
  leader_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  timestamps: true
});

module.exports = Group;
