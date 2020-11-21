import {
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";

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

function ModalEditCardItem({
  open = false,
  onSubmit = () => {},
  onClose = () => {},
  value = "",
}) {
  const classes = useStyles();

  const initialValues = {
    content: value,
  };

  const validationSchema = Yup.object().shape({
    content: Yup.string().trim().required("Required"),
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth={true}>
      <DialogTitle className={classes.title} disableTypography>
        <Typography variant="h5">Create board</Typography>
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
            handleBlur,
            handleChange,
            errors,
            touched,
          }) => (
            <Form>
              <TextField
                name="content"
                value={values.content}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
                autoFocus={true}
                error={Boolean(errors.content) && touched.content}
                helperText={errors.content}
                fullWidth
              />

              <div className={classes.formFooter}>
                <Button variant="contained" color="primary" type="submit">
                  Update
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Dialog>
  );
}

export default ModalEditCardItem;
