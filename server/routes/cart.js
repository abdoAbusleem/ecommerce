const router = require("express").Router()
const {addToCart , deleteFromCart , findAll , updateInCart} = require("../Controllers/carts")





router.post("/addToCart" , addToCart)



router.delete("/delete/:id" , deleteFromCart)


router.get("/findAll" , findAll)

router.put("/update/:id" , updateInCart)

module.exports = router