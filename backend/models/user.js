const mongoose = require("mongoose");
const crypto=require("crypto");
const uuidv1=require('uuid/v1');

const userSchema = new moongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 15,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  mobile: {
    type: Number,
  },
  userinfo: {
    type: String,
    trim: true,
  },
  encry_password: {
    type: String,
    trim: true,
    required: true,
  },
  salt: String,
  role: {
    type: Number,
    default: 0,
  },
  purchases: {
    type: Array,
    default: [],
  },
},{timestamps:true});

userSchema.virtual("password").set(
    function(password){
        this._password=password;
        this.salt=uuidv1();
        this.encry_password=this.secure_password(password)
    }
).get(
    function(){
        return this._password
    }
)


userSchema.method = {
    authenticate:function(){
        return this.secure_password(plain_password)===this.encry_password
    },

  secure_password: function (plain_password) {
    if (!plain_password) return "";
    try {
      return crypto.createHmac("sha256", this.salt).update(plain_password).digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = moongoose.model("User", userSchema);
