var router =require('express').Router();
var faceauth =require('../authinticate/facebook');
const auth =require('../authinticate/auth');
var controller = require("../controller/controller")
var passport =require('../authinticate/passport')
require('../authinticate/google');
var express=require('express');

router.get("/",(req,res)=>{
    res.render('index');
});
router.get("/login",(req,res)=>{
    res.render('login');
});
router.get("/signup",(req,res)=>{
    res.render('signup');
});
router.get("/user",auth.ensureAuthenticated,(req,res)=>{
    console.log(req.user)
    res.render('user');
});
router.post("/signup",controller.signup);
router.post("/login",controller.login);
router.get('/user/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
});
//--------- Start facebook authanticate ------------//
router.get('/auth/facebook',passport.authenticate('facebook',{ scope : 'email' }));
router.get('/facebook/callback',
passport.authenticate('facebook', {
			successRedirect : '/user',
			failureRedirect : '/'}));
//--------- End facebook authanticate ------------// 
//--------- Start Google authanticate ------------//

router.get('/google',passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback',passport.authenticate('google',{failureRedirect: '/login'}),
  function(req, res) {
    res.redirect('/user');
  }); 
//--------- End Google authanticate ------------//
module.exports=router;