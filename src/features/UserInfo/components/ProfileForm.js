import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import * as Yup from "yup";

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

function ProfileForm({ firstName = "", lastName = "", onSubmit = () => {} }) {
	const classes = useStyles();
	const formRef = useRef();
	
	// const [firstNameState, setFirstNameState] = useState(firstName);
	// const [lastNameState, setLastNameState] = useState(lastName);

  const initialValues = {
    firstName,
    lastName,
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().trim().required("Required"),
    lastName: Yup.string().trim().required("Required"),
	});
	
	useEffect(() => {
		formRef.current.setFieldValue("firstName", firstName);
		formRef.current.setFieldValue("lastName", lastName);
	}, [firstName, lastName])

  return (
    <Box className={classes.form}>
      <Typography variant="h4">Profile</Typography>
      <Formik
				innerRef={formRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({
          values,
          handleSubmit,
          handleBlur,
          handleChange,
          errors,
          touched,
        }) => (
          <Form>
            <div className={classes.formContent}>
              <TextField
                name="firstName"
                label="First Name"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.firstName) && touched.firstName}
                helperText={touched.firstName && errors.firstName}
              />
              <TextField
                name="lastName"
                label="Last Name"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.lastName) && touched.lastName}
                helperText={touched.lastName && errors.lastName}
              />
              <Button variant="contained" color="primary" type="submit">
                Update
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default ProfileForm;
