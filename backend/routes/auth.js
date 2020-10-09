const express=require("express")
const router=express.Router()
const {signout,signup,signin} =require("../controllers/auth.js")

router.get("/signout",signout);
router.get("/signin",signin);
router.get("/signup",signup);




module.exports=router;