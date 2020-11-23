import {
  Container,
  makeStyles,
} from "@material-ui/core";
import userApi from "api/userApi";
import { setToken } from "app/userSlice";
import RegisterForm from "features/Auth/components/RegisterForm";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import logo from "assets/images/logo.svg";

const useStyles = makeStyles({
  root: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		"& img": {
			height: 40,
			width: 200,
			marginTop: 40,
			marginBottom: 40,
		},
  },
  form: {
    width: 400,
		boxShadow: "0 2px 8px 0 rgba(62,62,82,0.1)",
		"@media (max-width: 500px)": {
			width: 300,
    },
  },
});

function Register() {
  const classes = useStyles();

  const history = useHistory();
  const dispatch = useDispatch();

  const handleLoginClick = () => {
    history.push("/login");
  };

  const handleSubmit = (event) => {
		const { username, password, email, firstName: first_name, lastName: last_name} = event;
		
		if (Boolean(username) && Boolean(password) && Boolean(email) && Boolean(first_name) && Boolean(last_name)) {
			userApi
      .register(username, password, email, first_name, last_name)
      .then((res) => {
        const { token } = res;

				dispatch(setToken(token));
				history.push("/boards");
      })
      .catch((err) => {
        history.push("/login");
      });
		} else {
			//Do nothing
		}
  };

  return (
    <Container className={classes.root}>
			<img src={logo} alt="easy-retro" />
      <div className={classes.form}>
        <RegisterForm onSubmit={handleSubmit} onLoginClick={handleLoginClick} />
      </div>
    </Container>
  );
}

export default Register;
