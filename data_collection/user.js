const mongoose=require('mongoose');
const Schema =mongoose.Schema;
const bcrypt=require('bcryptjs');
 //---------- schema data -------------//
const userschema=Schema({
    email:String,
    role:{
        type:String, 
        enum:['user','admin'],
        default:'user'
    },
    uid: {
        type:Number,
    },
    token: String,
    name: String,
    gender: String,
    pic: String,
    password:{
        type:String,
        default:null
    },
    acc:{
        type:Number,
        enum:[0,1,2],
        //0 for local --1 for facebook --- 2 for google
        default:0
    },
    localuserid:{
        type:Schema.ObjectId,
        ref:"localuser"
    },googleuserid:{
        type:Schema.ObjectId,
        ref:"googleaccount"
    }
});

//----------- bcrypt the password before save in mongodb -----------// 

userschema.pre('save', async function (next) {
    //check if modify password
    if (!this.isModified('password')) {
        return next();
    }
    // hash the password 
    try {
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
        next();
    } catch (error) {
        return next(error);
    }

});

module.exports=mongoose.model('user',userschema);