import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { removeToken } from "app/userSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { resetBoard } from "features/Board/boardSlice";

const useStyles = makeStyles({
  root: {
    "& .MuiToolbar-root": {
      display: "flex",
      justifyContent: "space-between",
		},
	},
	headerLeft: {
		display: "flex",
		"& h6": {
			cursor: "pointer",
			marginRight: 40,
		},
	},
	headerRight: {
		"& h6": {
			marginRight: 10,
		},
	},
});

function Header(props) {
  const classes = useStyles();

	const history = useHistory();
	const dispatch = useDispatch();

  const handleLogoutClick = () => {
		dispatch(removeToken());
		dispatch(resetBoard());
    history.push("/login");
  };

  const handleProfileClick = () => {
    history.push("/profile");
  };

  const handleMyBoardClick = () => {
    history.push("/boards");
	};

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.headerLeft}>
						<Typography variant="h6" onClick={handleMyBoardClick}>My Board</Typography>
						<Typography variant="h6" onClick={handleProfileClick}>Profile</Typography>
					</div>
          <div className={classes.headerRight}>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleLogoutClick}
              color="inherit"
            >
							<Typography variant="h6">Logout</Typography>
              <ExitToAppIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
