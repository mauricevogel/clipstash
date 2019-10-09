import React from 'react';
import Grid from '@material-ui/core/Grid';
import SubmissionListCard from 'components/SubmissionListCard';

export default function SubmissionList(props) {
    const { 
        history,
        submissions, 
        searchState 
    } = props

    function handleSubmissionClick(slug) {
        history.push({
            pathname: '/submission/' + slug,
            state: searchState
        });
    }

    return (
        <Grid container spacing={0} >
            {submissions.map((submission) => (
                <SubmissionListCard
                    submission={submission}
                    key={submission.reddit_fullname}
                    clickHandler={handleSubmissionClick} />
            ))}
        </Grid>
    )
}