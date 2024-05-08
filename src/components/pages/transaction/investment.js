import { useEffect, useMemo, useState } from 'react';

// material-ui
import { Divider, Box, Card, Grid, CardContent, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FilterSearch } from 'iconsax-react';
import { useQuery } from 'react-query';

// project-imports
import MainCard from '../../organisms/mainCard/MainCard';
import MultiTable from '../multiTable/multiTable';

// third-party
import * as yup from 'yup';
import { Formik } from 'formik';
import Loader from 'components/atoms/loader/Loader';
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
import { GetInvestmentData, GetStatusDropdown } from 'hooks/transaction/investment';

function Investment() {
  // Main data states
  const [investmentData, setInvestmentData] = useState([]);
  const [ifaData, setIfaData] = useState([]);
  // const [loading, setLoading] = useState(true);

  // Edit Logic State
  const [isEditing, setIsEditing] = useState(false);
  const [isInvestmentActive, setInvestmentActive] = useState();

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

  // Toggle Table and Form Visibility
  const changeTableVisibility = () => {
    setShowTable(!showTable);
  };

  // Selection states
  const [fdDropdown, setFdDropdown] = useState([]);
  const [statusDropdown, setStatusDropdown] = useState([]);
  const [dateValue, setDateValue] = useState([null, null]);
  console.log(dateValue);

  // Search one item state
  const setSearchData = (investor) => {
    setInvestmentData(investor);
  };

  // Empty Form Fields
  const clearFormValues = () => {
    setFormValues(formAllValues);
  };

  // Custom fields/ Table Columns
  const columns = useMemo(() => tableColumns, []);

  // // Query for fetching investment data
  // const {
  //   isPending,
  //   error,
  //   refetch: InvestmentTableDataRefetch
  // } = useQuery({
  //   queryKey: ['investmentTableData'],
  //   refetchOnWindowFocus: false,
  //   keepPreviousData: true,
  //   queryFn: GetInvestmentData,
  //   onSuccess: (data) => {
  //     setInvestmentData(data);
  //   }
  // });

  // Query for fetching product data
  const {
    isPending,
    // error,
    refetch: ProductTableDataRefetch
  } = useQuery({
    queryKey: ['productTableData'], // Unique key for the query
    refetchOnWindowFocus: false, // Disable refetch on window focus
    keepPreviousData: true, // Keep previous data when refetching
    queryFn: GetProductData, // Function to fetch product data
    onSuccess: (data) => {
      // Callback function on successful query
      setFdDropdown(data); // Update product data with fetched data
    }
  });

  // Query for fetching status dropdown
  const { refetch: StatusDropdownRefetch } = useQuery({
    queryKey: ['statusDropdownData'], // Unique key for the query
    refetchOnWindowFocus: false, // Disable refetch on window focus
    keepPreviousData: true, // Keep previous data when refetching
    queryFn: GetStatusDropdown, // Function to fetch product data
    onSuccess: (data) => {
      // Callback function on successful query
      setStatusDropdown(data); // Update product data with fetched data
    }
  });

  if (isPending) return <Loader />;

  return (
    <>
      {showTable && (
        <Formik
          validateOnBlur={false}
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            if (isEditing === false) {
              //   SaveInvestor(formValues, InvestmentTableDataRefetch, clearFormValues);
            }
            if (isEditing === true) {
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
                  changeTableVisibility={changeTableVisibility}
                  clearFormValues={clearFormValues}
                  isEditing={isEditing}
                  formValues={formValues}
                  setActiveClose={setActiveClose}
                  setIsActive={handleIsInvestmentActive}
                  isActive={isInvestmentActive}
                  errors={errors}
                  handleTabError={handleTabError}
                />

                <Divider />

                <CardContent>
                  <Grid container spacing={3}>
                    {/* FORM */}
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
              console.log({ ...values, from_date: dateValue[0], end_date: dateValue[1] });

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
                      <LocalizationProvider dateAdapter={AdapterDateFns} localeText={{ start: 'From', end: 'To' }}>
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
