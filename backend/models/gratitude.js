const mongoose = require('mongoose');

const gratitudeSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    },
    color: {
        type: String,
        default: 'bg-yellow-400'
    },
    xOffset: {
        type: Number,
        default: 0
    },
    rotation: {
        type: Number,
        default: 0
    },
    date:{
        type:Date,
        default:Date.now
    }

},
    {timestamps: true}
);

const Gratitude = mongoose.model('Gratitude',gratitudeSchema);

module.exports = Gratitude;