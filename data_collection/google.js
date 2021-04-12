
const mongoose = require("mongoose");

var googleschema = mongoose.Schema({
    uid:{ type:Number,
    unique:true},
    token: String,
    name: String,
    gender: String,
    pic: String, 
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },email:{
        type:String,
        
    },
    acc:{
        type:Number,

        default:2
    }
});

module.exports = mongoose.model('googleaccount', googleschema);