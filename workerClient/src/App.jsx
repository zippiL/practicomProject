import React, { useState, createContext } from 'react'
import './App.css'
import PageNotFound from './general/pageNotFound.jsx'
import Employee from './employee/employee.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import HomePage from './general/homePage.jsx'
import { AppBar, Toolbar, Paper, Button } from '@mui/material/'
import LoginPage from './general/loginPage.jsx'
import RoleEmployee from './role/roleEmployee.jsx'
import logo from './assets/logo2.png'
import employeeStore from './store/employeeStore.js'
import tagRoleStore from './store/tagRoleStore.js'

// Create context
const SessionContext = createContext()

const App = () => {
  const [userName, setUserName] = useState(sessionStorage.getItem('userName') || 'guest')

  const updateUserName = (newUserName) => {
    sessionStorage.setItem('userName', newUserName)
    setUserName(newUserName)
  }

  const handleClose = () => {
    sessionStorage.setItem('jwt', '')
    updateUserName('guest')
    employeeStore.getData()
    tagRoleStore.getData()
  }

  return (
    <SessionContext.Provider value={{ userName, updateUserName }}>
      <BrowserRouter>
        <AppBar position='static'>
          <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={logo} alt='Logo' style={{ maxHeight: '100%', maxWidth: '5%' }} />
              <Button color='inherit' component={Link} to='/'>
                Home Page
              </Button>

              <Button
                color='inherit'
                component={Link}
                to={userName === 'guest' ? '/loginPage' : '/showTable'}
              >
                Employee
              </Button>
              <Button
                color='inherit'
                component={Link}
                to={userName === 'guest' ? '/loginPage' : '/role'}
              >
                Role
              </Button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <SessionButton />
              {userName !== 'guest' && (
                <Button color='inherit' onClick={handleClose} component={Link} to='/'>
                  Logout
                </Button>
              )}
            </div>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/showTable' element={<Employee />} />
          <Route path='/loginPage' element={<LoginPage updateUserName={updateUserName} />} />
          <Route path='/role' element={<RoleEmployee />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Paper sx={{ height: '40px', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <p>Copyright © FITFLEX by Zippi Lando 2024</p>
      </Paper>
    </SessionContext.Provider>
  )
}

// Custom button component using context
const SessionButton = () => {
  const { userName } = React.useContext(SessionContext)

  return (
    <Button color='inherit' component={Link} to={userName === 'guest' ? '/loginPage' : '/'}>
      {userName === 'guest' ? 'login' : `hello to: ${userName}`}
    </Button>
  )
}

export default App
