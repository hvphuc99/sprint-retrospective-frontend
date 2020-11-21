import {
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useRef } from "react";

const useStyles = makeStyles({
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  form: {
    padding: "0px 20px",
  },
  formFooter: {
    marginTop: 20,
    marginBottom: 10,
    width: "100%",
    "& button": {
      width: "100%",
    },
  },
});

function ModalAddCardBoard({
  open = false,
  onSubmit = () => {},
  onClose = () => {},
}) {
  const classes = useStyles();
  const refSubmit = useRef();

  const initialValues = {
    name: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().required("Required"),
  });

  const handleUserKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      refSubmit.current.click();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth={true}>
      <DialogTitle className={classes.title} disableTypography>
        <Typography variant="h5">Add board</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <div className={classes.form}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({
            values,
            handleSubmit,
            handleChange,
            handleBlur,
            errors,
            touched,
          }) => (
            <Form>
              <TextField
                name="name"
                label="Name"
                value={values.name}
                autoComplete="off"
                autoFocus={true}
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.name) && touched.name}
                helperText={errors.name}
                multiline
                onKeyPress={handleUserKeyPress}
              />

              <div className={classes.formFooter}>
                <Button
                  ref={refSubmit}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Add
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Dialog>
  );
}

export default ModalAddCardBoard;
