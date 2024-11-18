const Sequelize = require('sequelize')
const db = require('../index')
const database = db.sequelize

// 1) Create Model or Entity.
class User extends Sequelize.Model {

}

// 2) Create Attributes or Columns.
const attributes = {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING(100)
    },
    first_name: {
        type: Sequelize.STRING(100)
    },
    last_name: {
        type: Sequelize.STRING(100)
    },
    username: {
        type: Sequelize.STRING(50)
    },
    email: {
        type: Sequelize.STRING(100),
        unique: true,
        validate: {
            isEmail: true
        }
    },
    image: {
        type: Sequelize.STRING(191),
    },
    phone: {
        type: Sequelize.STRING(15)
    },
    website: {
        type: Sequelize.STRING(255)
    },
    facebook: {
        type: Sequelize.STRING(255)
    },
    twiter: {
        type: Sequelize.STRING(255)
    },
    linkedin: {
        type: Sequelize.STRING(255)
    },
    about: {
        type: Sequelize.STRING(255)
    },
    password: {
        type: Sequelize.STRING(191)
    },
    remember_token: {
        type: Sequelize.STRING(100)
    },
    package: {
        type: Sequelize.STRING(255)
    },
    package_id: {
        type: Sequelize.BIGINT,
    },
    company_id: {
        type: Sequelize.BIGINT,
    },
    pr: {
        type: Sequelize.BIGINT,
    },
    wr: {
        type: Sequelize.BIGINT,
    },
    vpr: {
        type: Sequelize.BIGINT,
    },
    event: {
        type: Sequelize.BIGINT,
    },
    duration: {
        type: Sequelize.BIGINT,
    },
    noofpr: {
        type: Sequelize.BIGINT,
    },
    last_login: {
        type: Sequelize.DATE
    },
    last_login_ip: {
        type: Sequelize.STRING(100)
    },
    verified: {
        type: Sequelize.SMALLINT
    },
    is_newsletter: {
        type: Sequelize.SMALLINT
    },
    status: {
        type: Sequelize.BOOLEAN
    },
    user_type: {
        type: Sequelize.STRING(100)
    }
}

// 3) Create Options for table.
const options = {
    sequelize: database,
    modelName: 'users',
    // It will not make modelName plural, default value is false.
    freezeTableName: true,
    // It will not create createdAt and updatedAt columns in table.
    timestamps: false
}

module.exports = User.init(attributes, options)

module.exports.UserType = {
    SUPER_ADMIN: 'SUPER_ADMIN',
    ADMIN: 'ADMIN',
    USER: 'USER'
}


