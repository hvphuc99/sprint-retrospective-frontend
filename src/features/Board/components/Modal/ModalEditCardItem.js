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

function ModalEditCardItem({
  open = false,
  onSubmit = () => {},
  onClose = () => {},
  value = "",
}) {
  const classes = useStyles();
  const refSubmit = useRef();

  const initialValues = {
    content: value,
  };

  const validationSchema = Yup.object().shape({
    content: Yup.string().trim().required("Required"),
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
                helperText={touched.content && errors.content}
                fullWidth
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
