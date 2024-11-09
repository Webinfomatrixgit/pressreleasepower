const Sequelize = require('sequelize')
const db = require('../index')
const database = db.sequelize

// 1) Create Model or Entity.
class Package extends Sequelize.Model {

}

// 2) Create Attributes or Columns.
const attributes = {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING(100)
    },
    price: {
        type: Sequelize.BIGINT,
    },
    label: {
        type: Sequelize.STRING(100)
    },
    status: {
        type: Sequelize.BOOLEAN
    }
}

// 3) Create Options for table.
const options = {
    sequelize: database,
    modelName: 'package',
    // It will not make modelName plural, default value is false.
    freezeTableName: true,
    // It will not create createdAt and updatedAt columns in table.
    timestamps: true
}

module.exports = Package.init(attributes, options)



