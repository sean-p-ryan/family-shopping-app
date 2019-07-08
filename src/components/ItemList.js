import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

export default class ItemList extends Component {
    render() {
        return (
            <Typography component="div" variant="body1">
                <Box bgcolor="primary.main" style={{ backgroundColor: '#cfe8fc' }} p={2} m={1}>
                    Here's an item!
                </Box>
            </Typography>
        )
    }
}