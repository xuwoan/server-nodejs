var mongoose = require('mongoose');





mongoose.connect('mongodb://localhost:27017/tlcn');
var newsSchema = new mongoose.Schema({ 
    "title" : String,
    "type" : Number,
    "image":String,
    "content":String,
    "date":Date,
    "viewer":Number

   
},{ collection : 'news' });



// create model if not exists.
module.exports = mongoose.model('news',newsSchema);