var mongoose = require('mongoose');





mongoose.connect('mongodb://localhost:27017/tlcn');
var typejobSchema = new mongoose.Schema({ 
    "key" : Number,
    "name" : String,
   
},{ collection : 'typejob' });



// create model if not exists.
module.exports = mongoose.model('typejob',typejobSchema);