var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema;

var schema = new Schema({
    title: {type: String, trim: true},
    content: {type: String, trim: true},
    date: {type: Date, trim: true}, 
    },{
        toJSON: { virtuals: true},
        toObject: {virtuals: true}
    }
);

schema.plugin(mongoosePaginate); //mongoose-paginate를 쓸 때 사용..?
module.exports = mongoose.model('clang', schema);