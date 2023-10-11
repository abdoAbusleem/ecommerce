const router = require("express").Router()
const { addProduct, deleteProduct, updateProduct, findAllProducts, filterProduct, productDetails } = require("../Controllers/Products")
const { upload } = require('../middlewares/uploadFiles');
const { auth } = require("../middlewares/auth")






router.post("/addProduct", auth, upload.array('image', 4), addProduct)

router.delete("/delete/:id", auth, deleteProduct)

router.put("/editProduct/:id", auth, updateProduct)

router.get("/product-details/:id", productDetails)


router.post("/findAll", findAllProducts)

router.post("/filter", filterProduct)






module.exports = router