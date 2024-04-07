import { useState } from 'react'

import './App.css'
import PageNotFound from './general/pageNotFound.jsx'
import * as React from 'react';
import Employee from './employee/employee.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes ,Route,Link} from 'react-router-dom';
// import { Route } from '@mui/icons-material';
import HomePage from './general/homePage.jsx';
import {AppBar,Toolbar,Typography,Button} from '@mui/material/';
import LoginPage from './general/loginPage.jsx';
import RoleEmployee from './role/roleEmployee.jsx';

const queryClient = new QueryClient();
const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter >
        <AppBar  position="static">
          <Toolbar>
          <Button color="inherit" component={Link} to="/">Home Page</Button>
          <Button color="inherit" component={Link} to="/loginPage">Login</Button>
            <Button color="inherit" component={Link} to="/showTable">Employee</Button>
            <Button color="inherit" component={Link} to="/role">role</Button>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/showTable" element={<Employee />} />
          <Route path="/loginPage" element={<LoginPage/>} />
          <Route path="/role" element={<RoleEmployee/>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
