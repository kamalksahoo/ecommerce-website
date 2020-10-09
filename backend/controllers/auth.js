
exports.signout=(req,res)=>{
    res.send("")
    
}
exports.signin=(req,res)=>{
    res.json({
        message:"user signin"})
}
exports.signup=(req,res)=>{
    res.json({
        message:"user signup"})
}