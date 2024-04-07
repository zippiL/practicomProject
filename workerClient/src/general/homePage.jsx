import React from 'react';
import BackgroundImage from '../assets/9412392.png';
import { Button, Typography } from '@mui/material';

function HomePage() {
    return (
        <div style={{ display: 'flex' }}>
          <div
            style={{
              backgroundImage: `url(${BackgroundImage})`,
              backgroundSize: '80% auto',
              backgroundRepeat: 'no-repeat',
              height: '80vh',
              flex: '1',
            }}
          />
          <div style={{ padding: '50px', flex: '1' }}>
            <Typography variant="h3">
              Unlock the Power of Unified Employee Data!
            </Typography>
            <Typography variant="h4">Dive In Without Drowning!</Typography>
            <Typography>
              Are you tired of scattered employee information? Say goodbye to chaos and hello to efficiency with our all-in-one employee data management platform.
            </Typography>
            <Typography>
              One Site, All Your Employee Data.
            </Typography>
            <Button >
              Login/Register Today!
            </Button>
            <Typography style={{ paddingTop: '10px' }}>
              Start managing your employee data today!
            </Typography>
          </div>
        </div>
      );
    
}
export default HomePage;
