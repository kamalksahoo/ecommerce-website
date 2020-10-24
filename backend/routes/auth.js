var express = require("express");
var router = express.Router();
const { signout,signin,signup ,isSignedIn} = require("../controllers/auth");
const {validationResult, check } = require('express-validator');


router.post("/signup",[
    check("name","name should be alpabet and  at least 3 char long").isAlpha(),
    check("email","email is not valid").isEmail(),
    check("password","password should be atleast 4 char long").isLength({min:4})
] ,signup);

router.post("/signin",[
    check("email","email is not valid").isEmail(),
    check("password","password required").isLength({min:4})
], signin);

router.get("/signout", signout);

module.exports = router;
