const mongoose = require('mongoose');

const schema = mongoose.Schema({
    //vlatsnosti - atributy kocky
    name: { type: String, require: true },
    color: { type: String, require: true },
    type: { type: String, require: true },
    hp: { type: Number, require: true },
    price: { type: Number, require: true },
});

module.exports = mongoose.model("Car", schema);