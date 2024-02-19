module.exports = async (db, Sequelize) =>
  db.define(
    'Invoice',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      total: Sequelize.STRING,
      userId: Sequelize.INTEGER
    }
  )

