/* eslint-disable react/prop-types */
import { Autocomplete, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { getIn, FastField } from 'formik';
import React, { memo } from 'react';
import './custom.css';

export const dateFormatter = (date) => {
  // console.log(typeof date);
  console.log(date);
  // // Extract year, month, and day
  // const year = date.getFullYear();
  // const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
  // const day = String(date.getDate()).padStart(2, '0');

  // // Construct the date string in YYYY-MM-DD format
  // const formattedDate = `${year}-${month}-${day}`;

  // return formattedDate; // Output: "2024-04-02"
  const datePart = date.split(' ').slice(0, 4).join(' ');

  // Create a new Date object
  const dateIs = new Date(datePart);

  console.log(dateIs.toISOString().slice(0, 10));
};

export const NestedCustomTextField = memo(
  ({ label, valueName, handleChange, handleBlur, values, type, multiline, autocomplete, touched, errors, ...props }) => {
    return (
      <TextField
        fullWidth
        className="common-textfield"
        size="small"
        label={label}
        name={valueName}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values}
        type={type}
        multiline={multiline ? true : false}
        autoComplete={!autocomplete ? 'off' : 'on'}
        // placeholder={Boolean(getIn(touched, valueName) && getIn(errors, valueName))}
        error={Boolean(getIn(touched, valueName) && getIn(errors, valueName))}
        helperText={getIn(touched, valueName) && getIn(errors, valueName)}
        FormHelperTextProps={{
          style: {
            marginLeft: 0
          }
        }}
        {...props}
      />
    );
  }
);

export const CustomTextField = memo((props) => {
  return (
    <TextField
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
    />
  );
});

export const CustomAutoComplete = memo((props) => {
  console.log(props);
  const handleOptionChange = (event, optionName, setSelected) => {
    props.options.forEach((el) => {
      if (el[optionName] === event.target.outerText) {
        setSelected(el.id);
      }
    });
  };

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
      id="basic-autocomplete-label"
      options={props.options}
      // value={}
      defaultValue={(props.defaultValue && props.options.find((el) => el[props.optionName] === props.defaultValue)) || props.options[0]}
      // defaultValue={props.defaultValue && props.options.find((el) => el[props.optionName] === props.defaultValue)}
      // onChange={(e) => {
      //   props.handleChange(e);
      // }}
      onChange={(e) => handleOptionChange(e, props.optionName, props.setSelected)}
      // getOptionSelected
      getOptionLabel={(option) => option[props.optionName]} // Assuming 'product_type' is the label you want to display
      renderInput={(params) => <TextField {...params} label={props.label} />}
    />
  );
});
export const FormikAutoComplete = memo((props) => {
  console.log(props.formName, props.options, props.defaultValue);
  const setFieldValue = props.setFieldValue;

  const handleOptionChange = (event, optionName, formName, setFieldValue) => {
    props.options.forEach(async (el) => {
      console.log(props.options);
      if (el[optionName] === event.target.outerText) {
        // console.log(formName, el.id);
        await setFieldValue(formName, el.id);
      }
    });
  };

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
      id="basic-autocomplete-label"
      options={props.options}
      // defaultValue={(props.defaultValue && props.options.find((el) => el[props.optionName] === props.defaultValue)) || props.options[0]}
      // defaultValue={
      //   (typeof props.defaultValue === 'string' && props.options.find((el) => el[props.optionName] === props.defaultValue)) ||
      //   props.options.find((el) => el.id === props.defaultValue)
      // }
      defaultValue={
        (typeof props.defaultValue === 'string' && props.options.find((el) => el[props.optionName] === props.defaultValue)) ||
        (typeof props.defaultValue === 'number' && props.options.find((el) => el.id === props.defaultValue))
      }
      // defaultValue={
      //   typeof props.defaultValue === 'number'
      //     ? props.options.find((el) => el.id === props.defaultValue)
      //     : props.options.find((el) => el[props.optionName] === props.defaultValue)
      // }
      onChange={(e) => handleOptionChange(e, props.optionName, props.formName, setFieldValue)}
      // getOptionSelected
      getOptionLabel={(option) => option[props.optionName]} // Assuming 'product_type' is the label you want to display
      renderInput={(params) => <TextField {...params} label={props.label} />}
    />
  );
});

export const CustomCheckbox = (props) => {
  return (
    <FormControlLabel
      value={props.checked}
      control={<Checkbox checked={props.checked} onChange={props.handleChange} name={props.name} />}
      label={props.label}
      labelPlacement="start"
      sx={{ mr: 1, ml: 0 }}
    />
  );
};

export default CustomTextField;

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
//   InputProps={{
//     disableUnderline: true, // <== added this
//     startAdornment: props.startAdornment && props.startAdornment
//     // step: "0.1",
//   }}
