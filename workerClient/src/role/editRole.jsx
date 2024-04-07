import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import { TextField, FormLabel, FormControl } from '@mui/material/';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm, useFieldArray } from "react-hook-form";
import tagRoleStore from '../store/tagRoleStore.js';

 function EditRole(props) {
  const { open, handleClose, row } = props;
  const { register, handleSubmit, control, setValue, reset } = useForm();
  useEffect(() => {
    setValue('name', row?.name || '');
  }, [row, setValue]);
  const onSubmit = async (data) => {
    console.log("data", data);
    console.log("emp", row);
    try {
      if (!row) {
        console.log("add data");
        const status = await tagRoleStore.addData(data);
        handleClose();
      } else {
        console.log("chang data");
        data.id = row.id;
        console.log(data)
        const status = await tagRoleStore.changeData(data);
        handleClose();
      }
    } catch (error) {
      console.log("edit employee error: ", error.message);
    }
  };
  return (
    <React.Fragment>
      {console.log(row)}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              console.log(email);
              handleClose();
            },
          }}
        >
          {row ? <DialogTitle variant="h5">Edit Role</DialogTitle> : <DialogTitle variant="h5">Add Role</DialogTitle>}
          <DialogContent>

            <FormControl>
              <FormLabel>role</FormLabel>
              <TextField {...register("name")} />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            > 
               Submit
                                </Button>         </DialogActions>
        </Dialog>
      </form>
    </React.Fragment>
  );
}
export default  EditRole;
