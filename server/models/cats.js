const mongoose = require('mongoose');

const schema = mongoose.Schema({
    //vlatsnosti - atributy kocky
    name: { type: String, require: true },
    legs: { type: Number, require: true },
    color: { type: String, require: true },
    price: { type: Number, require: true },
    img: { type: String, required: true },
});

module.exports = mongoose.model("Cat", schema);