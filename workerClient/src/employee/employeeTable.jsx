import React, { useState, useEffect } from 'react'
import MUIDataTable from 'mui-datatables'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  Typography,
  Box,
  IconButton,
  Button,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import ClearIcon from '@mui/icons-material/Clear'
import CheckIcon from '@mui/icons-material/Check'
import EditEmployee from './editEmployee.jsx'
import DeleteEmployee from './deleteEmployee.jsx'
import tagRoleApi from '../API/tagRoleApi.js'
import employeeStore from '../store/employeeStore.js'
import { observer } from 'mobx-react'

const EmployeeTable = observer(({ rows }) => {
  const [displayEdit, setDisplayEdit] = useState(false)
  const [displayDelete, setDisplayDelete] = useState(false)
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [rolesData, setRolesData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await tagRoleApi.get()
        setRolesData(response.data)
      } catch (error) {
        console.error('Error fetching roles data:', error)
      }
    }
    fetchData()
  }, [])

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee)
    employeeStore.current_emp = employee
    setDisplayEdit(true)
  }

  const handleDeleteClick = (employeeId) => {
    setSelectedEmployeeId(employeeId)
    setDisplayDelete(true)
  }

  const handleCloseEdit = () => {
    setDisplayEdit(false)
  }

  const handleCloseDelete = () => {
    setDisplayDelete(false)
  }

  const data = rows.map((row) => [
    row.firstName,
    row.lastName,
    row.idNumber,
    row.gender === 0 ? 'Male' : 'Female',
    new Date(row.dateSartingWork).toLocaleDateString(),
    new Date(row.dateOfBirth).toLocaleDateString(),
    row.roles || [],
  ])

  const columns = [
    { name: 'firstName', label: 'First Name' },
    { name: 'lastName', label: 'Last Name' },
    { name: 'idNumber', label: 'ID Number' },
    {
      name: 'gender',
      label: 'Gender',
      options: {
        customBodyRenderLite: (index) => <span>{data[index][3]}</span>,
      },
    },
    { name: 'dateStartingWork', label: 'Starting Work Date' },
    { name: 'dateOfBirth', label: 'Date of Birth' },
    { name: 'roles', label: 'Roles', options: { display: 'excluded' } },
    {
      label: 'edit',
      options: {
        customBodyRenderLite: (index) => (
          <IconButton onClick={() => handleEditClick(rows[index])}>
            <EditIcon />
          </IconButton>
        ),
      },
    },
    {
      name: 'delete',
      options: {
        customBodyRenderLite: (index) => (
          <IconButton onClick={() => handleDeleteClick(rows[index].id)}>
            <DeleteIcon />
          </IconButton>
        ),
      },
    },
  ]

  const options = {
    filter: false,
    filterType: 'dropdown',
    responsive: 'standard',
    rowsPerPage: 10,
    expandableRows: true,
    renderExpandableRow: (rowData, rowMeta) => {
      const rolesIndex = columns.findIndex((column) => column.name === 'roles')
      const roles = rowData[rolesIndex]

      if (!roles) return null

      return (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={columns.length}>
            <Collapse in={true} timeout='auto' unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant='h6' gutterBottom component='div'>
                  Roles
                </Typography>
                <Table size='small' aria-label='roles-table'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Administrative</TableCell>
                      <TableCell>Start Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {roles.map((role) => (
                      <TableRow key={role.id}>
                        <TableCell>
                          {rolesData.find((r) => r.id === role.tagRoleId)?.name}
                        </TableCell>
                        <TableCell>
                          {role.isAdministrative ? <CheckIcon /> : <ClearIcon />}
                        </TableCell>
                        <TableCell>{new Date(role.startDate).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )
    },
    downloadOptions: {
      filename: 'employee_list.csv',
      separator: ',',
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: true,
      },
    },
  }

  const title = (
    <Button onClick={() => handleEditClick()} startIcon={<AddCircleOutlineIcon />}>
      Add Employee
    </Button>
  )

  return (
    <div>
      <Typography variant='h6' component='div'>
        Employee List
      </Typography>
      <EditEmployee handleClose={handleCloseEdit} open={displayEdit} emp={selectedEmployee} />
      <DeleteEmployee
        handleClose={handleCloseDelete}
        open={displayDelete}
        id={selectedEmployeeId}
      />
      <MUIDataTable title={title} data={data} columns={columns} options={options} />
    </div>
  )
})
export default EmployeeTable
