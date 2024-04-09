import React, { useEffect, useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { Box, Card, InputAdornment, IconButton } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import loginStore from '../store/loginStore.js'
import BackgroundImage from '../assets/6374584.png'
const LoginPage = ({ updateUserName }) => {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const config = async (data) => {
    try {
      const status = await loginStore.login(data)
      if (status === 200) {
        sessionStorage.setItem('userName', data.userName)
        updateUserName(data.userName) // Update context immediately
        navigate('/')
      }
    } catch (error) {
      console.log('edit employee error: ', error.message)
    }
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
          position: 'relative',
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          height: '100%',
        }}
      >
        <Card>
          <Box
            sx={{
              '& .MuiTextField-root': { m: 1, width: '35ch' },
              display: 'flex',
              flexWrap: 'wrap',
              backgroundColor: '#C0D8FC',
            }}
            autoComplete='off'
          >
            <form onSubmit={handleSubmit(config)}>
              <TextField label='userName:' variant='outlined' {...register('userName')} />
              <br></br>
              <TextField
                {...register('password')}
                sx={{ m: 1, width: '25ch' }}
                variant='outlined'
                type={showPassword ? 'text' : 'password'}
                label='Password'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <br></br>

              <Button variant='contained' type='submit' fullWidth>
                Submit
              </Button>
            </form>
          </Box>
        </Card>
      </Box>
    </>
  )
}
export default LoginPage
