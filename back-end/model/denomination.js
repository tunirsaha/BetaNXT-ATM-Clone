const Denominations = sequelize.define("denominations", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  D100: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  D50: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  D20: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  D10: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  D5: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  D1: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
