var mongoose = require('mongoose');
var message = require('./API/messageAPI.js');

module.exports = function (app) {

    // create schemas
    var userSchema = mongoose.Schema({
        name: String,
        password: String,
        email: String,
        phone: String,
        paymentIds: Array
    });

    var paymentSchema = mongoose.Schema({
        name: String,
        category: String,
        price: Number,
        description: String,
        phone: String,
        date: String
    });

    // create models
    var User = mongoose.model('User', userSchema);
    var Payment = mongoose.model('Payment', paymentSchema);

    app.get('/api/hello', function (req, res) {
        res.json("Hello Nable");
    });

    // USER APIs
    app.post('/api/user', function(req, res) { // tested, checks for duplicate entry
        console.log("POST METHOD WORKS");

        User.findOne({ email: req.body.email }, function(err, user){
            if(err)
                return console.log(err);

            if(user == undefined){
                var usr = new User({
                    name: req.body.name,
                    password: req.body.password,
                    email: req.body.email,
                    phone: req.body.phone
                });
                usr.save(function(err, usr){
                    if(err)
                        return console.log(err);
                    res.json(usr);
                });
            }else{
                res.json("Duplicate entry");
            }

        });

    });

    app.get('/api/user', function(req, res) { // tested
        console.log("GET METHOD WORKS");
        User.findOne({ _id: req.query._id }, function(err, user){
            if(err)
                return console.log(err);
            res.json(user);
        });
    });

    app.post('/api/authentication', function(req, res){ // not tested
        console.log("Authenticating");
        User.findOne({ email: req.body.email }, function(err, user){
            if(err) {
                return console.log(err);
            } else if(user == undefined) {
                res.json("No user exists with that email, please create an account.");
            } else {
                // validate password
                if(user.password === req.body.password)
                    res.json(user);
                else
                    res.json("Invalid password");
            }
        });
    });

    app.put('/api/user', function(req, res) { // tested
        console.log("PUT METHOD WORKS");
        User.findOne({ _id: req.body._id }, function(err, user){
            if(err)
                return console.log(err);

            user.name = req.body.newName == undefined ? user.name : req.body.newName;
            user.password = req.body.newPassword == undefined ? user.password : req.body.newPassword;
            user.email = req.body.newEmail == undefined ? user.email : req.body.newEmail;
            user.phone = req.body.newPhone == undefined ? user.phone : req.body.newPhone;

            if(req.body.newEmail == undefined){
                user.save(function(err, user){
                    if(err)
                        return console.log(err);
                    res.json(user);
                });
            }else {
                User.findOne({ email: user.email }, function(err, usr){
                    if(err)
                        return console.log(err);

                    if(usr == undefined){
                        user.save(function(err, user){
                            if(err)
                                return console.log(err);
                            res.json(user);
                        });
                    }else{
                        res.json("Duplicate entry");
                    }

                });
            }

        });
    });

    app.delete('/api/user', function(req, res) { // tested
        User.remove({ _id: req.body._id }, function(err){
            if (!err)
                console.log(err);
            res.send("success");
        });
    });



    // PAYMENT APIs

    app.post('/api/payment', function(req, res){ // tested
        User.findOne({ _id: req.body._id }, function(err, usr){
            if(err)
                return console.log(err);

            var pmt = new Payment({
                name: req.body.name,
                category: req.body.category,
                price: req.body.price,
                description: req.body.description,
                phone: req.body.phone,
                date: req.body.date
            });

            var newArray = usr.paymentIds.slice();
            newArray.push(pmt);
            var query = {_id: req.body._id};
            User.update(query, {paymentIds: newArray}, undefined, function(err){
                if(err)
                    console.log(err);

                pmt.save(function(err, pmt){
                    if(err)
                        return console.log(err);

                    var msg = "Reminder: Pay back " + pmt.price + " to " + usr.name + " for " + pmt.name;
                    console.log(pmt.phone);
                    console.log(msg);
                    (message)(pmt.phone, msg);
                    setInterval(function(){
                        (message)(pmt.phone, msg);
                    }, 60000);

                    res.json(pmt);
                });
            });
        });

    });

    app.get('/api/payment', function(req, res){ // tested
        User.findOne({ _id: req.query._id }, function(err, user){
            if(err)
                return console.log(err);
            if(user != undefined)
                res.json(user.paymentIds);
            else
                res.json("User does not exist");
        });
    });

    app.delete('/api/payment', function(req, res){
        Payment.findOne({ _id: req.body.p_id }, function(err, pmt){
            console.log(pmt);
            if(err)
                return console.log(err);

            if(pmt != undefined){

                User.findOne({ _id: req.body._id }, function(err, usr){
                    if(err)
                        return console.log(err);

                    for(i in usr.paymentIds){
                        if(usr.paymentIds[i]._id == req.body.p_id && i > -1){
                            usr.paymentIds.splice(i, 1);
                            console.log("removed");
                        }
                    }

                    var query = {_id: req.body._id};
                    User.update(query, {paymentIds: usr.paymentIds}, undefined, function(err){
                        if(err)
                            console.log(err);

                        Payment.remove({ _id: req.body.p_id }, function(err){
                            if (err)
                                console.log(err);
                            res.send("payment deleted");
                        });
                    });
                });
            }
        });

    });


    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });



    User.find(function (err, users) {
        // if (err) return console.error(err);
        // for(u in users){
        //     console.log(users[u]._id);
        //     coensole.log(users[u].paymentIds);
        // }
        console.log(users);
    });


    Payment.find(function (err, payments) {
        if (err) return console.error(err);
        console.log(payments);
    });


    // User.remove({}, function(err) {
    //     if (err) {
    //         console.log(err)
    //     }
    // });
    //
    // Payment.remove({}, function(err) {
    //     if (err) {
    //         console.log(err)
    //     }
    // });


};
