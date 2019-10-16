import React from "react";
import { Divider, Drawer } from "@material-ui/core";
import { SidebarLinks, SidebarSubreddits } from "components";

import useStyles from "./Styles";

export default function Sidebar(props) {
    const {
        mobileMenu,
        mobileMenuHandler,
        popularSubreddits
    } = props;
    const classes = useStyles();

    function closeDrawerHandler() {
        mobileMenu ? mobileMenuHandler() : null
    }

    const sideBarContent = (
        <div role="presentation" className={classes.list}>
            <SidebarLinks closeDrawer={closeDrawerHandler} />
            <Divider />
            <SidebarSubreddits
                closeDrawer={closeDrawerHandler}
                subreddits={popularSubreddits}
            />
        </div>
    );
    /**
     * First <Drawer> is only for xs and sm screen sizes. Else it's hidden
     * Second <Drawer> is for screen sizes >= md. Else it's hidden
     */
    return (
        <React.Fragment>
            <Drawer
                open={mobileMenu}
                onClose={mobileMenuHandler}
            >
                {sideBarContent}
            </Drawer>
            <Drawer
                classes={{
                    paper: classes.drawerPaper,
                }}
                className={classes.desktopDrawer}
                variant="permanent"
            >
                <div className={classes.toolbar} />
                {sideBarContent}
            </Drawer>
        </React.Fragment>
    );
}