const Sequelize = require('sequelize')
const db = require('../index')
const database = db.sequelize

// 1) Create Model or Entity.
class Videopr extends Sequelize.Model {

}

// 2) Create Attributes or Columns.
const attributes = {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    category_id : {
        type: Sequelize.BIGINT
    },
    country_id : {
        type: Sequelize.BIGINT
    },
    user_id : {
        type: Sequelize.BIGINT
    },
    name: {
        type: Sequelize.STRING(255)
    },
    slug : {
        type: Sequelize.STRING(255)
    },
    content : {
        type: Sequelize.TEXT
    },
    url : {
        type: Sequelize.STRING(255)
    },
    filename : {
        type: Sequelize.STRING(255)
    },
    meta_title : {
        type: Sequelize.STRING(255)
    },
    meta_keywords : {
        type: Sequelize.TEXT
    },
    meta_description : {
        type: Sequelize.TEXT
    },
    status: {
        type: Sequelize.BOOLEAN
    }
}

// 3) Create Options for table.
const options = {
    sequelize: database,
    modelName: 'videopr',
    // It will not make modelName plural, default value is false.
    freezeTableName: true,
    // It will not create createdAt and updatedAt columns in table.
    timestamps: false
}

module.exports = Videopr.init(attributes, options)



