import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
	CircularProgress,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import GoogleLogin from "react-google-login";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const useStyles = makeStyles({
  root: {
    "& .MuiCardHeader-content": {
      display: "flex",
      justifyContent: "center",
    },
  },
  formContent: {
    display: "flex",
    flexDirection: "column",
    "& .MuiTextField-root": {
      marginBottom: 20,
    },
  },
  formFooter: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    "& button": {
      display: "flex",
      justifyContent: "center",
      width: "100%",
      marginBottom: 20,
		},
  },
});

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string().trim().required("Required"),
  password: Yup.string().required("Required"),
});

function LoginForm({
  onSubmit = () => {},
  onLoginWithGoogle = () => {},
	onRegisterClick = () => {},
	isSubmitting = false,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({
          values,
          handleChange,
          handleBlur,
          errors,
          touched,
        }) => (
          <Form>
            <Card>
              <CardHeader title="Login" />

              <CardContent>
                <div className={classes.formContent}>
                  <TextField
                    name="username"
                    label="Username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.username) && touched.username}
                    helperText={touched.username && errors.username}
                  />

                  <TextField
                    name="password"
                    label="Password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.password) && touched.password}
                    helperText={touched.password && errors.password}
                  />
                </div>
              </CardContent>

              <CardActions>
                <div className={classes.formFooter}>
                  <Button variant="contained" color="primary" type="submit">
                    {isSubmitting ? <CircularProgress color="secondary" size={24} /> : "Login"}
                  </Button>
                  <GoogleLogin
                    clientId="208015310401-qcbrc5im2ajats2h1b2kgotjr73lod7t.apps.googleusercontent.com"
                    buttonText="Login with Google"
										onSuccess={onLoginWithGoogle}
										onFailure={() => {}}
                    cookiePolicy={"single_host_origin"}
                  />
                  <Typography variant="subtitle1">
                    Don't have an account?{" "}
                    <Link onClick={onRegisterClick}>Register</Link>
                  </Typography>
                </div>
              </CardActions>
            </Card>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;
