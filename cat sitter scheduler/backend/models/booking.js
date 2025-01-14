'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      // Each booking belongs to a user
      Booking.hasMany(models.BookingUpdate, { foreignKey: 'bookingId', as: 'BookingUpdates' });
      Booking.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  Booking.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Assuming 'Users' is the user model
        key: 'id',
      }
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });

  return Booking;
};
