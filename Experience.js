var mongoose = require('mongoose');





mongoose.connect('mongodb://localhost:27017/tlcn');
var experienceSchema = new mongoose.Schema({ 
    "key" : Number,
    "name" : String,
   
},{ collection : 'experience' });



// create model if not exists.
module.exports = mongoose.model('experience',experienceSchema);