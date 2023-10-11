const router = require("express").Router()
const { findOrders } = require("../Controllers/orders")



router.get("/getOrder", findOrders)


module.exports = router