import { useMemo, useState } from 'react';

// material-ui
import { Divider, Box, Card, Grid, CardContent, TableCell, Button, Stack, CardHeader, TextField } from '@mui/material';
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
import CustomTextField, { CustomAutoComplete, NestedCustomTextField } from 'utils/textfield';

// assets
import {
  formAllValues,
  validationSchema,
  filterFormValues,
  formValueFields,
  filterValidationSchema,
  tableColumns,
  VisibleColumn,
  genderData,
  residency,
  marital_status,
  occupation
} from 'constant/investorValidation';
import {
  GetInvestorData,
  GetOneInvestor,
  SaveInvestor,
  EditInvestor,
  DeleteOneInvestor,
  GetEditOneInvestor,
  GetIfa
} from 'hooks/investor/investor';
import AnimateButton from 'helpers/@extended/AnimateButton';
import IconTabs from 'components/organisms/iconTabs';

const headerSX = {
  p: 2.5,
  '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' }
};

function Investor() {
  // Main data
  const [investorData, setInvestorData] = useState([]);
  const [ifaData, setIfaData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedRelation, setSelectedRelation] = useState(null);
  const [selectedResidenceID, setSelectedResidenceID] = useState(null);
  const [selectedMarital, setSelectedMarital] = useState(null);
  const [selectedOccupation, setSelectedOccupation] = useState(null);
  const [selectedAnnualIncome, setSelectedAnnualIncome] = useState(null);
  const [selectedIncomeSource, setSelectedIncomeSource] = useState(null);
  const [selectedDeclaration, setSelectedDeclaration] = useState({
    isPoliticallyExposed: true,
    isRelativeToPoliticallyExposed: true,
    isResidentOutsideIndia: false
  });
  // Address Details
  const [sameAddress, setSameAddress] = useState(false);
  const handleCheckboxChange = (event) => {
    setSameAddress(event.target.checked);
  };
  // Nominee
  const [nomineeData, setNomineeData] = useState([]);
  const [errorObject, setErrorObject] = useState({
    personalInfoError: false,
    addressDetailsError: false,
    professionalDetailsError: false,
    nomineeError: false,
    declarationError: false
  });

  // Toggle Table and Form Visibility
  const [showTable, setShowTable] = useState(false);
  const changeTableVisibility = () => {
    setShowTable(!showTable);
  };

  const handleNewNominee = (value) => {
    setNomineeData((prev) => {
      return [...prev, value];
    });
  };
  const handleDeclarationClick = (value) => {
    if (value === 'PoliticallyExposed') {
      setSelectedDeclaration({ ...selectedDeclaration, isPoliticallyExposed: !selectedDeclaration.isPoliticallyExposed });
    } else if (value === 'RelativeToPoliticallyExposed') {
      setSelectedDeclaration({
        ...selectedDeclaration,
        isRelativeToPoliticallyExposed: !selectedDeclaration.isRelativeToPoliticallyExposed
      });
    } else if (value === 'ResidentOutsideIndia') {
      setSelectedDeclaration({ ...selectedDeclaration, isResidentOutsideIndia: !selectedDeclaration.isResidentOutsideIndia });
    }
  };
  const handleTabError = (value) => {
    console.log(value);
    if (value.investor_address) {
      setErrorObject({ ...errorObject, addressDetailsError: true });
    } else {
      setErrorObject({ ...errorObject, addressDetailsError: false });
    }
  };

  // Edit Logic State
  const [isEditing, setIsEditing] = useState(false);
  const [isInvestorActive, setInvestorActive] = useState();
  const setEditing = (value) => {
    console.log(value);

    setFormValues(value);
    setSelectedGender(value.investor.gender);
    setSelectedResidenceID(value.personal_info.is_indian_resident);
    setSelectedMarital(value.personal_info.is_married);
    setSelectedOccupation(value.professional_details.occupation_name);
    setSelectedAnnualIncome(value.professional_details.annual_income);
    setSelectedIncomeSource(value.professional_details.income_source);
    setSelectedDeclaration({
      isPoliticallyExposed: Boolean(value.declaration.is_pep),
      isRelativeToPoliticallyExposed: Boolean(value.declaration.is_rpep),
      isResidentOutsideIndia: Boolean(value.declaration.is_foreign_tax_resident)
    });
    setNomineeData(value.nominee);
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
  // Form State
  const [formValues, setFormValues] = useState(formAllValues);
  // Empty Form Fields
  const clearFormValues = () => {
    setFormValues(formAllValues);
    setSelectedGender();
    setSelectedResidenceID();
    setSelectedMarital();
    setSelectedOccupation();
    setSelectedAnnualIncome();
    setSelectedIncomeSource();
    setSelectedDeclaration({
      isPoliticallyExposed: false,
      isRelativeToPoliticallyExposed: false,
      isResidentOutsideIndia: false
    });
    setNomineeData([]);
  };
  // Custom fields/ Table Columns
  const theme = useTheme();
  const columns = useMemo(() => tableColumns, []);

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
      setLoading(false);
    }
  });
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
      console.log(data);
      setIfaData(data.data);
    }
  });

  if (loading) return <Loader />;

  return (
    <>
      {showTable && (
        <Formik
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            if (isEditing === false) {
              console.log(values);
              // SaveInvestor(values, InvestorTableDataRefetch, clearFormValues, checkedCumulative, checkedNonCumulative);
            }
            if (isEditing === true) {
              console.log('i am editing');

              console.log({ ...values, method_name: 'update' });
              // EditInvestor(
              //   values,
              //   // isFDActive,
              //   isInvestorActive,
              //   InvestorTableDataRefetch,
              //   clearFormValues,
              //   setActiveClose
              // );
            }
            setErrorObject(errorObject);
            changeTableVisibility();
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
                      <NestedCustomTextField
                        label="Investor Name"
                        valueName="investor.investor_name"
                        values={values.investor.investor_name}
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched}
                        errors={errors}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <NestedCustomTextField
                        label="Pan Number"
                        valueName="investor.pan_no"
                        values={values.investor.pan_no}
                        type="string"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched}
                        errors={errors}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <NestedCustomTextField
                        label="Mobile Number"
                        valueName="investor.mobile_no"
                        values={values.investor.mobile_no}
                        type="number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched}
                        errors={errors}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <NestedCustomTextField
                        label="Investor type"
                        valueName="investor.investor_type"
                        values={values.investor.investor_type}
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched}
                        errors={errors}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <CustomAutoComplete
                        options={genderData}
                        defaultValue={selectedGender}
                        setSelected={setSelectedGender}
                        optionName="gender"
                        label="Gender"
                      />
                    </Grid>
                  </Grid>
                </CardContent>

                <Grid item xs={12} lg={6}>
                  <IconTabs
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched}
                    errors={errors}
                    selectedResidenceID={selectedResidenceID}
                    setSelectedResidenceID={setSelectedResidenceID}
                    selectedRelation={selectedRelation}
                    setSelectedRelation={setSelectedRelation}
                    selectedMarital={selectedMarital}
                    setSelectedMarital={setSelectedMarital}
                    selectedOccupation={selectedOccupation}
                    setSelectedOccupation={setSelectedOccupation}
                    selectedAnnualIncome={selectedAnnualIncome}
                    setSelectedAnnualIncome={setSelectedAnnualIncome}
                    selectedIncomeSource={selectedIncomeSource}
                    setSelectedIncomeSource={setSelectedIncomeSource}
                    selectedDeclaration={selectedDeclaration}
                    handleDeclarationClick={handleDeclarationClick}
                    nomineeData={nomineeData}
                    handleNewNominee={handleNewNominee}
                    errorObject={errorObject}
                    handleTabError={handleTabError}
                    sameAddress={sameAddress}
                    handleCheckboxChange={handleCheckboxChange}
                    setFieldValue={setFieldValue}
                  />
                </Grid>
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
            initialValues={{
              fd_name: ''
            }}
            // validationSchema={formValueFields}
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
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={3} style={{ paddingLeft: 0, paddingTop: 0 }}>
                      <CustomTextField
                        label="FD Name"
                        name="fd_name"
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

                    <Grid item xs={3} style={{ paddingTop: 0 }}>
                      <CustomAutoComplete options={ifaData} handleChange={() => {}} optionName="item_value" label="IFA" />
                    </Grid>

                    <Grid item xs={2} style={{ paddingTop: 0 }}>
                      <Box>
                        <AnimateButton>
                          <Button fullWidth variant="contained" color="success" startIcon={<SearchNormal1 />} type="submit">
                            Show
                          </Button>
                        </AnimateButton>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
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
            getEditData={GetEditOneInvestor}
            setSearchData={setSearchData}
            tableDataRefetch={InvestorTableDataRefetch}
            setActiveEditing={setActiveEditing}
            VisibleColumn={VisibleColumn}
          />
        </MainCard>
      )}
    </>
  );
}

export default Investor;

{
  /* <Card
                  sx={{
                    position: 'relative',
                    border: '1px solid',
                    borderRadius: 1.5,
                    borderColor: theme.palette.divider,
                    overflow: 'visible'
                  }}
                > */
}
{
  /* <Stack direction="row" alignItems="center" justifyContent="space-between">
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
                  </Stack> */
}

{
  /* <Divider /> */
}

// const handleOnGenderChange = (event) => {
//   residency.map((el) => {
//     if (el.gender === event.target.outerText) {
//       setSelectedGender(el.id);
//     }
//   });
// };
// const handleOnResidenceChange = (event) => {
//   residency.map((el) => {
//     if (el.status === event.target.outerText) {
//       setSelectedResidenceID(el.id);
//     }
//   });
// };
// const handleOnMaritalChange = (event) => {
//   marital_status.map((el) => {
//     if (el.status === event.target.outerText) {
//       setSelectedMarital(el.id);
//     }
//   });
// };
// const handleOnOccupationChange = (event) => {
//   occupation.map((el) => {
//     if (el.occupation_name === event.target.outerText) {
//       setSelectedOccupation(el.occupation_id);
//     }
//   });
// };
