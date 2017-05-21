'use strict'
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact');
});

router.post('/send', function (req, res, next) {
	let transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth : {
			user : 'YOUR_EMAIL',
			pass : 'YOUR_PASSWORD'
		}
	});


	let mailOptions = {
		from : 'info@theweb.com',
		to : 'rajanshu.ujjwal@gmail.com',
		subject : 'Mail Test from Nodemailer',
		text : 'You have a new submission from Nodemailer with following details ' + req.body.name + ' Email ' + req.body.email + ' Message ' + req.body.message,
		html : '<p>You got a new submission with following details..</p> <ul><li>Name : ' + req.body.name + '</li><li>Email : ' +req.body.email+ '</li><li>Message : '+req.body.message+'</li></ul>'
	}

	transporter.sendMail(mailOptions, function (error, info) {
		if(error){
			console.log(error);
			res.redirect('/');
		} else {
			console.log('message sent ' + info.response);
			res.redirect('/');
		}
	});
});

module.exports = router;
