var express =require('express');
var router =require("./routes/index")
var app=express();
var mongoose=require('mongoose')
var session = require('express-session');
var passport = require('passport');
//require('./authinticate/passport');
const mongourl = require('./data_collection/mongourl').MongoUrl;
// ---------  connect to the Database ------------ //
mongoose.connect(mongourl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  }).then(() => console.log('Connect To Data Base'))
    .catch((err) => console.log(err));
  
//------- middelware && static folder ----------- //
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );
 
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use(router);
//------error handdel ------//
app.use((req, res) => {
    res.status(404).render('404')
  });
var PORT = process.env.PORT||3000;
app.listen(PORT,()=>console.log(`server run in  Port :${PORT}`));