const mongoose=require('mongoose');
const Schema =mongoose.Schema;
const bcrypt=require('bcryptjs');
 //---------- schema data -------------//
const localuserschema=Schema({
    email:{
     type:String,
     unique:true
    },
    password:{
        type:String,
        
    },
    role:{
        type:String, 
        enum:['user','admin'],
        default:'user'
    },
    name: String,
    acc:{
        type:Number,    
        default:0
    },
});

//----------- bcrypt the password before save in mongodb -----------//
localuserschema.pre('save', async function (next) {
    //check if modify password
    if (!this.isModified('password')) {
        return next();
    }
    // hash the password 
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
        next();
    } catch (error) {
        return next(error);
    }

});

module.exports=mongoose.model('localuser',localuserschema);