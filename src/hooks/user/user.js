// third-party
import axios from 'utils/axios';
import { enqueueSnackbar } from 'notistack';
import { toInteger } from 'lodash';

export async function GetMenu() {
  try {
    const response = await axios.post('menu/getmenu', {
      method_name: 'getmenu'
    });
    return response.data.data;
  } catch (err) {
    enqueueSnackbar(err.message, {
      variant: 'error',
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      }
    });
    return [];
  }
}
export async function GetSelectedMenu(setEditing, role_id) {
  try {
    const response = await axios.post('role/rolemenu', {
      method_name: 'getrolemenu',
      role_id: role_id
    });
    setEditing(response.data.data);
    return response.data.data;
  } catch (err) {
    enqueueSnackbar(err.message, {
      variant: 'error',
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      }
    });
    return [];
  }
}
export async function GetRoles() {
  try {
    const response = await axios.post('role/rolemenu', {
      method_name: 'getall'
    });
    return response.data.data;
  } catch (err) {
    enqueueSnackbar(err.message, {
      variant: 'error',
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      }
    });
    return [];
  }
}
export async function SaveRole(values) {
  try {
    const response = await axios.post('role/rolemenu', values);
    enqueueSnackbar('Role Added', {
      variant: 'success',
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      }
    });
    return response.data.data;
  } catch (err) {
    enqueueSnackbar(err.message, {
      variant: 'error',
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      }
    });
    return [];
  }
}
export async function EditRole(values) {
  try {
    const response = await axios.post('role/rolemenu', values);
    enqueueSnackbar('Role Updated', {
      variant: 'success',
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      }
    });
    return response.data.data;
  } catch (err) {
    enqueueSnackbar(err.message, {
      variant: 'error',
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      }
    });
    return [];
  }
}
export async function DeleteRole(values) {
  const userID = localStorage.getItem('userID');

  try {
    await axios.post('role/rolemenu', {
      role_id: values?.role_id,
      user_id: toInteger(userID),
      method_name: 'delete'
    });
    enqueueSnackbar('Role Deleted', {
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
// User
export async function GetUsers() {
  try {
    const response = await axios.post('user/getuser', {
      method_name: 'getall'
    });
    return response.data.data;
  } catch (err) {
    enqueueSnackbar(err.message, {
      variant: 'error',
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      }
    });
    return [];
  }
}
export async function SaveUser(values) {
  try {
    const response = await axios.post('user/saveuser', values);
    enqueueSnackbar('User Added', {
      variant: 'success',
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      }
    });
    return response.data.data;
  } catch (err) {
    enqueueSnackbar(err.message, {
      variant: 'error',
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      }
    });
    return [];
  }
}
export async function EditUser(values) {
  try {
    const response = await axios.post('user/saveuser', values);
    enqueueSnackbar('User Updated', {
      variant: 'success',
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      }
    });
    return response.data.data;
  } catch (err) {
    enqueueSnackbar(err.message, {
      variant: 'error',
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      }
    });
    return [];
  }
}
export async function DeleteUser(values) {
  const userID = localStorage.getItem('userID');

  try {
    await axios.post('user/saveuser', {
      user_id: values?.user_id,
      admin_user_id: toInteger(userID),
      method_name: 'delete'
    });
    enqueueSnackbar('User Deleted', {
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
