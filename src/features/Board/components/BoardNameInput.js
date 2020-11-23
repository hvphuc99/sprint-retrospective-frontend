import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@material-ui/core";
import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import { useState } from "react";
import { useEffect } from "react";

function BoardNameInput({ name = "", edit = false, toggle = () => {} }) {
  const [value, setValue] = useState(name);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    setValue(name);
  }, [name]);

  return (
    <FormControl>
      <InputLabel>Name</InputLabel>
      <Input
        name="name"
        value={value}
        disabled={!edit}
				onChange={handleChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={toggle(value)}
            >
              {edit ? <SaveIcon /> : <EditIcon />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}

export default BoardNameInput;
