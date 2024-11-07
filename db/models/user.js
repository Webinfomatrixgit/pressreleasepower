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
    first_name: {
        type: Sequelize.STRING(100)
    },
    last_name: {
        type: Sequelize.STRING(100)
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
    password: {
        type: Sequelize.STRING(100)
    },
    email_otp: {
        type: Sequelize.STRING(20)
    },
    phone_otp: {
        type: Sequelize.STRING(20)
    },
    email_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    phone_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    user_type: {
        type: Sequelize.STRING(50)
    }
}

// 3) Create Options for table.
const options = {
    sequelize: database,
    modelName: 'user',
    // It will not make modelName plural, default value is false.
    freezeTableName: true,
    // It will not create createdAt and updatedAt columns in table.
    timestamps: true
}

module.exports = User.init(attributes, options)

module.exports.UserType = {
    SUPER_ADMIN: 'SUPER_ADMIN',
    ADMIN: 'ADMIN',
    USER: 'USER'
}

module.exports.UserStatus = {
    ACTIVE: 0,
    ACH_PAYMENT_FAILED: 1,
    LANEAXIS_DISABLE: 2,
    SELF_DELETE: 3
}

