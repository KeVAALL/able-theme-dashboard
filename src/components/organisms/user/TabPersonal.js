import { useOutletContext } from 'react-router';

// material-ui
import {
  Autocomplete,
  Box,
  Button,
  CardHeader,
  Chip,
  Divider,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project-imports
import MainCard from '../mainCard/MainCard';
import countries from './data/countries';
// import { dispatch } from 'redux';
// import { openSnackbar } from 'redux/reducers/snackbar';

// assets
import { Add } from 'iconsax-react';
import { CustomTextField, FormikAutoComplete } from 'utils/textfield';

// styles & constant
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
};

const skills = [
  'Adobe XD',
  'After Effect',
  'Angular',
  'Animation',
  'ASP.Net',
  'Bootstrap',
  'C#',
  'CC',
  'Corel Draw',
  'CSS',
  'DIV',
  'Dreamweaver',
  'Figma',
  'Graphics',
  'HTML',
  'Illustrator',
  'J2Ee',
  'Java',
  'Javascript',
  'JQuery',
  'Logo Design',
  'Material UI',
  'Motion',
  'MVC',
  'MySQL',
  'NodeJS',
  'npm',
  'Photoshop',
  'PHP',
  'React',
  'Redux',
  'Reduxjs & tooltit',
  'SASS',
  'SCSS',
  'SQL Server',
  'SVG',
  'UI/UX',
  'User Interface Designing',
  'Wordpress'
];

function useInputRef() {
  return useOutletContext();
}

// ==============================|| USER PROFILE - PERSONAL ||============================== //

const TabPersonal = () => {
  const handleChangeDay = (event, date, setFieldValue) => {
    setFieldValue('dob', new Date(date.setDate(parseInt(event.target.value, 10))));
  };

  const handleChangeMonth = (event, date, setFieldValue) => {
    setFieldValue('dob', new Date(date.setMonth(parseInt(event.target.value, 10))));
  };

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);
  const inputRef = useInputRef();

  return (
    <MainCard content={false} title="Personal Information" sx={{ '& .MuiInputLabel-root': { fontSize: '0.875rem' } }}>
      <Formik
        initialValues={{
          username: 'Stebin',
          email: 'stebin.ben@gmail.com',
          countryCode: '+91',
          contact: 9652364852,
          address: '3801 Chalk Butte Rd, Cut Bank, MT 59427, United States',
          address1: '301 Chalk Butte Rd, Cut Bank, NY 96572, New York',
          country: 'US',
          state: 'California',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().max(255).required('First Name is required.'),
          email: Yup.string().email('Invalid email address.').max(255).required('Email is required.'),
          contact: Yup.number()
            .test('len', 'Contact should be exactly 10 digit', (val) => val?.toString().length === 10)
            .required('Phone number is required'),
          address: Yup.string().min(50, 'Address to short.').required('Address is required'),
          country: Yup.string().required('Country is required'),
          state: Yup.string().required('State is required')
        })}
        onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
          try {
            // dispatch(
            //   openSnackbar({
            //     open: true,
            //     message: 'Personal profile updated successfully.',
            //     variant: 'alert',
            //     alert: {
            //       color: 'success'
            //     },
            //     close: false
            //   })
            // );
            setStatus({ success: false });
            setSubmitting(false);
          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, setFieldValue, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <CardHeader title="User Details" />
            <Divider />
            <Box sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    label="User Name"
                    name="username"
                    placeholder="Enter User Name"
                    values={values}
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched}
                    errors={errors}
                    autoComplete
                    FormHelperTextProps={{
                      style: {
                        marginLeft: 0
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                    <Select value={values.countryCode} name="countryCode" onBlur={handleBlur} onChange={handleChange}>
                      <MenuItem value="+91">+91</MenuItem>
                      <MenuItem value="1-671">1-671</MenuItem>
                      <MenuItem value="+36">+36</MenuItem>
                      <MenuItem value="(225)">(255)</MenuItem>
                      <MenuItem value="+39">+39</MenuItem>
                      <MenuItem value="1-876">1-876</MenuItem>
                      <MenuItem value="+7">+7</MenuItem>
                      <MenuItem value="(254)">(254)</MenuItem>
                      <MenuItem value="(373)">(373)</MenuItem>
                      <MenuItem value="1-664">1-664</MenuItem>
                      <MenuItem value="+95">+95</MenuItem>
                      <MenuItem value="(264)">(264)</MenuItem>
                    </Select> */}
                  <CustomTextField
                    label="Contact Number"
                    name="contact"
                    placeholder="Enter Contact Number"
                    values={values}
                    type="text"
                    regType="number"
                    setFieldValue={setFieldValue}
                    onBlur={handleBlur}
                    touched={touched}
                    errors={errors}
                    autoComplete
                    FormHelperTextProps={{
                      style: {
                        marginLeft: 0
                      }
                    }}
                    inputProps={{ maxLength: 10 }}
                  />
                  {/* </Stack> */}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    label="Email ID"
                    name="email"
                    placeholder="Enter Email ID"
                    values={values}
                    type="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched}
                    errors={errors}
                    autoComplete
                    FormHelperTextProps={{
                      style: {
                        marginLeft: 0
                      }
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
            <CardHeader title="Address" />
            <Divider />
            <Box sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    multiline
                    rows={3}
                    label="Address"
                    name="address"
                    placeholder="Enter Address"
                    values={values}
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched}
                    errors={errors}
                    autoComplete
                    FormHelperTextProps={{
                      style: {
                        marginLeft: 0
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    multiline
                    rows={3}
                    label="Address Line 2"
                    name="address1"
                    placeholder="Enter Address"
                    values={values}
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched}
                    errors={errors}
                    autoComplete
                    FormHelperTextProps={{
                      style: {
                        marginLeft: 0
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormikAutoComplete
                    options={countries}
                    defaultValue={values.country}
                    setFieldValue={setFieldValue}
                    formName="country"
                    keyName="code"
                    idName="code"
                    optionName="label"
                    label="Select Country"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    label="State"
                    name="state"
                    placeholder="Enter State"
                    values={values}
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched}
                    errors={errors}
                    autoComplete
                    FormHelperTextProps={{
                      style: {
                        marginLeft: 0
                      }
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </form>
        )}
      </Formik>
    </MainCard>
  );
};

export default TabPersonal;

{
  /* <Stack spacing={1.25}>
  <InputLabel htmlFor="personal-country">Country</InputLabel>
  <Autocomplete
    id="personal-country"
    fullWidth
    value={countries.filter((item) => item.code === values?.country)[0]}
    onBlur={handleBlur}
    onChange={(event, newValue) => {
      setFieldValue('country', newValue === null ? '' : newValue.code);
    }}
    options={countries}
    autoHighlight
    isOptionEqualToValue={(option, value) => option.code === value?.code}
    getOptionLabel={(option) => option.label}
    renderOption={(props, option) => (
      <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
        {option.code && (
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt=""
          />
        )}
        {option.label}
        {option.code && `(${option.code}) ${option.phone}`}
      </Box>
    )}
    renderInput={(params) => (
      <TextField
        {...params}
        placeholder="Choose a country"
        name="country"
        inputProps={{
          ...params.inputProps,
          autoComplete: 'new-password' // disable autocomplete and autofill
        }}
      />
    )}
  />
  {touched.country && errors.country && (
    <FormHelperText error id="personal-country-helper">
      {errors.country}
    </FormHelperText>
  )}
</Stack>; */
}
