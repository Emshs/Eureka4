// models/GroupUser.js
const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Group = require('./Group');
const User = require('./User');

const GroupUser = sequelize.define('GroupUser', {
  group_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Group,
      key: 'id'
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  joined_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = GroupUser;
