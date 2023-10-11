const sequelize = require("../DBconfing/DBconnection")
const { DataTypes, Model } = require("sequelize")
const jwt = require("jsonwebtoken");



class User extends Model {
    generateToken() {
        this.token = jwt.sign({ id: this.id }, 'secret', {
            expiresIn: '2d'
        });
    }
}



User.init({
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
    }

},
    {
        sequelize,
        modelName: "User"
    })


module.exports = User


