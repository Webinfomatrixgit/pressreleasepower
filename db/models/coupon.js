const Sequelize = require('sequelize')
const db = require('../index')
const database = db.sequelize

// 1) Create Model or Entity.
class Coupon extends Sequelize.Model {

}

// 2) Create Attributes or Columns.
const attributes = {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    type: {
        type: Sequelize.INTEGER
    },
    coupon_type: {
        type: Sequelize.STRING(100)
    },
    code: {
        type: Sequelize.STRING(100)
    },
    percent: {
        type: Sequelize.STRING(100)
    },
    expire_start: {
        type: Sequelize.DATE
    },
    expire_end: {
        type: Sequelize.DATE
    },
    total_no: {
        type: Sequelize.INTEGER
    },
    attempt_no : {
        type: Sequelize.INTEGER
    }
}

// 3) Create Options for table.
const options = {
    sequelize: database,
    modelName: 'coupon',
    // It will not make modelName plural, default value is false.
    freezeTableName: true,
    // It will not create createdAt and updatedAt columns in table.
    timestamps: false
}

module.exports = Coupon.init(attributes, options)
