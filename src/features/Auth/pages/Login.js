import { Container, makeStyles } from "@material-ui/core";
import userApi from "api/userApi";
import { setToken } from "app/userSlice";
import LoginForm from "features/Auth/components/LoginForm";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import logo from "assets/images/logo.svg";
import { useState } from "react";
import { setLoading } from "app/loadingSlice";

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
  },
});

function Login() {
  const classes = useStyles();

  const history = useHistory();
	const dispatch = useDispatch();
	const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegisterClick = () => {
    history.push("/register");
  };

  const handleSubmit = (event) => {
		setIsSubmitting(true);

		const { username, password} = event;
		
    userApi.login(username, password).then((res) => {
			setIsSubmitting(false);
      const { token } = res;
      dispatch(setToken(token));
			history.push("/boards");
    }).catch((err) => setIsSubmitting(false));
  };

  const handleLoginWithGoogle = (res) => {
		dispatch(setLoading(true));

    const first_name = res.profileObj.givenName;
    const last_name = res.profileObj.familyName;
    const email = res.profileObj.email;
    const tokenID = res.tokenId;
    userApi
      .loginWithGoogle(tokenID, email, first_name, last_name)
      .then((res) => {
        const { token } = res;
				dispatch(setToken(token));
        history.push("/boards");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container className={classes.root}>
			<img src={logo} alt="easy-retro" />
      <div className={classes.form}>
        <LoginForm
          onSubmit={handleSubmit}
          onLoginWithGoogle={handleLoginWithGoogle}
					onRegisterClick={handleRegisterClick}
					isSubmitting={isSubmitting}
        />
      </div>
    </Container>
  );
}

export default Login;
