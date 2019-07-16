import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "../assets/App.css";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from 'axios';


export default class CreateTodo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            item_name: '',
            item_owner: '',
            item_max_budget: '',
            purchased: false
        };

        // change context of 'this' in component methods to constructor
        this.itemNameAdded = this.itemNameAdded.bind(this);
        this.maxBudgetAdded = this.maxBudgetAdded.bind(this);
        this.itemOwnerAdded = this.itemOwnerAdded.bind(this);
        this.itemPurchased = this.itemPurchased.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    itemNameAdded = (e) => {
        this.setState({
            item_name: e.target.value
        });
    }

    maxBudgetAdded = (e) => {
        this.setState({
            item_max_budget: e.target.value
        })
    };

    itemOwnerAdded = (e) => {
        this.setState({
            item_owner: e.target.value
        });
    };
    
    itemPurchased = () => {
        (!this.state.purchased) ?
        this.setState({
            purchased: true
        })
        :
        this.setState({
            purchased: false
        })
    }

    onSubmit = e => {
        // stops immediate POST request
        e.preventDefault();

        console.log(`Form submitted`);
        console.log(`Item name: ${this.state.item_name}`);
        console.log(`Item owner: ${this.state.item_owner}`);
        console.log(`Max budget: ${this.state.item_max_budget}`)

        const newItem = {
            item_name: this.state.item_name,
            item_max_budget: this.state.item_max_budget,
            item_owner: this.state.item_owner,
            purchased: this.state.purchased            
        }

        // sends newItem object to 'create' endpoint as POST request
        axios.post('https://family-shopping-app.herokuapp.com/create'
                  || 'https://localhost:3000/create', newItem)
            .then(res => console.log("Here's the new item" + res.data));

        this.setState({
            item_name: '',
            item_owner: '',
            item_max_budget: '',
            purchased: false
        })

    }
    
    render() {
        return (
            <form
                noValidate autoComplete="off"
                className="add-item-form"
                onSubmit={this.onSubmit}>
                <TextField
                    id="standard-name"
                    label="Item Name"
                    className="form-field"
                    value={this.state.item_name}
                    onChange={this.itemNameAdded}
                />
                <TextField
                    id="standard-number"
                    label="Max Budget"
                    type="number"
                    className="form-field"
                    value={this.state.item_max_budget}
                    onChange={this.maxBudgetAdded}
                />
                <FormControl className="form-field">
                    <FormLabel component="legend">Owner</FormLabel>
                    <RadioGroup
                        aria-label="Owner"
                        name="gender1"
                        className="group"
                        value={this.state.item_owner}
                        onChange={this.itemOwnerAdded}
                    >
                        <FormControlLabel value="Mom" control={<Radio />} label="Mom" />
                        <FormControlLabel value="Dad" control={<Radio />} label="Dad" />
                        <FormControlLabel value="Brother" control={<Radio />} label="Brother" />
                    </RadioGroup>
                </FormControl>

                <Button variant="contained"
                    color="primary"
                    className="add-item-button"
                    type="submit">
                </Button>
            </form>
        )
    }
}
