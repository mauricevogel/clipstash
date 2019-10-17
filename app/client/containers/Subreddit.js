import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";
import withErrorHandler from "hoc/withErrorHandler";
import {
    LoadingIndicator,
    MaxWidthContainer,
    SubmissionList,
    SubredditHeader
} from "components";

const INITIAL_STATE = {
    submissions: [],
    sortMethod: "hot",
    hasMore: false,
    nextPage: 1,
    initialLoad: true
};

function Subreddit(props) {
    const { history, match } = props;
    const [data, setData] = useState(INITIAL_STATE);
    const [subreddit, setSubreddit] = useState(null);
    const displayName = match.params.displayName;
    let header, initialLoadingIndicator = null;

    useEffect(() => {
        setData(INITIAL_STATE);
        fetchSubredditData();
        fetchSubmissionData(null, "hot");
    }, [displayName]);

    async function fetchSubredditData() {
        const result = await axios("/api/v1/subreddits/" + displayName);
        if (result) {
            setSubreddit(result.data.subreddit);
        }
    }

    async function fetchSubmissionData(infiniteScrollPage = null, sortMethod = null) {
        // Prevents unneccessary first load of the infinite-scroller
        if (infiniteScrollPage && !data.hasMore) { return ; }

        const sort = sortMethod ? sortMethod : data.sortMethod
        const page = sortMethod ? 1 : data.nextPage
        const params = { sort: sort, page: page }
        const result = await axios("/api/v1/submissions/" + displayName, { params: params });

        if (result) {
            const submissions = sortMethod ? [] : [...data.submissions]
            const updatedData = {
                submissions: [...submissions, ...result.data.submissions],
                sortMethod: sort,
                nextPage: result.data.meta.next_page,
                hasMore: result.data.meta.next_page != null,
                initialLoad: false
            }

            setData(updatedData);
        }
    }

    function handleSortChange(event) {
        setData(INITIAL_STATE);
        fetchSubmissionData(null, event.target.value);
    }

    if (subreddit) {
        header = (
            <SubredditHeader
                subreddit={subreddit}
                sortMethod={data.sortMethod}
                sortChangeHandler={handleSortChange} />
        )
    }

    if (data.initialLoad) { 
        initialLoadingIndicator = <LoadingIndicator key="loadingIndicator" />; 
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>{displayName}</title>
            </Helmet>
            <MaxWidthContainer>
                {header}
                <InfiniteScroll
                    initialLoad={false}
                    loadMore={fetchSubmissionData}
                    hasMore={data.hasMore}
                    loader={<LoadingIndicator key="loadingIndicator" />}
                >
                    <SubmissionList
                        submissions={data.submissions}
                        searchState={{ sortMethod: data.sortMethod }}
                        history={history}
                    />
                    {initialLoadingIndicator}
                </InfiniteScroll>
            </MaxWidthContainer>
        </React.Fragment>

    );
}

export default withErrorHandler(Subreddit);