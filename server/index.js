const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const cookieParser = require('cookie-parser');
const sequelize = require("./DBconfing/DBconnection")
const userRoute = require("./routes/User")
const MerchantRoute = require("./routes/Merchant")
const CategorieRoute = require("./routes/Categorie")
const ProductRoute = require("./routes/Product")
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/order")

const { auth } = require("./middlewares/auth")
const { createOrder } = require("./middlewares/createOrder")

const app = express()
require("dotenv").config()



// middlewares
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    next()
})
app.use(cors({
    origin: 'http://localhost:5173'
}));



app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'))
app.use(morgan("tiny"))




// //Dbconnect
sequelize.authenticate().then(() => {
    console.log("connected")
}).catch((e) => {
    console.log("failed", e.message)
})



//routes
app.use("/api/Users", userRoute);
app.use("/api/Merchants", MerchantRoute)
app.use("/api/Categories", auth, CategorieRoute)
app.use("/api/Products", ProductRoute)
app.use("/api/Cart", auth, cartRoute)
app.use("/api/orders", auth, orderRoute)






//test request

app.get("/api", (req, res) => {
    return res.status(200).send("hello")
})



//port

const Port = process.env.Port || 9200
app.listen(Port, () => console.log(`server is running on port ${Port}`))







