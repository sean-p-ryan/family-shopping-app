import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "../App.css";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';


export default class CreateTodo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            item_name: '',
            item_owner: '',
            max_budget: undefined
        };

        const itemNameAdded = (e) => {
            this.setState({
                item_name: e.target.value
            });
        }

        const maxBudgetAdded = (e) => {
            this.setState({
                max_budget: e.target.value
            })
        };

        const itemOwnerAdded = (e) => {
            this.setState({
                item_owner: e.target.value
            });
        };

        const onSubmit = e => {
            e.preventDefault();

            console.log(`Form submitted`);
            console.log(`Item name: ${this.state.item_name}`);
            console.log(`Item owner: ${this.state.item_owner}`);
            console.log(`Max budget: ${this.state.max_budget}`)

            this.setState({
                item_name: '',
                item_owner: '',
                max_budget: undefined
            })

        }
    }
    render() {
        return (
            <form
                noValidate autoComplete="off"
                className="add-item-form">
                <TextField
                    id="standard-name"
                    label="Item Name"
                    className="form-field"
                />
                <TextField
                    id="standard-number"
                    label="Max Budget"
                    type="number"
                    className="form-field"
                />
                <FormControl className="form-field">
                    <FormLabel component="legend">Owner</FormLabel>
                    <RadioGroup
                        aria-label="Owner"
                        name="gender1"
                        className="group"
                    >
                        <FormControlLabel value="Mom" control={<Radio />} label="Mom" />
                        <FormControlLabel value="Dad" control={<Radio />} label="Dad" />
                        <FormControlLabel value="Brother" control={<Radio />} label="Brother" />
                    </RadioGroup>
                </FormControl>

                <Button variant="contained"
                    color="primary"
                    className="add-item-button">
                    Add Item
                </Button>
            </form>
        )
    }
}