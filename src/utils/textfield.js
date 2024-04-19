/* eslint-disable react/prop-types */
import { Autocomplete, Checkbox, FormControlLabel, TextField } from '@mui/material';
import React from 'react';
import './custom.css';

export const CustomTextField = (props) => {
  return (
    <TextField
      //   variant="standard"
      fullWidth
      className="common-textfield"
      size="small"
      label={props.label}
      name={props.name}
      onChange={props.handleChange}
      onBlur={props.handleBlur}
      value={props.values[props.name]}
      type={props.type}
      multiline={props.multiline ? true : false}
      autoComplete={!props.autocomplete ? 'off' : 'on'}
      error={props.touched[props.name] && Boolean(props.errors[props.name])}
      placeholder={props.touched[props.name] && props.errors[props.name]}
      helperText={props.touched[props.name] && props.errors[props.name]}
      FormHelperTextProps={{
        style: {
          marginLeft: 0
        }
      }}
      {...props}
      //   InputProps={{
      //     disableUnderline: true, // <== added this
      //     startAdornment: props.startAdornment && props.startAdornment
      //     // step: "0.1",
      //   }}
    />
  );
};

export const CustomAutoComplete = (props) => {
  return (
    <Autocomplete
      fullWidth
      disablePortal
      className="common-autocomplete"
      componentsProps={{
        popper: {
          modifiers: [
            {
              name: 'flip',
              enabled: false
            },
            {
              name: 'preventOverflow',
              enabled: false
            }
          ]
        }
      }}
      //   style={{paddingBlock:"6px"}}
      id="basic-autocomplete-label"
      //   options={autocompleteData}
      options={props.options}
      getOptionLabel={(option) => option[props.optionName]} // Assuming 'product_type' is the label you want to display
      renderInput={(params) => <TextField {...params} label={props.label} />}
    />
  );
};

export const CustomCheckbox = (props) => {
  return (
    <FormControlLabel
      value={props.checked}
      control={<Checkbox checked={props.checked === 1} onChange={props.handleChange} name={props.name} />}
      label={props.label}
      labelPlacement="start"
      sx={{ mr: 1, ml: 0 }}
    />
  );
};

{
  /* <TextField
                  variant="standard"
                  label="Product ID"
                  name="product_type_id"
                  type="number"
                  autoComplete="off"
                  // placeholder="Product ID"
                  value={values.product_type_id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.product_type_id && Boolean(errors.product_type_id)}
                  helperText={touched.product_type_id && errors.product_type_id}
                /> */
}

export default CustomTextField;
