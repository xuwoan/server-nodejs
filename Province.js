var mongoose = require('mongoose');





mongoose.connect('mongodb://localhost:27017/tlcn');
var provinceSchema = new mongoose.Schema({ 
    "key" : Number,
    "name" : String,
   
},{ collection : 'province' });



// create model if not exists.
module.exports = mongoose.model('province',provinceSchema);