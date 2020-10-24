const User = require("../models/user");
const {validationResult, check } = require('express-validator');
var jwt=require("jsonwebtoken");
var expresssJwt=require("express-jwt");

exports.signup = (req, res) => {
  const errors=validationResult(req)
  if(!errors.isEmpty()){
    return res.status(422).json({
      error:errors.array()[0].msg
    })
  }
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "NOT able to save user in DB"
      });
    }
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      password:user.password
    });
  });
};

exports.signin = (req, res) => {
  const {email,password}=req.body;

  const errors=validationResult(req)
  if(!errors.isEmpty()){
    return res.status(422).json({
      error:errors.array()[0].msg
    })
  }
  User.findOne({email},(err,user)=>{
    if(err || !user){
      return res.status(400).send({
        error:"email not exits"
      })
    }
    if(!user.authenticate(password)){
      return res.status(401).json({
        error:"email and password not valid " 
      })
    }
    //signin
    //creating tokens
    const token=jwt.sign({_id:user._id},process.env.SECRET)
    //put token in browser cookies
    res.cookie("token",token,{expire:new Date()+9999})
    const{_id,name,email,role}=user;
    return res.json({token,user:{_id,name,email,role}});
  });
  
};

exports.signout = (req, res) => {
  res.clearCookie("token")
  res.json({
    message: "User signout successfully"
  });
};

exports.isSignedIn=expresssJwt({
  secret:process.env.SECRET,
  userProperty:"auth"
})


//cutom middlewares
exports.isAuthenticated=(req,res,next)=>{
  let checker=req.profile && req.auth && req.profile._id==req.auth._id
  if(!checker){
    return res.status(403).json({
      error:"ACCESS DENIED"
    })
  }
  next();
}

exports.isAdmin=(req,res,next)=>{
  if(req.profile.role===0){
    return res.status(403).json({
      error:"YOU ARE NOT ADMIN"
    })
  }
  next();
}