// import * as React from 'react'
// import Box from '@mui/material/Box'
// import { TextField } from '@mui/material'
// import { Card, CardContent, CardActions, Button } from '@mui/joy'
// import { useForm } from 'react-hook-form'

// import BackgroundImage from '../assets/6374584.png'
// import loginStore from '../store/loginStore.js'

// function LoginPage() {
//   const {
//     register,
//     handleSubmit,
//     control,
//     setValue,
//     formState: { errors },
//   } = useForm()
//   const onSubmit = async (data) => {
//     console.log("login",data)

//     try {
//       console.log("login",data)
//         const status = await loginStore.login(data)
//       }
//      catch (error) {
//       console.log('edit employee error: ', error.message)
//     }
//   }
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         minHeight: '80vh', // Ensure the box takes at least the full height of the viewport
//         position: 'relative',
//         backgroundImage: `url(${BackgroundImage})`,
//         backgroundSize: 'contain', // Ensure the entire image is visible without cropping
//         backgroundRepeat: 'no-repeat',
//         backgroundPosition: 'center', // Center the image horizontally and vertically
//         height: '100%', // Set the height of the box to 100% to match the image height
//       }}
//       component='form'
//       noValidate
//       autoComplete='off'
//     >
//       <Box>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <Card variant='outlined' sx={{ backgroundColor: '#C0D8FC' }}>
//             <CardContent>
//               <TextField {...register('userName')} id='outlined-basic' label='name' variant='outlined' />
//               <TextField {...register('password')} id='outlined-basic' label='password' variant='outlined' />
//             </CardContent>
//             <CardActions>
//               <Button type='submit'>save</Button>
//             </CardActions>
//           </Card>
//         </form>
//       </Box>

//     </Box>
//   )
// }

// export default LoginPage
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import loginStore from '../store/loginStore.js'

export default function LoginPage() {
  const { register, handleSubmit, } = useForm();
  const navigate = useNavigate();

  const config = async (data) => {
        console.log("login",data)
    
        try {
          console.log("login",data)
            const status = await loginStore.login(data)
          }
         catch (error) {
          console.log('edit employee error: ', error.message)
        }
      }
    
  return (
    <>
      <Box sx={{
        '& .MuiTextField-root': { m: 1, width: '35ch' }, display: 'flex', flexWrap: 'wrap' ,
      }} autoComplete="off">
        <form onSubmit={handleSubmit(config)}>
          <TextField label="userName:" variant="outlined" {...register("userName")} /><br></br>
          <TextField label="Password:" variant="outlined" {...register("password")} type="password"/><br></br>
         
         
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </>
  );
}
