const express=require("express")
const router=express.Router();
const {getCategoryById,createCategory,getAllCategory,getCategory,updateCategory,removeCategory} =require( "../controllers/category.js")
const {isAdmin,isAuthenticated,isSignedIn} =require( "../controllers/auth")
const {getUserById} =require( "../controllers/user")

router.param("userId",getUserById);
router.param("categoryId",getCategoryById);

//actual routes
router.post(
    "/category/create/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    createCategory
    );

router.get(
    "/category/:categoryId",
    getCategory
    );

router.get(
    "/categories",
    getAllCategory
    );

router.put(
    "/category/:categoryId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateCategory
    );

router.delete(
    "/category/:categoryId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    removeCategory
    );

module.exports=router;