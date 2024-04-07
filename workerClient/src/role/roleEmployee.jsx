// SeeMeetings.jsx
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, IconButton, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Edit as EditIcon } from '@mui/icons-material';
import tagRoleStore from '../store/tagRoleStore';
import EditRole from './editRole.jsx';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const RoleEmployee = observer(() => {
    const columns = [
        { field: 'name', headerName: 'Name', width: 150 },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => (
                <IconButton
                    aria-label="edit"
                    onClick={() => handleEdit(params.row)}
                >
                    <EditIcon />
                </IconButton>
            ),
        },
    ];

    const rows = tagRoleStore.data_rol;

    const getRowId = (row) => row.id;

    const [displayEdit, setDisplayEdit] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const handleEdit = (row) => {
        setSelectedEmployee(row);
        setDisplayEdit(true);
    };

    const handleCloseEdit = () => {
        setDisplayEdit(false);
    };

    return (
        <>
            <Button onClick={() => handleEdit()} startIcon={<AddCircleOutlineIcon />}>Add Role</Button>
            <Box sx={{ height: 400, width: '100%' }}>
                <EditRole
                    handleClose={handleCloseEdit}
                    open={displayEdit}
                    row={selectedEmployee}
                />
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    disableSelectionOnClick
                    getRowId={getRowId}
                />
            </Box>
        </>
    );
});

export default RoleEmployee;
