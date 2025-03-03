import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
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
      width: "100%",
    },
    "& h6": {
      marginTop: 20,
    },
  },
  firstNameInputContainer: {
    "& .MuiFormControl-root": {
      marginRight: 5,
    },
  },
  lastNameInputContainer: {
    "& .MuiFormControl-root": {
      marginLeft: 5,
    },
  },
});

const initialValues = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().trim().required("Required"),
  lastName: Yup.string().trim().required("Required"),
  username: Yup.string().trim().required("Required"),
  email: Yup.string().email("Email is not valid").required("Required"),
  password: Yup.string().required("Required").min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string().required("Required").oneOf([Yup.ref('password'), null], "Passwords must match"),
});

function RegisterForm({ onSubmit = () => {}, onLoginClick = () => {} }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ values, handleChange, handleBlur, errors, touched }) => (
          <Form>
            <Card>
              <CardHeader title="Register" />

              <CardContent>
                <div className={classes.formContent}>
                  <Grid container>
                    <Grid
                      items
                      xs={6}
                      className={classes.firstNameInputContainer}
                    >
                      <TextField
                        name="firstName"
                        label="First Name"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(errors.firstName) && touched.firstName}
                        helperText={touched.firstName && errors.firstName}
                      />
                    </Grid>
                    <Grid
                      items
                      xs={6}
                      className={classes.lastNameInputContainer}
                    >
                      <TextField
                        name="lastName"
                        label="Last Name"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(errors.lastName) && touched.lastName}
                        helperText={touched.lastName && errors.lastName}
                      />
                    </Grid>
                  </Grid>
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
                    name="email"
                    label="Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.email) && touched.email}
                    helperText={touched.email && errors.email}
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
                  <TextField
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.confirmPassword) && touched.confirmPassword}
                    helperText={touched.confirmPassword && errors.confirmPassword}
                  />
                </div>
              </CardContent>

              <CardActions>
                <div className={classes.formFooter}>
                  <Button variant="contained" color="primary" type="submit">
                    Register
                  </Button>
                  <Typography variant="subtitle1">
                    Already have an account?{" "}
                    <Link onClick={onLoginClick}>Login</Link>
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

export default RegisterForm;
