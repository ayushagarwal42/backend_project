const multer = require('multer');

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, res, cb) {
            cb(null, 'uploads')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + "-" + Date.now() + ".jpg")
        }
    })
})

exports.upload=upload;