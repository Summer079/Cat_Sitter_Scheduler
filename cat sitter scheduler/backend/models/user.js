'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Example association: User has many Bookings
      // this.hasMany(models.Booking, { foreignKey: 'userId' });
      User.hasMany(models.BookingUpdate, { foreignKey: 'senderId', as: 'SentUpdates' });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true, // Ensures valid email format
        },
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user', // Default role
        validate: {
          isIn: [['user', 'cat_sitter']], // Limits values to "User" or "Cat Sitter"
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
