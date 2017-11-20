/**
 * Created by JohnWu on 2016-10-26.
 */

// set up ======================================================================
var express = require('express');
var app = express();
var port  	 = process.env.PORT || 5000;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// configuration ===============================================================
app.use(express.static(__dirname + '/public'));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listing on port " + port);

// database set up
mongoose.connect('mongodb://nable:macrohard@olympia.modulusmongo.net:27017/pu9viwYs');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to DB")
});

// routes ======================================================================
require('./app/routes.js')(app);

// // create models
// var User = mongoose.model('User', userSchema);
// var Payment = mongoose.model('Payment', paymentSchema);
//
//
// app.post('/api/user', function(req, res) {
//     console.log("runs");
//     var usr = new User({
//         uid: req.body.uid,
//         name: req.body.name,
//         password: req.body.password,
//         email: req.body.email
//     });
//     usr.save(function(err, usr){
//         if(err)
//             return console.log(err);
//         res.json(usr);
//     });
// });
//
// app.get('/api/user', function(req, res) {
//     console.log("runs");
//     User.findOne({ email: req.body.email }, function(err, user){
//         if(err)
//             return console.log(err);
//         console.log(user.name + " " + user.email);
//         res.send(user);
//     });
// });
//
// app.put('/api/user', function(req, res){
//     User.findOne({ email: req.body.email }, function(err, user){
//         if(err)
//             return console.log(err);
//
//         user.name = req.body.name == undefined ? user.name : req.body.name;
//         user.password = req.body.password == undefined ? user.password : req.body.password;
//         user.email = req.body.email == undefined ? user.email : req.body.newEmail;
//     });
// });
//
// app.delete('/api/user', function(req, res){
//     User.remove({ email: req.body.email }, function(err){
//         if (!err)
//             console.log(err);
//         res.send("success");
//     });
// });
//


// User.findOne({ email: "nabillionaire@live.com" }, function(err, user){
//     if(err)
//         return console.log(err);
//     console.log(user.name + " " + user.id + " " + user.password);
// });

// var john = new User({
//     uid: 2,
//     name: "John Wu",
//     password: "john",
//     email:"john9@mcgill.ca",
//     paymentIds: [3,5,7,1,5]
// });
//
// nabil.save(function(err, nabil){
//     if(err) return console.log(err);
// });
//
// john.save(function(err, john){
//     if(err) return console.log(err);
// });


//
// User.find(function (err, users) {
//     if (err) return console.error(err);
//     console.log(users);
// });

// User.remove({}, function(err) {
//     if (err) {
//         console.log(err)
//     }
// });