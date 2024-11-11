const Sequelize = require('sequelize')
const db = require('../index')
const database = db.sequelize

// 1) Create Model or Entity.
class Companies extends Sequelize.Model {

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
    slug: {
        type: Sequelize.STRING(255)
    },
    description: {
        type: Sequelize.TEXT
    },
    email: {
        type: Sequelize.STRING(100),
        unique: true,
        validate: {
            isEmail: true
        }
    },
    phone: {
        type: Sequelize.STRING(15)
    },
    contact_person: {
        type: Sequelize.STRING(191)
    },
    website: {
        type: Sequelize.STRING(255)
    },
    city_name: {
        type: Sequelize.STRING(255)
    },
    state_name: {
        type: Sequelize.STRING(255)
    },
    country_name: {
        type: Sequelize.STRING(20)
    },
    city_id: {
        type: Sequelize.INTEGER
    },
    state_id: {
        type: Sequelize.INTEGER
    },
    country_id: {
        type: Sequelize.INTEGER
    },
    address: {
        type: Sequelize.STRING(255)
    },
    logo: {
        type: Sequelize.STRING(255)
    },
    status: {
        type: Sequelize.BOOLEAN
    },
    user_limit: {
        type: Sequelize.INTEGER
    },
    storage_limit: {
        type: Sequelize.INTEGER
    }
}

// 3) Create Options for table.
const options = {
    sequelize: database,
    modelName: 'companies',
    // It will not make modelName plural, default value is false.
    freezeTableName: true,
    // It will not create createdAt and updatedAt columns in table.
    timestamps: false
}

module.exports = Companies.init(attributes, options)



