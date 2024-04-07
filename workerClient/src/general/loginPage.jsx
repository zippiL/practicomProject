import * as React from 'react';
import Box from '@mui/material/Box';
import { TextField  } from '@mui/material';
import { Card, CardContent, CardActions ,Button} from '@mui/joy';

import BackgroundImage from '../assets/6374584.png';

function LoginPage() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '80vh', // Ensure the box takes at least the full height of the viewport
                position: 'relative',
                backgroundImage: `url(${BackgroundImage})`,
                backgroundSize: 'contain', // Ensure the entire image is visible without cropping
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center', // Center the image horizontally and vertically
                height: '100%', // Set the height of the box to 100% to match the image height
            }}
            component="form"
            noValidate
            autoComplete="off"
        >
            <Box>
                <form>
                    <Card variant="outlined" sx={{ backgroundColor:'#C0D8FC' }}>
                        <CardContent>
                            <TextField id="outlined-basic" label="name" variant="outlined" />
                            <TextField id="outlined-basic" label="password" variant="outlined" />
                        </CardContent>
                        <CardActions>
                            <Button>save</Button>
                        </CardActions>
                    </Card>
                </form>
            </Box>
        </Box>
    );
}

export default LoginPage;
