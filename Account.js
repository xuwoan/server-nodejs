var mongoose = require('mongoose');





mongoose.connect('mongodb://localhost:27017/tlcn');
var accountSchema = new mongoose.Schema({ 
    "username" : String,
    "hash":String,
    "userid" : String,
   
},{ collection : 'account' });



// create model if not exists.
module.exports = mongoose.model('account',accountSchema);