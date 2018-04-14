var mongoose = require('mongoose');





mongoose.connect('mongodb://localhost:27017/tlcn');
var cvSchema = new mongoose.Schema({
    "cvname": String,
    "date": Date,
    "userid": String,
    "maincv": Boolean,
    "resume": {
        "profile": {
            "name": String,
            "address":
            {
                "address": String,
                "key": Number
            },
            "phone": String,
            "email": String

        },
        "target": String,
        "skill": [
            {
                "name": String,
                "rate": Number
            }
        ],
        "experience": [
            {
                "startYear": String,
                "endYear": String,
                "place": String,
                "rank": String
            }
        ],
        "certificate": [
            {

                "year": String,
                "name": String

            }
        ],
        "education":
        [{
            "startYear": String,
            "endYear": String,
            "place": String,
            "degree": String,
            "department": String
        }
        ]





    }


}, { collection: 'cv' });

// create model if not exists.
module.exports = mongoose.model('cv', cvSchema);