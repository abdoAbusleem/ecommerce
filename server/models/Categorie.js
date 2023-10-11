const sequelize = require("../DBconfing/DBconnection")
const { DataTypes, Model } = require("sequelize")




class Categorie extends Model { }


Categorie.init({
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

    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
},
    {
        sequelize,
        modelName: "Categorie"
    })


module.exports = Categorie