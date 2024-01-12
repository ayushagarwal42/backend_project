const { validationResult } = require("express-validator");


//  validate user  response 
exports.validBodyResponse = async (req, res, next) => {
    try {
        const errors = validationResult(req); // get response body
        if (!errors.isEmpty()) { // check errors 
            console.log(errors, "validations error");
            return res.status(422) // retrun error 
            .json({ message: "validate fields", errors: errors.array({ onlyFirstError: true }) }) // return errors array
        }
        else {
            
            next() // pass next middleare
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

