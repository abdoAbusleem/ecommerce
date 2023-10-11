const Products = require("../models/Product")
const Categories = require("../models/Categorie")
const { validation_product } = require("../helpers/validation")
const { Op } = require("sequelize")
const Merchant = require("../models/merchant")
const { uploadToFirebase } = require('../helpers/uploadImageToFirebase')
const _ = require("lodash");



module.exports.addProduct = async (req, res) => {
    try {
        let error = await validation_product({ ...req.body, image: req.files })
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        let images = await uploadToFirebase(req.files)

        let findCategorie = await Categories.findOne({ where: { id: req.body.categorie_Id } })

        if (!findCategorie) {
            return res.status(400).send("not found")
        }

        let findProduct = await Products.findOne({
            where: {
                [Op.and]: [
                    { productName: req.body.productName },
                    { MerchantId: res.locals.id }
                ]
            }
        })

        if (findProduct) {
            return res.status(200).send("already existing")
        }

        let addProduct = await Products.create({ MerchantId: res.locals.id, image: images, ...req.body })

        let data = _.pick(addProduct, ["image", "productName", "description", "size", "color", "price", "brand", "stock"])


        return res.status(200).send(data)


    } catch (e) {
        return res.status(500).send(e.message)
    }
}




module.exports.deleteProduct = async (req, res) => {
    try {
        let findProduct = await Products.findOne({
            where: {
                [Op.and]: [
                    { id: req.params.id },
                    { MerchantId: res.locals.id }
                ]
            }
        })

        if (!findProduct) { return res.status(400).send("not found") }


        await Products.destroy({
            where: {
                [Op.and]: [
                    { id: req.params.id },
                    { MerchantId: res.locals.id }
                ]
            }
        })

        return res.status(200).send("deleted succeeded")


    } catch (e) {
        return res.status(500).send(e.message)
    }
}




module.exports.updateProduct = async (req, res) => {
    try {

        let updateProduct = await Products.update(req.body, {
            where: {
                [Op.and]: [
                    { id: req.params.id },
                    { MerchantId: res.locals.id }
                ]
            }
        })



        let findProduct = await Products.findOne({
            where: {
                [Op.and]: [
                    { id: req.params.id },
                    { MerchantId: res.locals.id }
                ]
            }
        })


        if (!findProduct) {
            return res.status(400).send("not found")
        }

        return res.status(200).send(findProduct)


    } catch (e) {
        return res.status(500).send(e.message)
    }
}





module.exports.findAllProducts = async (req, res) => {
    try {

        let offset = req.body.pageSize * (req.body.pageNumber - 1);
        let limit = req.body.pageSize

        let findAllProducts = await Products.findAll({
            limit: limit, offset: offset, attributes: { exclude: ["categorie_Id", "MerchantId", "updatedAt"] },
            include: [{ model: Categories, attributes: ["title"] }, { model: Merchant, attributes: ["userName"] }]
        })
        if (findAllProducts.length == 0) {
            return res.status(400).send("no products yet")
        }

        return res.status(200).send({ products: findAllProducts, count: findAllProducts.length })

    } catch (e) {
        return res.status(500).send(e.message)
    }
}

module.exports.productDetails = async (req, res) => {
    try {

        let singleProduct = await Products.findOne({
            where: { id: req.params.id }, include: [{ model: Categories, attributes: ["title"] },
            { model: Merchant, attributes: ["userName"] }]
        })

        if (!singleProduct) {
            return res.status(400).send("notfound")
        }

        return res.status(200).send(singleProduct)

    } catch (e) {
        return res.status(500).send(e.message)
    }
}




module.exports.filterProduct = async (req, res) => {
    try {
        let offset = req.body.pageSize * (req.body.pageNumber - 1);
        let limit = req.body.pageSize

        let filter = await Products.findAll({
            where: {

                productName: {
                    [Op.like]: "%" + req.body.productName + "%"
                },


                stock: {
                    [Op.not]: 0

                },

                price: {
                    [Op.gte]: req.body.price

                },

                categorie_Id: {
                    [Op.eq]: req.body.categorie_Id
                },

                [Op.or]: [


                    {
                        brand: req.body.brand || null

                    },

                    {
                        brand: {

                            [Op.like]: "%" + req.body.brand + "%"


                        }
                    },

                ]

            }, limit: limit, offset: offset, attributes: { exclude: ["id", "categorie_Id", "MerchantId", "updatedAt"] },
            include: [{ model: Categories, attributes: ["title"] }, { model: Merchant, attributes: ["userName"] }]
        })

        if (filter.length == 0) {
            return res.status(400).send("not found")
        }

        return res.status(200).send(filter)


    } catch (e) {
        return res.status(500).send(e.message)
    }
}









