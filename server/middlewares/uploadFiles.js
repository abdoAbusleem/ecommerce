const multer = require('multer');
const path = require('path');




const storage = multer.memoryStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname,"e-commerce-e5a25.appspot.com"))
    },
    filename: function (req, file, cb) {

        cb(null, Date.now() + file.originalname)
    }
    
})

// upload images
module.exports.upload = multer({ storage: storage })









  
  