const sequelize = require("../DBconfing/DBconnection")
const { DataTypes, Model } = require("sequelize")
const User = require("./User")




class Order extends Model { }


Order.init({
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

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        }
    },

    buyNow: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    isConfirm: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    totalPrice: {
        type: DataTypes.INTEGER
    }
},
    {
        sequelize,
        modelName: "Order",
        // indexes: [{ unique: true, fields: ["userId", "id"] }]

    })



User.hasMany(Order, {
    foreignKey: "userId"
}, { onDelete: 'cascade', hooks: true });

Order.belongsTo(User, { foreignKey: "userId", constraints: false })


module.exports = Order