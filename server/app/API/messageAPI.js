/**
 * Created by Nabillionaire on 4/1/17.
 */
// Twilio Credentials

module.exports = function(to, msg){
    var accountSid = 'ACfa6a94e8c6b9ccb6fe0297790ed6f9d9';
    var authToken = '81b7c455fa66864166eaac74381656b1';

    //require the Twilio module and create a REST client
    var client = require('twilio')(accountSid, authToken);
    console.log("works");
    client.messages.create({
        to: to,
        from: "+12264555639",
        body: msg,
    }, function(err, message) {
        //console.log(message.sid);
    });
}