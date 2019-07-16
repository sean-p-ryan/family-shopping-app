import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "../assets/App.css";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';




export default class EditItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            item_name: '',
            item_owner: '',
            item_max_budget: '',
            purchased: false
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeItemName = this.onChangeItemName.bind(this);
        this.onChangeMaxBudget = this.onChangeMaxBudget.bind(this);
        this.onChangeItemOwner = this.onChangeItemOwner.bind(this);
        this.onHandleSwitchChange = this.onHandleSwitchChange.bind(this);
        this.renderPurchasedButtonText = this.renderPurchasedButtonText.bind(this);
    }

    componentDidMount() {
        axios.get(process.env.BASE_URL + this.props.match.params.id 
                || 'http://localhost:4000/' + this.props.match.params.id)
            .then(res => {
                console.log("here's the data" + res.data.item_name)
                this.setState({
                    item_name: res.data.item_name,
                    item_owner: res.data.item_owner,
                    item_max_budget: res.data.item_max_budget,
                    purchased: res.data.purchased
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    // sent POST request to '../update/:id' endpoint with state data
    onSubmit = (e) => {
        e.preventDefault();

        const updatedItem = {
            item_name: this.state.item_name,
            item_max_budget: this.state.item_max_budget,
            item_owner: this.state.item_owner,
            purchased: this.state.purchased
        };

        axios.put(process.env.BASE_URL + this.props.match.params.id, updatedItem
                || 'http://localhost:4000/update/' + this.props.match.params.id, updatedItem)
            .then(res => console.log("Here's the updated data" + res.data));

        // redirects user back to default route
        this.props.history.push('/');
    }

    onChangeItemName = (e) => {
        this.setState({
            item_name: e.target.value
        })
    }

    onChangeMaxBudget = (e) => {
        this.setState({
            item_max_budget: e.target.value
        })
    }

    onChangeItemOwner = (e) => {
        this.setState({
            item_owner: e.target.value
        })
    }

    onHandleSwitchChange = (e) => {
        (!this.state.purchased) ?
            this.setState({
                purchased: true
            })
            :
            this.setState({
                purchased: false
            })
    }

    renderPurchasedButtonText = () => {
        return (!this.state.purchased) ?
            "Unmark as purchased"
            :
            "Mark as purchased"
    }

    deleteItem = () => {
        axios.delete(process.env.MONGODB_URI + this.props.match.params.id 
            || 'http://localhost:4000/update/' + this.props.match.params.id)
            .then(console.log("This item has been deleted."));
    }

    render() {
        return (
            <div>
                <h1>Update This Item</h1>

                <form
                    noValidate autoComplete="off"
                    className="add-item-form"
                    onSubmit={this.onSubmit}>
                    <TextField
                        id="standard-name"
                        placeholder={this.state.item_name}
                        className="form-field"
                        value={this.state.item_name}
                        onChange={this.onChangeItemName}
                    />
                    <TextField
                        id="standard-number"
                        label="Max Budget"
                        type="number"
                        className="form-field"
                        value={this.state.item_max_budget}
                        onChange={this.onChangeMaxBudget}
                    />
                    <FormControl className="form-field">
                        <FormLabel component="legend">Owner</FormLabel>
                        <RadioGroup
                            aria-label="Owner"
                            name="gender1"
                            className="group"
                            value={this.state.item_owner}
                            onChange={this.onChangeItemOwner}
                        >
                            <FormControlLabel value="Mom" control={<Radio />} label="Mom" />
                            <FormControlLabel value="Dad" control={<Radio />} label="Dad" />
                            <FormControlLabel value="Brother" control={<Radio />} label="Brother" />
                        </RadioGroup>
                    </FormControl>
                    <div>
                        <span>
                            {this.renderPurchasedButtonText()}
                        </span>
                        <Switch
                            onChange={this.onHandleSwitchChange}
                            value={this.state.purchased}
                            inputProps="Purchased"
                            checked={this.state.purchased}
                        />
                    </div>
                    <Button variant="contained"
                        color="primary"
                        className="add-item-button"
                        type="submit">
                    </Button>
                </form>
                <Button variant="contained"
                    color="primary"
                    className="add-item-button"
                    type="delete"
                    onClick={this.deleteItem}>
                </Button>
            </div>
        )
    }
}