const Categories = require("../models/Categorie")
const { validation_Categorie } = require("../helpers/validation")
const _ = require("lodash");




module.exports.addCategorie = async (req, res) => {
    try {
        let error = await validation_Categorie(req.body)
        if (error) {
            return res.status(400).send(error.message)
        }

        let existCategory = await Categories.findOne({ where: { title: req.body.title } })

        if (existCategory) {
            return res.status(400).send("already exist")
        }


        let addCategory = await Categories.create(req.body)

        let data = _.pick(addCategory, ["title"])


        return res.status(200).send({ msg: "added successfully", data })
    } catch (e) {
        return res.status(500).send(e.message)
    }
}



module.exports.deleteCategory = async (req, res) => {
    try {
        let findCategory = await Categories.findOne({
            where: {
                id: req.params.id
            }
        })

        if (!findCategory) { return res.status(400).send("not found") }


        await Categories.destroy({
            where: {
                id: req.params.id
            }
        })

        return res.status(200).send("deleted succeeded")


    } catch (e) {
        return res.status(500).send(e.message)
    }
}



module.exports.updateCategory = async (req, res) => {
    try {

        let updateCategory = await Categories.update(req.body, {
            where: {
                id: req.params.id
            }
        })



        let findCategory = await Categories.findOne({
            where: {
                id: req.params.id
            }, attributes: ["title"]
        })


        if (!findCategory) {
            return res.status(400).send("not found")
        }

        return res.status(200).send(findCategory)


    } catch (e) {
        return res.status(500).send(e.message)
    }

}
