const sequelize = require("../DBconfing/DBconnection")
const { DataTypes, Model } = require("sequelize")
const Merchant = require("./merchant")
const Categorie = require("./Categorie")




class Product extends Model {

}


Product.init({
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

    productName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false
    },

    image: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },

    categorie_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Categorie,
            key: "id"
        }
    },

    size: {
        type: DataTypes.STRING
    },

    color: {
        type: DataTypes.STRING
    },

    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    MerchantId: {
        type: DataTypes.INTEGER,
        references: {
            model: Merchant,
            key: 'id'
        }
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: "Product",
    indexes: [{ unique: true, fields: ["MerchantId", "productName"] }]
})



Merchant.hasMany(Product, {
    foreignKey: "MerchantId"
}, { onDelete: 'cascade', hooks: true });

Product.belongsTo(Merchant, { foreignKey: "MerchantId", constraints: false })


Categorie.hasMany(Product, {
    foreignKey: "categorie_Id"
}, { onDelete: 'cascade', hooks: true });


Product.belongsTo(Categorie, { foreignKey: "categorie_Id", constraints: false })


module.exports = Product   
