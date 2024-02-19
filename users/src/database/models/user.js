
module.exports = async (db, Sequelize) =>
  db.define(
    'User',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: Sequelize.STRING,
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      password: Sequelize.STRING,
      roles: {
        type: Sequelize.STRING,
        defaultValue: "3"
      }
    },
    {
      timestamps: false
    }
  )
