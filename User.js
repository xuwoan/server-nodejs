var mongoose = require('mongoose');





mongoose.connect('mongodb://localhost:27017/tlcn');
var userSchema = new mongoose.Schema({
    "userid":String,
    "type": Number,
    "detailcandidate": {
        "birthday": String,
        "name": String,
        "address": {
            "street": String,
            "city": {
                "key": Number,
                "name": String
            }

        },
        "phone": String,
        "email": String,
        "major":{
            "name": String,
            "key": Number
        },
      
        "avatar":  String

    },
    "detailemployer":
    {
        "name": String,
        "company": {
            "name": String,
            "phone": String,
            "email": String,
            "intro":String,
            "website":String,
           // "logo":  { "data": String, "contentType": String },
            "logo" : String,
            "address": {
                "street": String,
                "city": {
                    "key": Number,
                    "name": String
                }

            }
        }
    }



}, { collection: 'user' });



// create model if not exists.
module.exports = mongoose.model('user', userSchema);