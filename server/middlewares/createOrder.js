const Carts = require("../models/Cart")
const Products = require("../models/Product")
const Merchant = require("../models/merchant")
const Order = require("../models/Order")
const { Op } = require("sequelize")
const _ = require("lodash");

module.exports.createOrder = async function (req, res, next) {


    try {

        let findOrderId = await Order.findOrCreate({
            where: {
                [Op.and]: [
                    { id: req.body.orderId },
                    { userId: res.locals.id }
                ]
            },
            defaults: {
                userId: res.locals.id
            }
        })

        res.locals.order = findOrderId
        return next()

    } catch (err) {
        return res.status(401).send("you are not authorized to do any operation")
    }


}
