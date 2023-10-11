const router = require("express").Router()
const {addCategorie ,deleteCategory , updateCategory} = require("../Controllers/Categories")


router.post("/addCategorie" , addCategorie)
router.delete("/delete/:id" , deleteCategory)
router.put("/update/:id" , updateCategory)


module.exports = router