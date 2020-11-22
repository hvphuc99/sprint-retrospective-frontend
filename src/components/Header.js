import {
  AppBar,
  Box,
  IconButton,
  makeStyles,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import { removeToken } from "app/userSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { resetBoard } from "features/Board/boardSlice";
import { useState } from "react";
import { useEffect } from "react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    "& .MuiToolbar-root": {
      display: "flex",
      justifyContent: "space-between",
    },
    "& .MuiAppBar-positionStatic": {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    "& #simple-tabpanel-0": {
      backgroundColor: "#f3f3f3",
    },
    "& #simple-tabpanel-1": {
      backgroundColor: "#f3f3f3",
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
}));

const tabs = [
	{
		label: "My Board",
		url: "/boards",
	},
	{
		label: "Profile",
		url: "/profile",
	},
];


function Header() {
  const classes = useStyles();

  const history = useHistory();
  const dispatch = useDispatch();
	const [value, setValue] = useState(-1);
	const location = useLocation();

  const handleChange = (event, newValue) => {
		setValue(newValue);
		const newUrl = tabs[newValue].url;
		history.push(newUrl);
	};

  const handleLogoutClick = () => {
    dispatch(removeToken());
    dispatch(resetBoard());
    history.push("/login");
	};

	useEffect(() => {
		const path = location.pathname;

		if (path === "/boards") {
			setValue(0);
		} else {
			if (path === "/profile") {
				setValue(1);
			} else {
				setValue(-1);
			}
		}
	}, [location])

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          {tabs?.map(({ label }, index) => (
            <Tab label={label} {...a11yProps(index)} />
          ))}
        </Tabs>
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
      </AppBar>
    </div>
  );
}

export default Header;
