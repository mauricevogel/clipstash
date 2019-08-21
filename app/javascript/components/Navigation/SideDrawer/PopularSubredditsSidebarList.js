import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

const useStyles = makeStyles({
    subredditImage: {
        width: "20px",
        height: "20px"
    }
});

export default function PopularSubredditsList() {
    const classes = useStyles();
    const [data, setData] = useState({ subreddits: [] });

    async function fetchData() {
        const result = await axios('/api/v1/subreddits/popular');
        setData({ subreddits: result.data.data });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <List>
            <ListSubheader>Popular Subreddits</ListSubheader>
            {data.subreddits.map((subreddit, index) => (
                <ListItem button key={subreddit.id}>
                    <ListItemIcon>
                        <img src={subreddit.attributes.icon_image} className={classes.subredditImage} />
                    </ListItemIcon>
                    <ListItemText primary={subreddit.attributes.display_name} />
                </ListItem>
            ))}
        </List>
    );
}