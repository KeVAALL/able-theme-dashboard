import { useMemo, useState } from 'react';

// material-ui
import { Divider, Box, Card, Grid, CardContent, TableCell, Button, Stack, CardHeader } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Trash, Edit2, FilterSearch, DiscountShape, Additem, SearchNormal1 } from 'iconsax-react';
import { useQuery } from 'react-query';

// project-imports
import MainCard from '../../organisms/mainCard/MainCard';
import MultiTable from '../multiTable/multiTable';

// third-party
import { Formik } from 'formik';
import * as yup from 'yup';
import Loader from 'components/atoms/loader/Loader';
import { SubmitButton } from 'components/atoms/button/button';
import CustomTextField, { CustomAutoComplete, CustomCheckbox } from 'utils/textfield';

// assets
import { GetInvestorData, GetOneInvestor, SaveInvestor, EditInvestor, DeleteOneInvestor } from 'hooks/investor/investor';
import { display } from '@mui/system';
import AnimateButton from 'helpers/@extended/AnimateButton';

const headerSX = {
  p: 2.5,
  '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' }
};

function Investor() {
  // Main data
  const [investorData, setInvestorData] = useState([]);

  // Toggle Table and Form Visibility
  const [showTable, setShowTable] = useState(false);
  const changeTableVisibility = () => {
    setShowTable(!showTable);
  };

  // Edit Logic State
  const [isEditing, setIsEditing] = useState(false);
  const [isInvestorActive, setInvestorActive] = useState();
  const setEditing = (value) => {
    setFormValues(value);
  };
  const setActiveEditing = () => {
    setIsEditing(true);
  };
  const setActiveClose = () => {
    setIsEditing(false);
  };
  const handleIsInvestorActive = (initialValue) => {
    setInvestorActive(initialValue);
  };

  // Search one item state
  const setSearchData = (investor) => {
    setInvestorData(investor);
  };
  // Search one item form fields
  const filterFormValues = {
    search: ''
  };
  const formValueFields = [
    {
      fieldName: 'search',
      label: 'Global Search',
      type: 'text'
    }
  ];
  const filterValueFields = [
    {
      fieldName: 'search',
      label: 'Global Search',
      type: 'text'
    }
  ];
  const filterValidationSchema = yup.object({
    search: yup.string()
  });

  const formAllValues = {
    investor_name: '',
    pan_no: '',
    mobile_no: '',
    investor_type: ''
  };
  const [formValues, setFormValues] = useState(formAllValues);
  const validationSchema = yup.object({
    investor_name: yup.string().required('Investor Name is required'),
    pan_no: yup.string().required('Pan number is required'),
    mobile_no: yup.number().required('Mobile number is required'),
    investor_type: yup.string().required('Investor type is required')
  });
  const clearFormValues = () => {
    setFormValues(formAllValues);
  };
  // Custom fields/ columns
  const theme = useTheme();

  const StatusCell = ({ value }) => {
    return value === 0 ? 'Not Active' : 'Active';
  };
  const columns = useMemo(
    () => [
      {
        Header: 'investor Name',
        accessor: 'investor_name'
      },
      {
        Header: 'Pan Number',
        accessor: 'pan_no'
      },
      {
        Header: 'Mobile Number',
        accessor: 'mobile_no'
      },
      {
        Header: 'Type',
        accessor: 'investor_type'
      },
      {
        Header: 'Status',
        accessor: 'is_active',
        customCell: StatusCell
      }
    ],
    []
  );

  const {
    isPending,
    error,
    refetch: InvestorTableDataRefetch
  } = useQuery({
    queryKey: ['investorTableData'],
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    queryFn: GetInvestorData,
    onSuccess: (data) => {
      setInvestorData(data);
    }
  });

  if (isPending) return <Loader />;

  return (
    <>
      {showTable && (
        <Formik
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            if (isEditing === false) {
              SaveInvestor(values, InvestorTableDataRefetch, clearFormValues, checkedCumulative, checkedNonCumulative);
            }
            if (isEditing === true) {
              console.log('i am editing');

              console.log({ ...values, method_name: 'update' });
              EditInvestor(
                values,
                // isFDActive,
                isInvestorActive,
                InvestorTableDataRefetch,
                clearFormValues,
                setActiveClose
              );
            }

            changeTableVisibility();
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm, isSubmitting }) => (
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
                  title="Investor Entry"
                  changeTableVisibility={changeTableVisibility}
                  clearFormValues={clearFormValues}
                  isEditing={isEditing}
                  formValues={formValues}
                  setActiveClose={setActiveClose}
                  setIsActive={handleIsInvestorActive}
                  isActive={isInvestorActive}
                />

                <Divider />

                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={4}>
                      <CustomTextField
                        label="Investor Name"
                        name="investor_name"
                        values={values}
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched}
                        errors={errors}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <CustomTextField
                        label="Pan Number"
                        name="pan_no"
                        values={values}
                        type="string"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched}
                        errors={errors}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <CustomTextField
                        label="Mobile NUmber"
                        name="mobile_no"
                        values={values}
                        type="number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched}
                        errors={errors}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <CustomTextField
                        label="Investor type"
                        name="investor_type"
                        values={values}
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched}
                        errors={errors}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          )}
        </Formik>
      )}
      {!showTable && (
        <MainCard
          title="Investor"
          changeTableVisibility={changeTableVisibility}
          showButton
          setActiveAdding={setActiveClose}
          border
          sx={{ height: '100%', boxShadow: 1 }}
        >
          {/* here i will add the filter */}
          <Formik
            initialValues={formValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              const searchResult = await GetSchemeSearch(formValues.fd_id, selectedPayoutMethod);
              if (searchResult) {
                console.log(searchResult);
                setSchemeData(searchResult);
              }
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm }) => (
              <Box
                component="form"
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSubmit();
                }}
                sx={{ width: '100%' }}
              >
                {/* <Card
                  sx={{
                    position: 'relative',
                    border: '1px solid',
                    borderRadius: 1.5,
                    borderColor: theme.palette.divider,
                    overflow: 'visible'
                  }}
                > */}
                {/* <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <CardHeader sx={headerSX} titleTypographyProps={{ variant: 'subtitle1' }} title="Interest Rate" />
                    <Stack direction="row" alignItems="center" spacing={1.5} paddingRight={2.5}>
                      <Box>
                        <AnimateButton>
                          <Button
                            variant="outlined"
                            color="secondary"
                            type="button"
                            onClick={() => {
                              isNotEditingInterestRate();
                            }}
                          >
                            Cancel
                          </Button>
                        </AnimateButton>
                      </Box>
                    </Stack>
                  </Stack> */}

                {/* <Divider /> */}

                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={3} style={{ paddingLeft: 0 }}>
                      <CustomTextField
                        label="FD Name"
                        name="fd_name"
                        values={values}
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched}
                        errors={errors}
                        disabled
                        FormHelperTextProps={{
                          style: {
                            marginLeft: 0
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <Box>
                        <AnimateButton>
                          <Button fullWidth variant="contained" color="success" startIcon={<SearchNormal1 />} type="submit">
                            Show
                          </Button>
                        </AnimateButton>
                      </Box>
                    </Grid>

                    <Grid item xs={3}>
                      <CustomAutoComplete options={[]} handleChange={() => {}} optionName="item_value" label="Payout Method" />
                    </Grid>
                  </Grid>
                </CardContent>
                {/* </Card> */}
              </Box>
            )}
          </Formik>

          {/* ------------- */}
          <MultiTable
            columns={columns}
            data={investorData}
            formValues={filterFormValues}
            formValueFields={formValueFields}
            validationSchema={filterValidationSchema}
            changeTableVisibility={changeTableVisibility}
            setEditing={setEditing}
            getOneItem={GetOneInvestor}
            deleteOneItem={DeleteOneInvestor}
            setSearchData={setSearchData}
            tableDataRefetch={InvestorTableDataRefetch}
            setActiveEditing={setActiveEditing}
          />
        </MainCard>
      )}
    </>
  );
}

export default Investor;
