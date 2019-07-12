import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

// functional component to render each item
const Item = props => (
    <tr>
        <td>{props.item.item_name}</td>
        <td>{props.item.item_max_budget}</td>
        <td>{props.item.item_owner}</td>
        <td>
            <Router>
                <Link to={"/update/" + props.item._id}>Edit</Link>
            </Router>
        </td>
    </tr>
)


export default class ItemList extends Component {
    constructor(props) {
        super(props);
        this.state = { items: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/')
            .then(res => {
                this.setState({ items: res.data });
                console.log("here are the items" + this.state.items)
            })
            .catch(function (err) {
                console.log(err);
            })
    }

    // Iterate through item list outputting "Item" component for each one
    itemList() {
        return this.state.items.map((currentItem, i) => {
            if (currentItem.item_name) {
                return <Item item={currentItem} key={i} />
            }
        })
    }

    render() {
        return (
            <Typography component="div" variant="body1">
                <table>
                    <tr bgcolor="primary.main" style={{ backgroundColor: '#cfe8fc' }}>
                        <th>Item name</th>
                        <th>Max budget</th>
                        <th>Responsible</th>
                        <th>Edit item</th>
                    </tr>
                    {this.itemList()}
                </table>


            </Typography>
        )
    }
}