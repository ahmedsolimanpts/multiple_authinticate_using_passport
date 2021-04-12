
const mongoose = require("mongoose");

var faceuserschema = mongoose.Schema({
    uid: Number,
    token: String,
    email: String,
    name: String,
    gender: String,
    pic: String, 
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
});

module.exports = mongoose.model('Faceauth', faceuserschema);