const Carts = require("../models/Cart")
const Products = require("../models/Product")
const Merchant = require("../models/merchant")
const Order = require("../models/Order")
const { Op } = require("sequelize")
const _ = require("lodash");




//add products to cart
module.exports.addToCart = async (req, res) => {
    try {

        let findProduct = await Products.findOne({ where: { id: req.body.productId } })

        if (!findProduct) {
            return res.status(400).send("product not found")
        }

        if (req.body.quantity > findProduct.stock || req.body.quantity == 0) {
            return res.status(400).send("your quantity more than stock")
        }


        let findOrderId = await Order.findOne({
            where: {
                [Op.and]: [
                    { isConfirm: false },
                    { userId: res.locals.id }
                ]
            }
        })

        if (!findOrderId) {
            let createId1 = await Order.create({ userId: res.locals.id, totalPrice: findProduct.price * req.body.quantity })
            let addToCart = Carts.build({ ...req.body })
            addToCart.orderId = createId1.id
            await addToCart.save()

            return res.send(addToCart)
        } else {
            let addToCart = Carts.build({ ...req.body })
            addToCart.orderId = findOrderId.id
            await addToCart.save()
            findOrderId.totalPrice += findProduct.price * req.body.quantity
            await findOrderId.save()

            return res.send(addToCart)
        }

    } catch (e) {
        return res.status(500).send(e.message)
    }
}


//delete products from cart
module.exports.deleteFromCart = async (req, res) => {
    try {
        let orderId = await Order.findOne({
            where: {
                [Op.and]: [
                    { isConfirm: false },
                    { userId: res.locals.id }
                ]
            }, include: { model: Carts, include: { model: Products } }
        })



        let destroy = await Carts.destroy({
            where: {
                [Op.and]: [
                    { id: req.params.id },
                    { orderId: orderId.id }
                ]
            }
        })

        if (!destroy) {
            return res.status(400).send("not found")
        }

        return res.status(200).send({ msg: "deleted succeeded", orderId })


    } catch (e) {
        return res.status(500).send(e.message)
    }
}


//find all products in cart
module.exports.findAll = async (req, res) => {
    try {

        let orderId = await Order.findOne({
            where: {
                [Op.and]: [
                    { isConfirm: false },
                    { userId: res.locals.id }
                ]
            }
        })

        let findAllProducts = await Carts.findAll({
            where: { orderId: orderId.id }, attributes: ["quantity", "id", "orderId"],
            include: [{ model: Products, attributes: ["productName", "price"], include: { model: Merchant, attributes: ["userName"] } }]
        })


        if (findAllProducts.length == 0) {
            return res.status(400).send("no products yet")
        }

        let totalPrice = findAllProducts.reduce((ac, el) => ac + el.Product.price * el.quantity, 0)



        return res.status(200).send({ findAllProducts, totalPrice })

    } catch (e) {
        return res.status(500).send(e.message)
    }
}



// update quantity in Cart 
module.exports.updateInCart = async (req, res) => {
    try {


        let findOrderId = await Order.findOne({
            where: {
                [Op.and]: [
                    { isConfirm: false },
                    { userId: res.locals.id }
                ]
            }
        })

        await Carts.update(req.body, {
            where: {
                [Op.and]: [
                    { id: req.params.id },
                    { orderId: findOrderId.id }
                ]
            }
        })


        let findCart = await Carts.findOne({
            where: {
                [Op.and]: [
                    { id: req.params.id },
                    { orderId: findOrderId.id }
                ]
            }, include: { model: Products }
        })


        findOrderId.totalPrice += findCart.Product.price * req.body.quantity
        await findOrderId.save()

        if (!findCart) {
            return res.status(400).send("you are not authorized to do that")
        }


        if (req.body.quantity > findCart.Product.stock) {
            return res.status(200).send("your quantity more than stock")
        }


        return res.status(200).send(findCart)



    } catch (e) {
        return res.status(500).send(e.message)
    }
}