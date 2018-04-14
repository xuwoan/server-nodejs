var mongoose = require('mongoose');





mongoose.connect('mongodb://localhost:27017/tlcn');
var departmentSchema = new mongoose.Schema({ 
    "key" : Number,
    "name" : String,
   
},{ collection : 'department' });



// create model if not exists.
module.exports = mongoose.model('department',departmentSchema);