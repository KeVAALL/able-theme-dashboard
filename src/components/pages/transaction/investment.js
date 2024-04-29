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
  VisibleColumn,
  genderData,
  residency,
  marital_status,
  occupation
} from 'constant/investorValidation';
import { tableColumns } from 'constant/investmentValidation';
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

function Investment() {
  // Main data
  const [investorData, setInvestorData] = useState([]);
  const [ifaData, setIfaData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedResidenceID, setSelectedResidenceID] = useState(null);
  const [selectedMarital, setSelectedMarital] = useState(null);
  const [selectedOccupation, setSelectedOccupation] = useState(null);
  const [selectedIncomeSource, setSelectedIncomeSource] = useState(null);
  const [selectedAnnualIncome, setSelectedAnnualIncome] = useState(null);
  const handleOnGenderChange = (event) => {
    residency.map((el) => {
      if (el.gender === event.target.outerText) {
        setSelectedGender(el.id);
      }
    });
  };
  const handleOnResidenceChange = (event) => {
    residency.map((el) => {
      if (el.status === event.target.outerText) {
        setSelectedResidenceID(el.id);
      }
    });
  };
  const handleOnMaritalChange = (event) => {
    marital_status.map((el) => {
      if (el.status === event.target.outerText) {
        setSelectedMarital(el.id);
      }
    });
  };
  const handleOnOccupationChange = (event) => {
    occupation.map((el) => {
      if (el.occupation_name === event.target.outerText) {
        setSelectedOccupation(el.occupation_id);
      }
    });
  };

  // Toggle Table and Form Visibility
  const [showTable, setShowTable] = useState(false);
  const changeTableVisibility = () => {
    setShowTable(!showTable);
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
        ></Formik>
      )}
      {!showTable && (
        <MainCard
          title="Investment"
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
            {/* add filter */}
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
                  <Grid container spacing={2}>
                    {/* fd name */}
                    <Grid item xs={12} sm={6} md={4} lg={2.5}>
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

                    {/* Inverter name */}
                    {/* <Grid item xs={12} sm={6} md={4} lg={2.5}>
                      <CustomAutoComplete options={ifaData} handleChange={() => {}} optionName="item_value" label="Inverter name" />
                    </Grid> */}
                    <Grid item xs={12} sm={6} md={4} lg={2.5}>
                      <CustomTextField
                        label="Inverter name"
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
                    {/*IFA */}
                    <Grid item xs={12} sm={6} md={4} lg={2.5}>
                      <CustomAutoComplete options={ifaData} handleChange={() => {}} optionName="item_value" label="IFA" />
                    </Grid>
                    {/*FD Name */}

                    <Grid item xs={12} sm={6} md={4} lg={2.5}>
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
                    {/* show button */}
                    <Grid item xs={12} sm={6} md={4} lg={2}>
                      <Box>
                        <AnimateButton>
                          <Button variant="contained" color="success" startIcon={<SearchNormal1 />} type="submit">
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

          {/* --------multi table----- */}
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

export default Investment;
