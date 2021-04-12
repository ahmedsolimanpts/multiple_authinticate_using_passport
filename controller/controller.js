const User = require('../data_collection/user');
const passport = require('passport');

const localuserid = require('../data_collection/user');


signup = function (req, res) {
    const { name, email, password, password2 } = req.body;
    const uid=0;
    const newuser = new User({ email, password, name, uid })
    let errors = [];
    //check if any field empty //
    if ( !email || !password || !password2 || !name) {
        errors.push(  "please enter all fields" );
        console.log(errors);
    }
    // check the password lenght //
    if (password.lenght < 8) {
        errors.push( "please enter more than or equal 8 char" );
        console.log(errors);
    }
    //check password matching //
    if (password !== password2) {
        errors.push( "please enter match password" );
        console.log(errors);
    }
    //check if there are errors or not //
     if (errors.length > 0) {
      //  console.log(errors);
        res.render('signup', {
            errors:errors, email, password2, password, name
        })
    }
     else if (User.findOne({ email: email })) {
         //check falidate
         User.findOne({ acc: 0, uid: 0 }).then(user => {
             if (user) {
                 User.findOne({$and:[{acc:0},{uid:0},{email:email}]}).then(user=>{
                    if (user) {
                        errors.push("please enter another email");
                        res.render("signup", { errors: errors })
                        console.log("please enter another email")
                    } else {
                        console.log("here 6 ");
                        newuser.save().then(user => {
                            console.log('user create');
                            res.redirect('/login');
                        }).catch(err => console.log(err));
                    }
                 })
                
             }
             else {
                 console.log("here 3 ");
                 newuser.save().then(user => {
                     console.log('user create');
                     res.redirect('/login');
                 }).catch(err => console.log(err));
             }
         }).catch(err => console.log(err));



     }
     else {
         console.log("here 4 ");

         newuser.save().then(user => {
             console.log('user create');
             res.redirect('/login');
         }).catch(err => console.log(err));
     }
};
login = function (req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/user',
        failureRedirect: '/login',
    })(req, res, next)
};
module.exports={
    signup:signup,
    login:login
}