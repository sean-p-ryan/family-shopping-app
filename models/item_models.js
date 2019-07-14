const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Item = new Schema({
    item_name: {
        type: String
    },
    item_max_budget: {
        type: Number
    },
    item_owner: {
        type: String
    }
});

Item.add({ purchased: 'boolean' });

module.exports = mongoose.model('Item', Item);