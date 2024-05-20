import { useMemo, useState } from 'react';

// material-ui
import { Divider, Box, Card, Grid, CardContent, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useQuery } from 'react-query';

// project-imports
import MainCard from '../../organisms/mainCard/MainCard';
import MultiTable from '../multiTable/multiTable';

// third-party
import { Formik } from 'formik';
import Loader from 'components/atoms/loader/Loader';

// assets
import { SubmitButton } from 'components/atoms/button/button';
import CustomTextField, { FormikAutoComplete } from 'utils/textfield';
import {
  formAllValues,
  validationSchema,
  filterFormValues,
  formValueFields,
  filterValidationSchema,
  tableColumns,
  VisibleColumn
} from 'constant/userRoleValidation';
import { GetIssuerData, GetOneIssuer, SaveIssuer, EditIssuer, DeleteOneIssuer } from 'hooks/issuer/issuer';
import { FilterSearch } from 'iconsax-react';

function Role() {
  // Main data state to hold the list of issuers
  const [userRoleData, setUserRoleData] = useState([]);
  // Editing States
  const [isEditing, setIsEditing] = useState(false); // State to track if editing mode is active
  const [isRoleActive, setRoleActive] = useState(); // State to track if the issuer is active or not active
  // Form Visibility
  const [showTable, setShowTable] = useState(false); // State to hold form input values
  // Form State
  const [formValues, setFormValues] = useState(formAllValues); // State to hold form input values
  // Theme
  const theme = useTheme();
  const mdUp = theme.breakpoints.up('md');

  // Functions
  // Editing States
  const setEditing = (value) => {
    setFormValues(value);
  };
  // Activates editing mode
  const setActiveEditing = () => {
    setIsEditing(true);
  };
  // Deactivates editing mode
  const setActiveClose = () => {
    setIsEditing(false);
  };
  const handleIsRoleActive = (initialValue) => {
    setRoleActive(initialValue);
  };
  // Form Visibility
  const changeTableVisibility = () => {
    setShowTable(!showTable);
  };
  // Search Data
  const setSearchData = (role) => {
    setUserRoleData(role);
  };
  // Empty Form Fields
  const clearFormValues = () => {
    setFormValues(formAllValues);
  };
  // Table Columns
  const columns = useMemo(() => tableColumns, []);

  // Query for fetching issuer data // Main Data
  //   const {
  //     isPending, // Flag indicating if query is pending
  //     error, // Error object if query fails
  //     refetch: issuerTableDataRefetch // Function to refetch issuer data
  //   } = useQuery({
  //     queryKey: ['issuerTableData'], // Unique key for the query
  //     refetchOnWindowFocus: false, // Disable refetch on window focus
  //     keepPreviousData: true, // Keep previous data when refetching
  //     queryFn: GetIssuerData, // Function to fetch issuer data
  //     onSuccess: (data) => {
  //       console.log(data);
  //       setIssuerData(data); // Update issuer data on successful query
  //     }
  //   });

  //   if (isPending) return <Loader />;

  return (
    <>
      {showTable && (
        <Formik
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            if (isEditing === false) {
              try {
                const response = await SaveIssuer(values, issuerTableDataRefetch, clearFormValues);
                changeTableVisibility();
              } catch (err) {
                console.log(err);
              }
            }
            if (isEditing === true) {
              try {
                const response = await EditIssuer(values, isIssuerActive, issuerTableDataRefetch, clearFormValues, setActiveClose);
                changeTableVisibility();
              } catch (err) {
                console.log(err);
              }
            }
            // changeTableVisibility();
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            isValid,
            dirty,
            resetForm,
            isSubmitting
          }) => (
            <Box
              component="form"
              onSubmit={(event) => {
                event.preventDefault();
                handleSubmit();
              }}
              sx={{ width: '100%' }}
            >
              <Card
                sx={{
                  position: 'relative',
                  border: '1px solid',
                  borderRadius: 1.5,
                  borderColor: theme.palette.divider,
                  overflow: 'visible'
                }}
              >
                <SubmitButton
                  title="Role Entry"
                  changeTableVisibility={changeTableVisibility}
                  clearFormValues={clearFormValues}
                  isEditing={true}
                  formValues={formValues}
                  setActiveClose={setActiveClose}
                  setIsActive={handleIsRoleActive}
                  isActive={isRoleActive}
                  isValid={isValid}
                  dirty={dirty}
                />

                <Divider />

                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item md={4} sm={6} xs={12}>
                      <CustomTextField
                        label="User Name"
                        name="username"
                        placeholder={'Please enter User Name'}
                        values={values}
                        type="text"
                        regType="string"
                        setFieldValue={setFieldValue}
                        onBlur={handleBlur}
                        touched={touched}
                        errors={errors}
                        fullWidth
                        FormHelperTextProps={{
                          style: {
                            marginLeft: 0
                          }
                        }}
                      />
                    </Grid>
                    <Grid item md={4} sm={6} xs={12}>
                      <CustomTextField
                        label="Mobile Number"
                        name="mobile_no"
                        placeholder={'Please enter Mobile Number'}
                        values={values}
                        type="text"
                        regType="number"
                        setFieldValue={setFieldValue}
                        onBlur={handleBlur}
                        touched={touched}
                        errors={errors}
                        fullWidth
                        FormHelperTextProps={{
                          style: {
                            marginLeft: 0
                          }
                        }}
                        inputProps={{ maxLength: 15 }}
                      />
                    </Grid>
                    <Grid item md={4} sm={6} xs={12}>
                      <CustomTextField
                        label="Email ID"
                        name="email_id"
                        placeholder="Please enter Email ID"
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

                    <Grid item md={4} sm={6} xs={12}>
                      <FormikAutoComplete
                        options={[]}
                        defaultValue={values.role}
                        setFieldValue={setFieldValue}
                        formName="role"
                        optionName="role"
                        label="Select Role"
                      />
                    </Grid>

                    <Grid item md={4} sm={6} xs={12}></Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          )}
        </Formik>
      )}
      {!showTable && (
        <MainCard
          title="Role Search"
          changeTableVisibility={changeTableVisibility}
          showButton
          setActiveAdding={setActiveClose}
          border
          contentSX={{ p: 2 }}
          sx={{ height: '100%', boxShadow: 1 }}
        >
          <Formik
            initialValues={{
              username: '',
              role: 1
            }}
            onSubmit={async (values, { resetForm }) => {
              //   const searchResult = await GetIFASearch(values);
              //   if (searchResult) {
              //     setSearchData(searchResult);
              //   }
            }}
          >
            {({ values, errors, touched, setFieldValue, handleChange, handleBlur, handleSubmit, resetForm }) => (
              <Box
                component="form"
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSubmit();
                }}
                sx={{ width: '100%' }}
              >
                <CardContent sx={{ paddingLeft: '16px !important' }}>
                  <Grid container spacing={2}>
                    <Grid item xs={2.5} style={{ paddingLeft: 0, paddingTop: 0 }}>
                      <CustomTextField
                        label="User Name"
                        name="username"
                        values={values}
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched}
                        errors={errors}
                        FormHelperTextProps={{
                          style: {
                            marginLeft: 0
                          }
                        }}
                      />
                    </Grid>

                    <Grid item xs={2.5} style={{ paddingTop: 0 }}>
                      <FormikAutoComplete
                        options={[]}
                        defaultValue={values.role}
                        setFieldValue={setFieldValue}
                        formName="role"
                        optionName="role"
                        label="Role"
                      />
                    </Grid>

                    <Grid item xs={1.5} style={{ paddingTop: 0 }}>
                      <Button
                        variant="contained"
                        color="success"
                        type="submit"
                        startIcon={<FilterSearch />}
                        sx={{
                          justifySelf: 'center',
                          width: !mdUp ? 'auto' : '100%',
                          borderRadius: 0.6 // Set width to 'auto' when screen size is medium or larger, otherwise '100%'
                        }}
                      >
                        Search
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Box>
            )}
          </Formik>

          <MultiTable
            columns={columns}
            data={userRoleData}
            formValues={{}}
            // formValueFields={formValueFields}
            // validationSchema={filterValidationSchema}
            changeTableVisibility={changeTableVisibility}
            setEditing={setEditing}
            getOneItem={GetOneIssuer}
            deleteOneItem={DeleteOneIssuer}
            setSearchData={setSearchData}
            tableDataRefetch={() => {}}
            setActiveEditing={setActiveEditing}
            VisibleColumn={VisibleColumn}
          />
        </MainCard>
      )}
    </>
  );
}

export default Role;
