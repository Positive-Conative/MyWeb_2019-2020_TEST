var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    email: {type: String, trim: true},
    password: {type: String, trim: true},
    date: {type: Date, default: Date.now},
    },{
        toJSON: { virtuals: true},
        toObject: {virtuals: true}
    }
);
module.exports = mongoose.model('user', schema);