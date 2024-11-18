const Sequelize = require('sequelize')
const db = require('../index')
const database = db.sequelize

// 1) Create Model or Entity.
class Articles extends Sequelize.Model {

}

// 2) Create Attributes or Columns.
const attributes = {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    user_id: {
        type: Sequelize.BIGINT
    },
    package_id: {
        type: Sequelize.BIGINT
    },
    category_id: {
        type: Sequelize.BIGINT
    },
    country_id: {
        type: Sequelize.BIGINT
    },
    company_id: {
        type: Sequelize.BIGINT
    },
    title: {
        type: Sequelize.STRING(255)
    },
    slug: {
        type: Sequelize.STRING(255)
    },
    content: {
        type: Sequelize.TEXT
    },
    description: {
        type: Sequelize.STRING(255)
    },
    image: {
        type: Sequelize.STRING(255)
    },
    alt_tag: {
        type: Sequelize.STRING(255)
    },
    feed: {
        type: Sequelize.INTEGER
    },
    most_viewed: {
        type: Sequelize.INTEGER
    },
    publish_datetime: {
        type: Sequelize.DATE
    },
    meta_title: {
        type: Sequelize.STRING(191)
    },
    meta_description: {
        type: Sequelize.TEXT
    },
    meta_keywords: {
        type: Sequelize.TEXT
    },
    press_type : {
        type: Sequelize.STRING(10)
    },
    status: {
        type: Sequelize.BOOLEAN
    },
    type : {
        type: Sequelize.TINYINT
    },
    video_url : {
        type: Sequelize.STRING(255)
    },
    created_by : {
        type: Sequelize.INTEGER.UNSIGNED
    },
    updated_by : {
        type: Sequelize.INTEGER.UNSIGNED
    }
}

// 3) Create Options for table.
const options = {
    sequelize: database,
    modelName: 'articles',
    // It will not make modelName plural, default value is false.
    freezeTableName: true,
    // It will not create createdAt and updatedAt columns in table.
    timestamps: false
}

module.exports = Articles.init(attributes, options)



