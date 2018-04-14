var mongoose = require('mongoose');





mongoose.connect('mongodb://localhost:27017/tlcn');
var genderSchema = new mongoose.Schema({ 
    "key" : Number,
    "name" : String,
   
},{ collection : 'gender' });



// create model if not exists.
module.exports = mongoose.model('gender',genderSchema);