const sequelize = require("../DBconfing/DBconnection")
const { DataTypes, Model } = require("sequelize")
const User = require("../models/User")
const Product = require("../models/Product")
const Order = require("./Order")

class Cart extends Model { }

Cart.init({
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

    orderId: {
        type: DataTypes.INTEGER,
        references: {
            model: Order,
            key: "id"
        }


    },

    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: "id"
        }
    },

    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1

    },
},
    {
        sequelize,
        modelName: "Cart"
    })



// Cart.hasMany(Product, {
//     foreignKey: "productId"
// }, { onDelete: 'cascade', hooks: true });

Cart.belongsTo(Product, { foreignKey: "productId" })

// Cart.hasMany(User, {
//     foreignKey: "userId"
// }, { onDelete: 'cascade', hooks: true });


User.belongsTo(Cart, { foreignKey: "userId", constraints: false })


Order.hasMany(Cart, {
    foreignKey: "orderId"
}, { onDelete: 'cascade', hooks: true });


Cart.belongsTo(Order, { foreignKey: "orderId" })

module.exports = Cart   
