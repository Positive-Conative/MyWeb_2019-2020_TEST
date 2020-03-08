var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema;

var schema = new Schema({
    year: {type: String, trim: true},
    month: {type: String, trim: true},
    title: {type: String, trim: true},
    content: {type: String, trim: true}
    },{
        toJSON: { virtuals: true},
        toObject: {virtuals: true}
    }
);

schema.plugin(mongoosePaginate); //mongoose-paginate를 쓸 때 사용..?
module.exports = mongoose.model('information', schema);