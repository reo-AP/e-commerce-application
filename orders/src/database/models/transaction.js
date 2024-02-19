module.exports = async (db, Sequelize) =>
  db.define(
    'Transaction',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      productId: Sequelize.INTEGER,
      invoiceId: Sequelize.INTEGER,
      cancled: Sequelize.INTEGER,
      quantity: Sequelize.INTEGER,
    },{
      timestamps: true
    }
  )
