const sequelize = require("../DBconfing/DBconnection")
const { DataTypes, Model } = require("sequelize")
const jwt = require("jsonwebtoken");



class Merchant extends Model {
    generateToken() {
        this.token = jwt.sign({ id: this.id }, 'secret');
    }
}



Merchant.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        noUpdate: {
            readOnly: true
        }
    },

    userName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    country: {
        type: DataTypes.STRING,
        allowNull: false
    },

    phoneNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

},
    {
        sequelize,
        modelName: "Merchant"
    })


module.exports = Merchant


