import { useEffect, useMemo, useState } from 'react';

// material-ui
import { Divider, Box, Card, Grid, CardContent, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useQuery } from 'react-query';

// project-imports
import MainCard from '../../organisms/mainCard/MainCard';
import MultiTable from '../multiTable/multiTable';
import Loader from 'components/atoms/loader/Loader';

// third-party
import * as yup from 'yup';
import { Formik } from 'formik';
import { Eye, FilterSearch, Calculator, TimerStart } from 'iconsax-react';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { DesktopDateRangePicker } from '@mui/x-date-pickers-pro';
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFns';

// assets
import { SubmitButton } from 'components/atoms/button/button';
import CustomTextField, { CustomAutoComplete, FormikAutoComplete, NestedCustomTextField } from 'utils/textfield';
import {
  formAllValues,
  validationSchema,
  filterFormValues,
  // formValueFields,
  filterValueFields,
  filterValidationSchema,
  tableColumns,
  VisibleColumn
} from 'constant/investmentValidation';
import { GetProductData } from 'hooks/fixedDeposit/fixedDeposit';
import {
  GetInvestorData,
  GetOneInvestor,
  SaveInvestor,
  EditInvestor,
  DeleteOneInvestor,
  GetEditOneInvestor,
  GetIfa,
  GetIFASearch
} from 'hooks/investor/investor';
import '../../../utils/custom.css';
import { GetInvestmentData, GetStatusDropdown, GetMaturityAction, GetScheme, CalculateFD } from 'hooks/transaction/investment';
import { GetPayoutMethod, GetSchemeSearch } from 'hooks/interestRate/interestRate';
import InvestmentDialog from 'components/atoms/dialog/InvestmentDialog';
import AnimateButton from 'helpers/@extended/AnimateButton';

function Investment() {
  // Main data states
  const [investmentData, setInvestmentData] = useState([]);
  const [investorData, setInvestorData] = useState([]);
  const [ifaData, setIfaData] = useState([]);
  const [payoutData, setPayoutData] = useState([]);
  const [maturityAction, setMaturityAction] = useState([]);
  // Main Data state
  const [schemeData, setSchemeData] = useState([]);

  // const [loading, setLoading] = useState(true);

  // Edit Logic State
  const [isEditing, setIsEditing] = useState(false);
  const [isInvestmentActive, setInvestmentActive] = useState();
  const [schemeFormValues, setSchemeFormValues] = useState();

  // Dialog state
  const [openDialog, setOpenDialog] = useState(false);

  // Toggle Table and Form Visibility
  const [showTable, setShowTable] = useState(false); // State to toggle visibility of the table form

  // Selection states
  const [selectedIFA, setSelectedIFA] = useState(null);

  // Address Details Checkbox
  const [sameAddress, setSameAddress] = useState(false);

  // Form State
  const [formValues, setFormValues] = useState(formAllValues);
  // Theme
  const theme = useTheme();
  const mdUp = theme.breakpoints.up('md');

  // Sets form values for editing
  const setEditing = (value) => {
    console.log(value);
    setFormValues(value);
    handleIsInvestmentActive(value.investor.is_active);
  };
  const setActiveEditing = () => {
    setIsEditing(true);
  };
  const setActiveClose = () => {
    setIsEditing(false);
  };
  const handleIsInvestmentActive = (initialValue) => {
    setInvestmentActive(initialValue);
  };
  const schemeEditing = (value) => {
    setSchemeFormValues(value);
  };

  // Toggle Table and Form Visibility
  const changeTableVisibility = () => {
    setShowTable(!showTable);
  };

  // Selection states
  const [fdDropdown, setFdDropdown] = useState([]);
  const [statusDropdown, setStatusDropdown] = useState([]);
  const [dateValue, setDateValue] = useState([null, null]);
  // Dialog state
  const handleOpenDialog = () => {
    setOpenDialog(!openDialog);
  };

  // Search one item state
  const setSearchData = (investor) => {
    setInvestmentData(investor);
  };
  // Form State
  const handleCalculate = (value) => {
    console.log(value);
    setFormValues(value);
  };
  // Empty Form Fields
  const clearFormValues = () => {
    setFormValues(formAllValues);
  };
  const resetValuesIfNeeded = (values, setFormValues) => {
    setFormValues({
      ...values,
      interest_rate: '0',
      aggrigated_interest: 0,
      maturity_amount: 0
    });
  };
  const resetCalculation = (e, key, values, setFieldValue, setFormValues) => {
    if (values.aggrigated_interest !== 0 || values.maturity_amount !== 0) {
      const parsed = parseInt(e.target.value, 10);
      setFieldValue(key, parsed);
      setFormValues({
        ...values,
        [key]: parsed,
        interest_rate: '0',
        aggrigated_interest: 0,
        maturity_amount: 0
      });
    } else {
      const parsed = parseInt(e.target.value, 10);
      setFieldValue(key, parsed);
    }
  };
  const customInputChange = (e, values, options, optionName, formName, setFieldValue, idName) => {
    if (e.target.outerText === undefined) {
      setFieldValue(formName, 0);
      if (values.aggrigated_interest !== 0 || values.maturity_amount !== 0) {
        resetValuesIfNeeded(values, setFormValues);
      }
    } else {
      if (values.aggrigated_interest !== 0 || values.maturity_amount !== 0) {
        resetValuesIfNeeded(values, setFormValues);
      }
      options.forEach(async (el) => {
        if (el[optionName] === e.target.outerText) {
          if (idName) {
            await setFieldValue(formName, el[idName]);
          } else {
            await setFieldValue(formName, el.id);
          }
        }
      });
    }
  };

  // Custom fields/ Table Columns
  const columns = useMemo(() => tableColumns, []);

  // Duration Dropdown
  const days = Array(32)
    .fill()
    .map((_, index) => ({ id: index, value: index.toString() }));
  const month = Array(13)
    .fill()
    .map((_, index) => ({ id: index, value: index.toString() }));
  const year = Array(6)
    .fill()
    .map((_, index) => ({ id: index, value: index.toString() }));
  // Query for fetching investor data
  const {
    isPending: investorPending,
    // error,
    refetch: InvestorTableDataRefetch
  } = useQuery({
    queryKey: ['investorTableData'],
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    queryFn: GetInvestorData,
    onSuccess: (data) => {
      setInvestorData(data);
      // setLoading(false);
    }
  });
  // Query for fetching payout data
  const {
    isPending: payoutPending,
    error,
    refetch: refetchPayoutData
  } = useQuery({
    queryKey: ['payoutData', 0],
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    queryFn: () => GetPayoutMethod(0),
    onSuccess: (data) => {
      setPayoutData(data);
    }
  });
  // Query for fetching product data
  const {
    isPending: productPending,
    // error,
    refetch: ProductTableDataRefetch
  } = useQuery({
    queryKey: ['productTableData'], // Unique key for the query
    refetchOnWindowFocus: false, // Disable refetch on window focus
    keepPreviousData: true, // Keep previous data when refetching
    queryFn: GetProductData, // Function to fetch product data
    onSuccess: (data) => {
      setFdDropdown(data); // Update product data with fetched data
    }
  });
  // Query for fetching IFA data
  const {
    isPending: ifaPending,
    error: ifaError,
    refetch: IfaTableDataRefetch
  } = useQuery({
    queryKey: ['ifaTableData'],
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    queryFn: GetIfa,
    onSuccess: (data) => {
      setIfaData(data);
    }
  });
  // Query for fetching status dropdown
  const { pending: statusPending, refetch: StatusDropdownRefetch } = useQuery({
    queryKey: ['statusDropdownData'], // Unique key for the query
    refetchOnWindowFocus: false, // Disable refetch on window focus
    keepPreviousData: true, // Keep previous data when refetching
    queryFn: GetStatusDropdown, // Function to fetch product data
    onSuccess: (data) => {
      setStatusDropdown(data); // Update product data with fetched data
    }
  });
  // Query for fetching status dropdown
  const { pending: maturityPending, refetch: MaturityDropdownRefetch } = useQuery({
    queryKey: ['maturityDropdownData'], // Unique key for the query
    refetchOnWindowFocus: false, // Disable refetch on window focus
    keepPreviousData: true, // Keep previous data when refetching
    queryFn: GetMaturityAction, // Function to fetch product data
    onSuccess: (data) => {
      setMaturityAction(data); // Update product data with fetched data
    }
  });

  useEffect(() => {
    console.log(formValues);
  }, [formValues]);

  if (payoutPending || investorPending || ifaPending || statusPending || productPending || maturityPending) return <Loader />;

  return (
    <>
      <InvestmentDialog
        openDialog={openDialog}
        handleOpenDialog={handleOpenDialog}
        schemeEditFormValues={schemeFormValues}
        clearFormValues={clearFormValues}
        schemeData={schemeData}
        setSchemeData={setSchemeData}
      />
      {showTable && (
        <Formik
          enableReinitialize={true}
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            if (isEditing === false) {
              console.log(values);

              const reqValues = { ...values, compounding_type: 'yearly' };

              const result = await CalculateFD(reqValues);

              console.log(result.data);
              const calculated = result.data;

              // console.log({
              //   ...values,
              //   interest_rate: calculated.interestRate,
              //   aggrigated_interest: calculated.aggrigated_interest,
              //   maturity_amount: calculated.maturity_amount
              // });
              // resetForm();

              handleCalculate({
                ...values,
                interest_rate: calculated.interestRate,
                // interest_rate: 7.25,
                aggrigated_interest: calculated.aggrigated_interest,
                // aggrigated_interest: 289.92,
                maturity_amount: calculated.maturity_amount
                // maturity_amount: 2289.92
              });
              //   SaveInvestor(formValues, InvestmentTableDataRefetch, clearFormValues);
            }
            if (isEditing === true) {
              console.log('edit');
              //   EditInvestor(
              //     formValues,
              //     isFDActive,
              //     isInvestorActive,
              //     InvestmentTableDataRefetch,
              //     clearFormValues,
              //     setActiveClose
              //   );
            }
            // changeTableVisibility();
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, resetForm, isSubmitting }) => (
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
                  title="Investment Entry"
                  buttonTitle="View Scheme"
                  handleOpenDialog={handleOpenDialog}
                  changeTableVisibility={changeTableVisibility}
                  clearFormValues={clearFormValues}
                  isEditing={isEditing}
                  formValues={formValues}
                  setActiveClose={setActiveClose}
                  setIsActive={handleIsInvestmentActive}
                  isActive={isInvestmentActive}
                />

                <Divider />

                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={3}>
                      <FormikAutoComplete
                        options={investorData}
                        values={values}
                        defaultValue={values.investor_id}
                        setFieldValue={setFieldValue}
                        customInputChange={customInputChange}
                        formName="investor_id"
                        idName="investor_id"
                        optionName="investor_name"
                        label="Select Investor"
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <FormikAutoComplete
                        options={fdDropdown}
                        values={values}
                        defaultValue={values.fd_id}
                        setFieldValue={setFieldValue}
                        customInputChange={customInputChange}
                        // errors={errors}
                        formName="fd_id"
                        idName="fd_id"
                        optionName="fd_name"
                        label="Select FD"
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <FormikAutoComplete
                        options={ifaData}
                        defaultValue={values.ifa_id}
                        setFieldValue={setFieldValue}
                        formName="ifa_id"
                        optionName="item_value"
                        label="Select IFA"
                      />
                    </Grid>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={3}>
                      <CustomTextField
                        label="Investment Amount"
                        name="investment_amount"
                        placeholder="Please enter Investment Amount"
                        values={values}
                        type="number"
                        onChange={(e) => resetCalculation(e, 'investment_amount', values, setFieldValue, setFormValues)}
                        // onChange={handleChange}
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
                    <Grid item xs={1}>
                      <FormikAutoComplete
                        disableClearable
                        values={values}
                        options={year}
                        defaultValue={values.years}
                        setFieldValue={setFieldValue}
                        customInputChange={customInputChange}
                        formName="years"
                        optionName="value"
                        label="Years"
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <FormikAutoComplete
                        disableClearable
                        values={values}
                        options={month}
                        defaultValue={values.months}
                        setFieldValue={setFieldValue}
                        customInputChange={customInputChange}
                        formName="months"
                        optionName="value"
                        label="Months"
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <FormikAutoComplete
                        disableClearable
                        values={values}
                        options={days}
                        defaultValue={values.days}
                        setFieldValue={setFieldValue}
                        customInputChange={customInputChange}
                        formName="days"
                        optionName="value"
                        label="Days"
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <FormikAutoComplete
                        options={payoutData}
                        values={values}
                        defaultValue={values.payout_method_id}
                        setFieldValue={setFieldValue}
                        customInputChange={customInputChange}
                        formName="payout_method_id"
                        keyName="id"
                        optionName="item_value"
                        label="Select Payout Method"
                      />
                    </Grid>
                    <Grid item xs={1.5}>
                      <Button variant="contained" color="success" sx={{ borderRadius: 0.6 }} startIcon={<Calculator />} type="submit">
                        Calculate
                      </Button>
                    </Grid>
                    <Grid item xs={1.5} sx={{ paddingLeft: '0px !important' }}>
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ borderRadius: 0.6 }}
                        startIcon={<Eye />}
                        onClick={async () => {
                          const searchResult = await GetSchemeSearch(values.fd_id, values.payout_method_id);
                          if (searchResult) {
                            setSchemeData(searchResult);

                            setTimeout(() => {
                              handleOpenDialog();
                            }, 200);
                          }
                        }}
                      >
                        View Scheme
                      </Button>
                    </Grid>
                    <Grid item xs={3}>
                      <CustomTextField
                        label="Interest Rate"
                        name="interest_rate"
                        disabled
                        placeholder="Please enter Interest Rate"
                        values={values}
                        type="text"
                        regType="number"
                        setFieldValue={setFieldValue}
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
                    <Grid item xs={3}>
                      <CustomTextField
                        label="Interest Amount"
                        name="aggrigated_interest"
                        disabled
                        placeholder="Please enter Interest Amount"
                        values={values}
                        type="number"
                        // regType="number"
                        // setFieldValue={setFieldValue}
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
                    <Grid item xs={3}>
                      <CustomTextField
                        label="Maturity Amount"
                        name="maturity_amount"
                        disabled
                        placeholder="Please enter Maturity Amount"
                        values={values}
                        type="number"
                        // regType="number"
                        // setFieldValue={setFieldValue}
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
                    <Grid item xs={3}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="success"
                        sx={{ borderRadius: 0.6 }}
                        startIcon={<TimerStart />}
                        onClick={async () => {}}
                      >
                        Start Investment
                      </Button>
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
          title="Investment"
          changeTableVisibility={changeTableVisibility}
          showButton
          setActiveAdding={setActiveClose}
          border
          contentSX={{ p: 2 }}
          sx={{ height: '100%', boxShadow: 1 }}
        >
          <Formik
            initialValues={{
              fd_id: 0,
              status_id: 0
            }}
            validationSchema={yup.object({
              fd_id: yup.number(),
              status_id: yup.number()
            })}
            onSubmit={async (values, { resetForm }) => {
              console.log(values);
              const formValues = { ...values, from_date: dateValue[0], end_date: dateValue[1] };

              const investmentData = await GetInvestmentData(formValues);

              setInvestmentData(investmentData);
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
                    <Grid item xs={3} style={{ paddingLeft: 0, paddingTop: 0 }}>
                      <LocalizationProvider dateAdapter={AdapterDateFns} localeText={{ start: 'Date From', end: 'To' }}>
                        <DesktopDateRangePicker
                          className="calendar_main"
                          value={dateValue}
                          onChange={(newValue) => {
                            setDateValue(newValue);
                          }}
                          // slotProps={{ fieldSeparator: { children: 'TO' } }}
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item xs={3} style={{ paddingTop: 0 }}>
                      <FormikAutoComplete
                        options={fdDropdown}
                        defaultValue={values.fd_id}
                        setFieldValue={setFieldValue}
                        // errors={errors}
                        formName="fd_id"
                        idName="fd_id"
                        optionName="fd_name"
                        label="Select FD"
                      />
                      {/* {errors && <>`${JSON.stringify(errors)}`</>} */}
                    </Grid>

                    <Grid item xs={3} style={{ paddingTop: 0 }}>
                      <FormikAutoComplete
                        options={statusDropdown}
                        defaultValue={values.status_id}
                        setFieldValue={setFieldValue}
                        // errors={errors}
                        formName="status_id"
                        idName="status_id"
                        optionName="value"
                        label="Select Status"
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
                          width: !mdUp ? 'auto' : '100%' // Set width to 'auto' when screen size is medium or larger, otherwise '100%'
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

          {/* ------------- */}
          <MultiTable
            columns={columns}
            data={investmentData}
            // formValues={filterFormValues}
            // formValueFields={filterValueFields}
            // validationSchema={filterValidationSchema}
            changeTableVisibility={changeTableVisibility}
            setEditing={setEditing}
            getOneItem={() => {}}
            deleteOneItem={() => {}}
            getEditData={() => {}}
            setSearchData={setSearchData}
            // tableDataRefetch={InvestmentTableDataRefetch}
            tableDataRefetch={() => {}}
            setActiveEditing={setActiveEditing}
            VisibleColumn={VisibleColumn}
          />
        </MainCard>
      )}
    </>
  );
}

export default Investment;

// onChange={(e) => {
//   if (values.aggrigated_interest !== null) {
//     handleChange(e);

//     setFormValues({
//       ...values,
//       investment_amount: e.target.value,
//       interest_rate: '0',
//       aggrigated_interest: 0,
//       maturity_amount: 0
//     });
//   } else {
//     // handleChange('investment_amount')(event);
//     handleChange(e);
//   }
// }}
