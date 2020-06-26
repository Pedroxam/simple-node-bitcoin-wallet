var bitcoin = require('bitcoin');

var client = new bitcoin.Client({
    host: '127.0.0.1',
    port: '8332',
    user: '',
    pass: '',
    ssl: false,
    sslStrict: false
});

module.exports = client;