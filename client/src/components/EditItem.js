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
    }

    componentDidMount() {
        axios.get('http://localhost:4000/' + this.props.match.params.id)
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

    onSubmit = (e) => {

    }

    changeItemName = () => {

    }

    changeMaxBudget = () => {

    }

    changeItemOwner = () => {

    }

    handleSwitchChange = (e) => {

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
                        onChange={this.changeItemName}
                    />
                    <TextField
                        id="standard-number"
                        label="Max Budget"
                        type="number"
                        className="form-field"
                        value={this.state.item_max_budget}
                        onChange={this.changeMaxBudget}
                    />
                    <FormControl className="form-field">
                        <FormLabel component="legend">Owner</FormLabel>
                        <RadioGroup
                            aria-label="Owner"
                            name="gender1"
                            className="group"
                            value={this.state.item_owner}
                            onChange={this.changeItemOwner}
                        >
                            <FormControlLabel value="Mom" control={<Radio />} label="Mom" />
                            <FormControlLabel value="Dad" control={<Radio />} label="Dad" />
                            <FormControlLabel value="Brother" control={<Radio />} label="Brother" />
                        </RadioGroup>
                    </FormControl>
                    <div>
                        Mark As Purchased
                    <Switch
                        onChange={this.handleSwitchChange}
                        value={false}
                        inputProps="Purchased"
                    />
                    </div>
                    <Button variant="contained"
                        color="primary"
                        className="add-item-button"
                        type="submit">
                    </Button>
                </form>
            </div>
        )
    }
}