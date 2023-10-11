// const Sequelize = require("sequelize")
// require("dotenv").config()


// const config = {
//     development: {
//         url: process.env.url,
//         dialect: 'postgres',
//         dialectOptions: {
//             ssl: {
//                 rejectUnauthorized: false,
//             },
//         },
//     },

// };
// //connection
// const sequelize = new Sequelize(`${config.development.url}?sslmode=no-verify`, config.development)



// //sync all models
// sequelize.sync({ alter: true, force: true })




// module.exports = sequelize


const Sequelize = require("sequelize")
require("dotenv").config()




//connection
const sequelize = new Sequelize(process.env.database, process.env.user, process.env.password, {
    host: process.env.host,
    dialect: "postgres",
    port: 6000
})



// sequelize.sync({ alter: true, force: true })




//sync all models
sequelize.sync()



module.exports = sequelize




