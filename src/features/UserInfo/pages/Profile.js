import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import userApi from "api/userApi";
import { setLoading } from "app/loadingSlice";
import Header from "components/Header";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  form: {
    width: 300,
    padding: 20,
    "& h4": {
      color: "#283593",
      marginBottom: 30,
    },
  },
  formContent: {
    display: "flex",
    flexDirection: "column",
    "& .MuiTextField-root": {
      marginBottom: 20,
    },
  },
});

function Profile(props) {
  const classes = useStyles();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;

    userApi
      .updateProfile(firstName, lastName)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handleChangeFirstName = (event) => {
    const firstName = event.target.value;
    setFirstName(firstName);
  };

  const handleChangeLastName = (event) => {
    const lastName = event.target.value;
    setLastName(lastName);
  };

  useEffect(() => {
    dispatch(setLoading(true));
    userApi
      .getProfile()
      .then((res) => {
        const { first_name, last_name } = res.user_info;
        setFirstName(first_name);
        setLastName(last_name);
        dispatch(setLoading(false));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
			<Header />
			<Box className={classes.form}>
				<Typography variant="h4">Profile</Typography>
				<form onSubmit={handleSubmit}>
					<div className={classes.formContent}>
						<TextField
							name="firstName"
							label="First Name"
							value={firstName}
							onChange={handleChangeFirstName}
						/>
						<TextField
							name="lastName"
							label="Last Name"
							value={lastName}
							onChange={handleChangeLastName}
						/>
						<Button variant="contained" color="primary" type="submit">
							Update
						</Button>
					</div>
				</form>
			</Box>
		</>
  );
}

export default Profile;
