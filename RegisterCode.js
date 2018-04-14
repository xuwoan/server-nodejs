var mongoose = require('mongoose');





mongoose.connect('mongodb://localhost:27017/tlcn');
var registerSchema = new mongoose.Schema({ 
 
    "code" : String,
   
},{ collection : 'registercode' });



// create model if not exists.
module.exports = mongoose.model('registercode',registerSchema);