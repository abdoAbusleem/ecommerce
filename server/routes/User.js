const { register, login, logOut } = require("../Controllers/users")
const router = require("express").Router()

//register
router.post("/add-User", register)

router.post("/login", login)
router.post("/logout", logOut)


module.exports = router