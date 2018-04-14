var mongoose = require('mongoose');





mongoose.connect('mongodb://localhost:27017/tlcn');
var cvtoemployerSchema = new mongoose.Schema({ 
    "cvid" : String,
    "candidateid":String,
    "recruimentid" : String,
    "employerid" : String,
    "position" : String,
    "date":Date
   
},{ collection : 'cvtoemployer' });



// create model if not exists.
module.exports = mongoose.model('cvtoemployer',cvtoemployerSchema);