const { request } = require("express")
const joi = require("joi")
const { values } = require("lodash")

//register
module.exports.validation = async (Request) => {
    let schema = joi.object({
        userName: joi.string().required(),
        email: joi.string().email({ maxDomainSegments: 2, tlds: { allow: ["com", "net"] } }).required(),
        password: joi.string().required(),
        isAdmin: joi.boolean()
    })
    let { error } = await schema.validate(Request)
    return error
}

//login
module.exports.validatelogin = async (Request) => {
    let schema = joi.object({
        email: joi.string().email({ maxDomainSegments: 2, tlds: { allow: ["com", "net"] } }).required(),
        password: joi.string().min(6).required()
    })
    let { error } = await schema.validate(Request)
    return error
}

module.exports.validation_Merchant = async (Request) => {
    let schema = joi.object({
        userName: joi.string().required(),
        email: joi.string().email({ maxDomainSegments: 2, tlds: { allow: ["com", "net"] } }).required(),
        password: joi.string().required(),
        country: joi.string().required(),
        phoneNumber: joi.required(),
        isAdmin: joi.boolean()
    })
    let { error } = await schema.validate(Request)
    return error
}


module.exports.validation_product = async (Request) => {
    let schema = joi.object({
        productName: joi.string().required(),
        description: joi.string().required(),
        categorie_Id: joi.number().required(),
        size: joi.string(),
        color: joi.string(),
        price: joi.number().required(),
        image: joi.required(),
        stock: joi.number().required(),
        brand: joi.string().allow("")
    })
    let { error } = await schema.validate(Request)
    return error
}


module.exports.validation_Categorie = async (Request) => {
    let schema = joi.object({
        title: joi.string().required()
    })
    let { error } = await schema.validate(Request)
    return error
}


