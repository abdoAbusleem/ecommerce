const Order = require("../models/Order")
const Cart = require("../models/Cart")
const Products = require("../models/Product")










module.exports.findOrders = async (req, res) => {
    try {


        let findOrder = await Order.findAndCountAll({
            where: { userId: res.locals.id }, include: {
                model: Cart,
                include: { model: Products, attributes: ["productName", "id", "price", "image"] }
            }
        })

        if (findOrder.length == 0) {
            return res.status(400).send("not orders yet")
        }


        return res.status(200).send(findOrder)

    } catch (e) {
        return res.status(500).send(e.message)

    }

}






