const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const itemRoutes = express.Router();
const PORT = process.env.PORT || 4000;
require('dotenv').config();

// imports to serve React app with Express 
const path = require('path');

let Item = require('./models/item_models')

app.use(cors());
app.use(bodyParser.json());

// sends static file requests to client
app.use(express.static(path.join(__dirname, "client", "build")))

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/family-shopping")
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("DB connection is now open.");
});

// show all todos on index 
itemRoutes.route('/').get(function (req, res) {    
    console.log("GET REQUEST MADE")
    Item.find(function (err, items) {
        if (err) {
            console.log(err);
        } else if (!items) {
            console.log("No items were found.")            
        }        
        else {
            res.json(items);
        }
    });
});

// retrieve an item by ID
itemRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Item.findById(id, (err, item) => {
        res.json(item)
    });
});

// adds a new item to the database
itemRoutes.route('/create').post(function(req, res) {    
    console.log(req.body)
    let item = new Item(req.body);
    console.log("Here's the item" + item)
    item.save()
        .then(item => {
            console.log(item)
            res.status(200).json("You added an item!");
        })
        .catch(err => {
            res.send('failed to add new item');
        });
});

// update an item in the database
itemRoutes.route('/update/:id').post((req, res) => {
    Item.findById(req.params.id, function(err, item) {
        if (!item){
            res.status.send("This item was not found.")
        } else {
            let item = new Item(req.body);
            console.log("Here's the item!@" + item)
            item.save()
                .then(item => {
                    res.send("This item has been updated.");
                })
                .catch(err => {
                    res.send("It was not possible to update this item.")
                }); 
        }
    })
})

app.use('/', itemRoutes)

// sends index.html back to client is request was not recognized
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
