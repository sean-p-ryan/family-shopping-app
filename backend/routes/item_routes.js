const express = require("express");
const itemRoutes = express.Router();
const db = require('../models/item_models');

itemRoutes.route('/').get(function (req, res) {
    Item.find(function (err, items) {
        if (err) {
            console.log(err);
        } else {
            res.json(items);
        }
    });
});

itemRoutes.route('/create').post(function(req, res) {
    let item = new Todo(req.body);
    item.save()
        .then(item => {
            res.status(200).json({'item': 'item added successfully'});
        })
        .catch(err => {
            res.status(400).send('failed to add new item');
        });
});