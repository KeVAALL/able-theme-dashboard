import { useMemo, useState } from 'react';

// material-ui
import { Divider, Box, Card, Grid, CardContent, TableCell } from '@mui/material';
import { useTheme } from '@mui/material/styles';
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
import { GetProductData, GetOneProduct, SaveProduct, EditProduct, DeleteOneProduct } from 'hooks/fixedDeposit/fixedDeposit';
import { GetActiveIssuerData } from 'hooks/issuer/issuer';

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
  const [activeIssuers, setActiveIssuers] = useState([]);
  const [selectedIssuerID, setSelectedIssuerID] = useState(null);
  const [isFDActive, setFDActive] = useState();
  const setEditing = (value) => {
    console.log(value.is_cumulative, value.is_non_cumulative);
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
  // Autocomplete field state
  const handleOnIssuerChange = (event) => {
    activeIssuers.map((el) => {
      if (el.issuer_name === event.target.outerText) {
        console.log(el.issuer_id);
        setSelectedIssuerID(el.issuer_id);
      }
    });
  };
  // Search one item state
  const setSearchData = (fixedDeposit) => {
    setProductData(fixedDeposit);
  };
  // Search one item form fields
  const filterFormValues = {
    fd_name: ''
  };
  const formValueFields = [
    {
      fieldName: 'fd_name',
      label: 'FD Name',
      type: 'text'
    }
  ];
  const filterValidationSchema = yup.object({
    fd_name: yup.string().required('FD Name is required')
  });

  // Add form values
  const formAllValues = {
    fd_name: '',
    fd_max_amount: '',
    fd_min_amount: '',
    min_tenure: '',
    max_tenure: '',
    logo_url: ''
  };
  const [formValues, setFormValues] = useState(formAllValues);
  const validationSchema = yup.object({
    fd_name: yup.string().required('FD Name is required'),
    fd_max_amount: yup.number().required('Mini Amount is required'),
    fd_min_amount: yup.number().required('Max Amount is required'),
    min_tenure: yup.number().required('Minimum Tenure is required'),
    max_tenure: yup.number().required('Max Tenure is required'),
    logo_url: yup.string().required('Logo URL is required')
  });
  const clearFormValues = () => {
    setFormValues(formAllValues);
    setCheckedCumulative(false);
    setCheckedNonCumulative(false);
  };
  // Custom fields/ columns
  const theme = useTheme();
  const ImageCell = ({ value }) => {
    return (
      <TableCell style={{ paddingLeft: '0px' }}>
        <img src={value} alt="Custom" style={{ width: '90%', height: 60 }} />
      </TableCell>
    );
  };
  const StatusCell = ({ value }) => {
    return value === 0 ? 'Not Active' : 'Active';
  };
  const columns = useMemo(
    () => [
      {
        Header: 'Logo URL',
        accessor: 'logo_url',
        customCell: ImageCell
      },
      {
        Header: 'FD Name',
        accessor: 'fd_name'
      },
      {
        Header: 'Issuer Name',
        accessor: 'issuer_name'
      },
      {
        Header: 'Min Tenure',
        accessor: 'min_tenure'
      },
      {
        Header: 'Max Tenure',
        accessor: 'max_tenure'
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
                        label="Max Amount"
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
                        label="Min Amount"
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
                        label="Minimum Tenure"
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
                        label="Max Tenure"
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
                        value={selectedIssuerID}
                        handleChange={handleOnIssuerChange}
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
      {!showTable && (
        <MainCard
          title="Product"
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
          />
        </MainCard>
      )}
    </>
  );
}

export default FixDeposit;
