var mongoose = require('mongoose');





mongoose.connect('mongodb://localhost:27017/tlcn');
var jobSchema = new mongoose.Schema({ 
    "key" : Number,
    "name" : String,
   
},{ collection : 'job' });



// create model if not exists.
module.exports = mongoose.model('job',jobSchema);