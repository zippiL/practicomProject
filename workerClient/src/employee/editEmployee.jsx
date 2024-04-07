import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, FormControl, FormLabel, Input, Button, Typography, Checkbox, Select, MenuItem, TextField } from '@mui/material';
import EmployeeStore from '../store/employeeStore.js';
import { useForm, useFieldArray } from "react-hook-form";
import { Card, Divider, CardContent, CardActions, IconButton } from '@mui/joy';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import TagRoleStore from '../store/tagRoleStore.js';

function EditEmployee(props) {
    const { open, handleClose, emp } = props;
    const { register, handleSubmit, control, setValue, reset, formState: { errors } } = useForm();

    useEffect(() => {
        setValue('firstName', emp?.firstName || '');
        setValue('lastName', emp?.lastName || '');
        setValue('idNumber', emp?.idNumber || '');
        setValue('dateOfBirth', emp?.dateOfBirth || '');
        setValue('dateStartingWork', emp?.dateSartingWork || '');
        setValue('roles', emp?.roles || []);

    }, [emp, setValue]);


    const { fields, append, remove } = useFieldArray({
        control,
        name: "roles"
    });

    const onSubmit = async (data) => {
        console.log("data", data);
        console.log("emp", emp);
        try {
            if (!emp) {
                console.log("add data");
                const status = await EmployeeStore.addData(data);
                handleClose();
            } else {
                console.log("chang data");
                data.id = emp.id;
                console.log(data)
                const status = await EmployeeStore.changeData(data);
                handleClose();
            }
        } catch (error) {
            console.log("edit employee error: ", error.message);
        }
    };
    function isIsraeliIdNumber(id) {
        id = String(id).trim();
        if (id.length !== 9 || isNaN(id)) return false;
        id = id.length < 9 ? ("00000000" + id).slice(-9) : id;
        return Array.from(id, Number).reduce((counter, digit, i) => {
            const step = digit * ((i % 2) + 1);
            return counter + (step > 9 ? step - 9 : step);
        }) % 10 === 0;
    }
    const rolesData = TagRoleStore.data_rol;
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card variant="outlined">
                        {emp ? <Typography variant="h5">Edit User</Typography> : <Typography variant="h5">Add User</Typography>}
                        <Divider />
                        <CardContent>
                            <FormControl>
                                <FormLabel>First Name</FormLabel>
                                <TextField {...register("firstName")} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Last Name</FormLabel>
                                <TextField {...register("lastName")} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>ID Number</FormLabel>
                                <TextField
                                    {...register("idNumber", {
                                        required: true,
                                        validate: (value) =>
                                            isIsraeliIdNumber(value) || "ID Number is not valid"
                                    })}
                                    error={!!errors.idNumber}
                                    helperText={errors.idNumber && errors.idNumber.message}
                                />                            </FormControl>
                            <FormControl>
                                <FormLabel>Date Of Birth</FormLabel>
                                <TextField
                                    type="datetime-local"
                                    {...register("dateOfBirth")}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Date Starting Work</FormLabel>
                                <TextField
                                    type="datetime-local"
                                    {...register("dateSartingWork")}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Gender</FormLabel>
                                <Select {...register("gender", { valueAsNumber: true })}>
                                    <MenuItem value={0}>Male</MenuItem>
                                    <MenuItem value={1}>Female</MenuItem>
                                </Select>
                            </FormControl>

                            <Typography variant="h6">Roles</Typography>
                            {fields.map((field, index) => (
                                <div key={field.id}>
                                    <FormControl>
                                        <FormLabel>Role</FormLabel>
                                        <Select {...register("roles.0.tagRoleId", {
                                            valueAsNumber: true,
                                            validate: (value) =>
                                                fields.findIndex((f, i) => f.tagRoleId === value) === -1 ||
                                                "Role already selected"
                                        })}>
                                            {rolesData.map(role => (
                                                <MenuItem key={role.id} value={role.id}>{role.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Is Administrative</FormLabel>
                                        <Checkbox
                                            defaultChecked={field?.isAdministrative}
                                            {...register(`roles.${index}.isAdministrative`)}
                                        />                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Start Date</FormLabel>
                                        <Input
                                            type="datetime-local"
                                            {...register(`roles.${index}.startDate`)}
                                        />
                                    </FormControl>
                                    <IconButton aria-label="delete" onClick={() => remove(index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            ))}
                            <IconButton aria-label="add" onClick={() => append({ name: '', isAdministrative: false, startDate: '' })}>
                                <AddCircleOutlineIcon />
                            </IconButton>
                            <CardActions>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                >
                                    Submit
                                </Button>
                            </CardActions>
                        </CardContent>
                    </Card>
                </form>
            </DialogContent>
        </Dialog>
    );
}

EditEmployee.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    emp: PropTypes.object.isRequired,
};

export default EditEmployee;
