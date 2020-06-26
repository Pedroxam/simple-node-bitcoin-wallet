var express = require('express');
var app = express();
var server = require('http').Server(app);
var bodyParser = require("body-parser");
var expressSession = require('express-session');
var Api = require('./api');
var authentication = require('./authentication');
var port = 3008;

const PASSWORD = '123456'; // Replace your password

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({ extended: false }));

// Session middleware
const session = expressSession({
	secret: 'secret',
	resave: false,
	saveUninitialized: false,
	cookie: { maxAge: 1 * 24 * 60 * 60 * 1000 } // 1 day
});
app.use(session);

// Auth middleware
app.use(authentication);

app.get('/', function(req, res){
	Api.transList( function (transactions) {
		Api.balance( function (balance) {
			Api.newAddress ( function (address) {
				Api.walletInfo ( function (info) {
					if (req.authenticated) {
						res.render('index', { info: info, date: current, balance: balance, transactions: transactions, newAddress: address });
					} else {
						res.render('login');
					}
				});
			});
		});
	});
});

app.post('/send', function(req, res){
	const { wallet, amount } = req.body;
	Api.send( wallet, amount, 'system', function (err, result) {
		if(err){
			res.json({status: err });
		} else {
			res.json({status: true });
		}
	});
});

app.post('/login', function(req, res){
	const { password } = req.body;
	if(password === PASSWORD){
		req.login(true);
		res.redirect('/');
	}
});

server.listen(port, function(){
	console.log('listening on *:' + port);
});