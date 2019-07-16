import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import axios from 'axios';
import EditItem from "./EditItem";



// functional component to render each item
const Item = props => (
    <tr>
        <td>{props.item.item_name}</td>
        <td>{props.item.item_max_budget}</td>
        <td>{props.item.item_owner}</td>
        <td>{props.item.purchased}</td>
        <td>
            <Link to={`/update/${props.item._id}`} component={EditItem}>Edit</Link>
        </td>
    </tr>
)

export default class ItemList extends Component {
    constructor(props) {
        super(props);
        this.state = { items: [] };

        this.itemList = this.itemList.bind(this);
    }

    componentDidMount() {
        console.log("this mount this.state: ", this.itemList())
        axios.get("https://family-shopping-app.herokuapp.com/api")
            .then(res => {
                console.log('res.data ', res.data);
                this.setState({ items: res.data });
            })
            .catch(function (err) {
                console.log('err: ', err);
                console.log('no go');
            })
    }

    // componentDidUpdate() {
    //     console.log("updated this.state: ", this.itemList());
    // }

    // Iterate through item list outputting "Item" component for each one
    itemList() {
        console.log(this.state)
        return this.state.items.map(function (currentItem, i) {
            return <Item item={currentItem} key={i} />
        });
    }

    render() {
        return (
            <Typography component="div" variant="body1">
                <table>
                    <tbody>
                        <tr bgcolor="primary.main" style={{ backgroundColor: '#cfe8fc' }}>
                            <th>Item name</th>
                            <th>Max budget</th>
                            <th>Responsible</th>
                            <th>Purchased</th>
                            <th>Edit</th>
                        </tr>
                        {this.itemList()}
                    </tbody>
                </table>
            </Typography>
        )
    }
}