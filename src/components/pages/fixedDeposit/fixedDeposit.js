import { useMemo, useState } from 'react';

// material-ui
import { Divider, Box, Card, Grid, CardContent, TableCell } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project-imports
import MainCard from '../../organisms/mainCard/MainCard';
import MultiTable from '../multiTable/multiTable';

// third-party
import { Formik } from 'formik';
import * as yup from 'yup';
import { useQuery } from 'react-query';
import Loader from 'components/atoms/loader/Loader';
import { SubmitButton } from 'components/atoms/button/button';
import CustomTextField, { CustomAutoComplete, CustomCheckbox } from 'utils/textfield';

// assets
import {
  formAllValues,
  validationSchema,
  filterFormValues,
  formValueFields,
  filterValidationSchema,
  tableColumns,
  VisibleColumn
} from 'constant/fixDepositValidation';
import { GetProductData, GetOneProduct, SaveProduct, EditProduct, DeleteOneProduct } from 'hooks/fixedDeposit/fixedDeposit';
import { GetActiveIssuerData } from 'hooks/issuer/issuer';
import InterestRate from '../../organisms/fixedDeposit/interestRate';

function FixDeposit() {
  // Main data
  const [productData, setProductData] = useState([]);

  // Toggle Table and Form Visibility
  const [showTable, setShowTable] = useState(false);
  const changeTableVisibility = () => {
    setShowTable(!showTable);
  };

  // Edit Logic State
  const [isEditing, setIsEditing] = useState(false);
  const [editingInterestRate, setEditingInterestRate] = useState(false);
  const [activeIssuers, setActiveIssuers] = useState([]);
  const [selectedIssuerID, setSelectedIssuerID] = useState(null);
  const [isFDActive, setFDActive] = useState();
  const setEditing = (value) => {
    console.log(value);
    setFormValues(value);
    setCheckedCumulative(Boolean(value.is_cumulative));
    setCheckedNonCumulative(Boolean(value.is_non_cumulative));
    setSelectedIssuerID(value.issuer_name);
  };
  const setActiveEditing = () => {
    setIsEditing(true);
  };
  const setActiveClose = () => {
    setIsEditing(false);
  };
  const handleIsFDActive = (initialValue) => {
    setFDActive(initialValue);
  };
  const isEditingInterestRate = () => {
    setEditingInterestRate(true);
  };
  const isNotEditingInterestRate = () => {
    setEditingInterestRate(false);
  };

  // Select field state
  const [checkedCumulative, setCheckedCumulative] = useState(false);
  const [checkedNonCumulative, setCheckedNonCumulative] = useState(false);
  // Toggle checked state between 0 and 1 when clicked
  const handleCumulativeChange = () => {
    setCheckedCumulative((prevChecked) => (!prevChecked ? 1 : 0)); // Toggle between 0 and 1
  };
  const handleNonCumulativeChange = () => {
    setCheckedNonCumulative((prevChecked) => (!prevChecked ? 1 : 0));
  };

  // Search one item state
  const setSearchData = (fixedDeposit) => {
    setProductData(fixedDeposit);
  };
  // Form State
  const [formValues, setFormValues] = useState(formAllValues);
  // Empty Form Fields
  const clearFormValues = () => {
    setFormValues(formAllValues);
    setCheckedCumulative(false);
    setCheckedNonCumulative(false);
  };
  // Custom Fields/ Table Columns
  const theme = useTheme();
  const columns = useMemo(() => tableColumns, []);

  const {
    isPending: isActiveIssuerPending,
    error: activeIssuerError,
    refetch
  } = useQuery({
    queryKey: ['activeIssuerData'],
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    queryFn: GetActiveIssuerData,
    onSuccess: (data) => {
      console.log(data);
      setActiveIssuers(data);
    }
  });
  const {
    isPending,
    error,
    refetch: ProductTableDataRefetch
  } = useQuery({
    queryKey: ['productTableData'],
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    queryFn: GetProductData,
    onSuccess: (data) => {
      setProductData(data);
    }
  });

  if (isPending) return <Loader />;

  if (editingInterestRate)
    return (
      <InterestRate
        formValues={formValues}
        changeTableVisibility={changeTableVisibility}
        isNotEditingInterestRate={isNotEditingInterestRate}
        isEditingInterestRate={editingInterestRate}
      />
    );

  return (
    <>
      {showTable && (
        <Formik
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            if (isEditing === false) {
              SaveProduct(values, ProductTableDataRefetch, clearFormValues, checkedCumulative, checkedNonCumulative, selectedIssuerID);
            }
            if (isEditing === true) {
              console.log('i am editing');
              console.log({ ...values, method_name: 'update' });
              EditProduct(
                values,
                isFDActive,
                ProductTableDataRefetch,
                clearFormValues,
                checkedCumulative,
                checkedNonCumulative,
                selectedIssuerID,
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
                  title="FD Entry"
                  changeTableVisibility={changeTableVisibility}
                  clearFormValues={clearFormValues}
                  isEditing={isEditing}
                  formValues={formValues}
                  setActiveClose={setActiveClose}
                  setIsActive={handleIsFDActive}
                  isActive={isFDActive}
                />

                <Divider />

                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={4}>
                      <CustomTextField
                        label="FD Name"
                        name="fd_name"
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
                        label="Min Amount (₹)"
                        name="fd_min_amount"
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
                        label="Max Amount (₹)"
                        name="fd_max_amount"
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
                        label="Minimum Tenure (Days)"
                        name="min_tenure"
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
                        label="Max Tenure (Days)"
                        name="max_tenure"
                        values={values}
                        type="number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched}
                        errors={errors}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <CustomCheckbox
                        checked={checkedCumulative}
                        handleChange={handleCumulativeChange}
                        name="checkedCumulative"
                        label="Cumulative"
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <CustomCheckbox
                        checked={checkedNonCumulative}
                        handleChange={handleNonCumulativeChange}
                        name="checkedNonCumulative"
                        label="Non Cumulative"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <CustomTextField
                        label="Logo URL"
                        name="logo_url"
                        values={values}
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched}
                        errors={errors}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <CustomAutoComplete
                        options={activeIssuers}
                        defaultValue={selectedIssuerID}
                        setSelected={setSelectedIssuerID}
                        optionName="issuer_name"
                        label="Issuers"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          )}
        </Formik>
      )}
      {/* {editingInterestRate && <InterestRate />} */}
      {!showTable && (
        <MainCard
          title="Fixed Deposit"
          changeTableVisibility={changeTableVisibility}
          showButton
          setActiveAdding={setActiveClose}
          border
          sx={{ height: '100%', boxShadow: 1 }}
        >
          <MultiTable
            columns={columns}
            data={productData}
            formValues={filterFormValues}
            formValueFields={formValueFields}
            validationSchema={filterValidationSchema}
            changeTableVisibility={changeTableVisibility}
            setEditing={setEditing}
            getOneItem={GetOneProduct}
            deleteOneItem={DeleteOneProduct}
            setSearchData={setSearchData}
            tableDataRefetch={ProductTableDataRefetch}
            setActiveEditing={setActiveEditing}
            isEditingInterestRateButton={true}
            isEditingInterestRate={isEditingInterestRate}
            VisibleColumn={VisibleColumn}
          />
        </MainCard>
      )}
    </>
  );
}

export default FixDeposit;
