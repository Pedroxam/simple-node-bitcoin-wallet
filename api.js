var bc = require('./bitcoin_client');

//Wallet Object
const Wallet = {};

// Get Trans List
Wallet.transList = function(callback) {
    bc.listTransactions("*", 10000000, function (err, result) {
        if(!err){
            callback(result);
        }
    });
};

// Get Trans List
Wallet.send = function(wallet, amount, uid, callback) {
    bc.sendToAddress(wallet, amount, uid, function (err, result) {
        callback(err, result);
    });
};

// Get Trans List
Wallet.balance = function(callback) {
    bc.getBalance(function (err, result) {
        if (!err) {
            callback(result);
        }
    });
};

// Get new address
Wallet.newAddress = function(callback) {
    bc.getNewAddress('wallet_manager', function (err, result) {
        if (!err) {
            callback(result);
        }
    });
};

// Get wallet info
Wallet.walletInfo = function(callback) {
    bc.getWalletInfo(function (err, result) {
        if (!err) {
            callback(result);
        }
    });
};

module.exports = Wallet;