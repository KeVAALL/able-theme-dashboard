/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Dialog, Box, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { PopupTransition } from 'helpers/@extended/Transitions';

export function DialogBox({ openDialog, handleOpenDialog, dataRefetch, item, deleteOneItem }) {
  console.log(item.product_type_id);
  return (
    <Dialog
      open={openDialog}
      TransitionComponent={PopupTransition}
      keepMounted
      onClose={handleOpenDialog}
      aria-describedby="alert-dialog-slide-description"
    >
      <Box sx={{ p: 1, py: 1.5 }}>
        {/* <DialogTitle>Use Google&apos;ss location service?</DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">Do you want to delete this item?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleOpenDialog}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              deleteOneItem(item);
              handleOpenDialog();
              setTimeout(() => {
                dataRefetch();
              }, 200);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
