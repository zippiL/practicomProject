import React, { useEffect, useState, useRef } from 'react'

import EmployeeTable from './employeeTable.jsx'
import EmployeeStore from '../store/employeeStore.js'
import { observer } from 'mobx-react'

const Employee = observer(() => {
  const employeeDetails = EmployeeStore.date_emp
  const formatRoles = (roles) => {
    return roles.map((role) => role.name).join(', ')
  }

  const csvData = employeeDetails.map((row) => {
    const { roles, ...rest } = row
    return { ...rest, roles: formatRoles(roles) }
  })

  return (
    <>
      <EmployeeTable rows={employeeDetails} />
    </>
  )
})
export default Employee
