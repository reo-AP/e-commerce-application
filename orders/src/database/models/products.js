module.exports = async(db, Sequelize) => {
    db.define('Product', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: Sequelize.STRING,
        stock: Sequelize.INTEGER,
        userId: Sequelize.INTEGER,
        catagory: Sequelize.STRING,
        price:Sequelize.INTEGER
      }, {
        timestamps: false
      })
    }