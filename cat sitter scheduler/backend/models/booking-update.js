'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BookingUpdate extends Model {
    static associate(models) {
        BookingUpdate.belongsTo(models.Booking, { foreignKey: 'bookingId', as: 'Booking' });
        BookingUpdate.belongsTo(models.User, { foreignKey: 'senderId', as: 'Sender' });
    }
  }

  BookingUpdate.init(
    {
      bookingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Bookings', // Reference to the Bookings table
          key: 'id',
        },
      },
      senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Reference to the Users table
          key: 'id',
        },
      },
      videoLink: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'BookingUpdate',
    }
  );

  return BookingUpdate;
};
