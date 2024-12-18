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
    discount: {
        type: Sequelize.BIGINT,
    },
    label: {
        type: Sequelize.STRING(100)
    },
    type: {
        type: Sequelize.BIGINT,
    },
    sub_type: {
        type: Sequelize.STRING(100)
    },
    expiration_days: {
        type: Sequelize.BIGINT,
    },
    pr_count: {
        type: Sequelize.BIGINT,
    },
    package_item: {
        type: Sequelize.STRING(255)
    },
    featured: {
        type: Sequelize.SMALLINT
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



