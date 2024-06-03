const mongoose = require('mongoose');

const schema = mongoose.Schema({
    //vlatsnosti - atributy kocky
    name: { type: String, require: true },
    legs: { type: Number, require: true },
    color: { type: String, require: true },
});

module.exports = mongoose.model("Cat", schema);