import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import setSubredditImage from '../../utils/setSubredditImage';

export default function SubredditGridItem({subreddit}) {
    const classes = useStyles();

    return (
        <Grid item xs={6} lg={2} md={3} sm={4} className={classes.gridItem}>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={setSubredditImage(subreddit.attributes.icon_image)}
                        title={subreddit.attributes.display_name}
                    />
                    <CardContent>
                        <Typography gutterBottom component="h6" noWrap>
                            {subreddit.attributes.display_name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {subreddit.attributes.subscribers} Subscribers
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
}

const useStyles = makeStyles({
    card: {
        maxWidth: 175,
        margin: "auto"
    },
    gridItem: {
        padding: 10
    },
    media: {
        height: 150,
        backgroundSize: "contain",
        backgroundColor: '#E0E0E0',
        padding: 5
    }
});
