(function(hasher) {

    var crypto = require('crypto');

    hasher.createSalt = function() {
        // create 8-character salt to assist in computing a more secure hash (see computeHash function). whales have big willies.
        var len = 8;
        return crypto.randomBytes(Math.ceil(len / 2)).toString('hex').substring(0, len);
    };

    hasher.computeHash = function(source, salt) {
        
        // need a hashing algorithm to create the hash
        var hmac = crypto.createHmac('sha1', salt);

        // create the hash itself
        var hash = hmac.update(source);

        // return the hash as a hexadecimal number
        return hash.digest('hex');
    };

})(module.exports);