import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TableHead } from '@mui/material';
import EditEmployee from './editEmployee.jsx';
import { observer } from 'mobx-react';
import DeleteEmployee from './deleteEmployee.jsx';

const Row = observer((props) => {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [display, setDisplay] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const handleClickOpen = () => {
    setDisplay(true);
  };

  const handleclickClose = () => {
    setDisplay(false);
  };

  const handleAlertOpen = () => {
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
    handleClose(false); 
  };

  async function remove(rowId) {
    try {
      await EmployeeStore.removeData(rowId);
      handleClose(false); 
      console.log(`Data with ID ${rowId} removed successfully.`);
    } catch (error) {
      console.error("Error removing data:", error);
    }
  }

  return (
    <>
      {display && <EditEmployee handleClose={handleclickClose} open={display} emp={row} />}
      {alertOpen && <DeleteEmployee id={row.id} handleClose={handleAlertClose} open={alertOpen} />}
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        
        </TableCell>
        <TableCell>{row.firstName}</TableCell>
        <TableCell>{row.lastName}</TableCell>
        <TableCell>{row.idNumber}</TableCell>
        <TableCell>{row.gender}</TableCell>
        <TableCell>{new Date(row.dateSartingWork).toLocaleDateString()}</TableCell>
        <TableCell>{new Date(row.dateOfBirth).toLocaleDateString()}</TableCell>
        <TableCell>
          <IconButton aria-label="delete" onClick={handleAlertOpen}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton aria-label="edit" onClick={handleClickOpen}><EditIcon /></IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Rools
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>name</TableCell>
                    <TableCell>isAdministrative</TableCell>
                    <TableCell >startDate</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.roles.map((historyRow) => (
                    <TableRow key={historyRow.id}>
                      <TableCell >
                        {historyRow.name}
                      </TableCell>
                      <TableCell >{historyRow.isAdministrative ? 'true' : 'false'}</TableCell>
                      <TableCell>{new Date(historyRow.startDate).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
});

Row.propTypes = {
  row: PropTypes.object.isRequired,
};

export default Row;
