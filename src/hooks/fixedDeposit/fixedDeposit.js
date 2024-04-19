// third-party
import axios from 'utils/axios';
import { enqueueSnackbar } from 'notistack';

// assets
import { dispatch } from '../../redux';
import { openSnackbar } from 'redux/reducers/snackbar';

const toInteger = (boolValue) => {
  return boolValue ? 1 : 0;
};

export async function GetProductData() {
  try {
    const response = await axios.post('product/getproduct', {
      method_name: 'getall'
    });
    console.log(response);
    return response.data.data;
  } catch (err) {
    return err;
  }
}
export async function GetOneProduct(values, setSearchData) {
  try {
    const response = await axios.post('product/getproduct', {
      method_name: 'getone',
      ...values
    });
    setSearchData(response.data.data);
  } catch (error) {
    dispatch(
      openSnackbar({
        open: true,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        message: error.message,
        variant: 'alert',
        alert: {
          color: 'error'
        }
      })
    );
  }
}
export async function SaveProduct(values, ProductTableDataRefetch, clearFormValues, checkedCumulative, checkedNonCumulative) {
  try {
    console.log({
      ...values,
      is_cumulative: toInteger(!checkedCumulative ? false : checkedCumulative),
      is_non_cumulative: toInteger(!checkedNonCumulative ? false : checkedNonCumulative),
      method_name: 'add'
    });
    await axios.post('/product/saveproduct', {
      ...values,
      is_cumulative: toInteger(!checkedCumulative ? false : checkedCumulative),
      is_non_cumulative: toInteger(!checkedNonCumulative ? false : checkedNonCumulative),
      method_name: 'add'
    });
    clearFormValues();
    enqueueSnackbar('Product added', {
      variant: 'success',
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      }
    });
    ProductTableDataRefetch();
  } catch (err) {
    enqueueSnackbar(err.message, {
      variant: 'success',
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      }
    });
  }
}
export async function EditProduct(values, issuerTableDataRefetch, clearFormValues, setIsEditing) {
  try {
    const response = await axios.post('/issuer/saveissuer', { ...values, method_name: 'update', user_id: 2 });
    if (response.status === 409) {
      throw response;
    }
    clearFormValues();
    setIsEditing(false);
    enqueueSnackbar('Issuer Updated', {
      variant: 'success',
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      }
    });
    issuerTableDataRefetch();
  } catch (err) {
    enqueueSnackbar(err.message, {
      variant: 'error',
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      }
    });
  }
}
export async function DeleteOneProduct(values) {
  try {
    console.log(values.osb_issuer_id);
    await axios.post('/product/saveproduct', {
      osb_issuer_id: values.osb_issuer_id,
      method_name: 'delete'
    });
    enqueueSnackbar('Product Deleted', {
      variant: 'error',
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      }
    });
  } catch (err) {
    console.log(err);
  }
}
