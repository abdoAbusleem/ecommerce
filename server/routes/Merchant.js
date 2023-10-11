const router = require("express").Router()
const {register_Merchant , login} = require("../Controllers/Merchants")



router.post("/addMerchent" , register_Merchant)


router.post("/login" , login )





module.exports = router