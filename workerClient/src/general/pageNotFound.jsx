import { Button } from '@mui/material'
import imag from '../assets/3828541.jpg'

export default function PageNotFound() {
  return (
    <div
      style={{
        position: 'relative',
        height: '80vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img
        src={imag}
        alt="Page not found"
        style={{
          maxWidth: '100%',
          maxHeight: '60vh',
          marginBottom: '20px',
        }}
      />
      <Button variant="contained" color="primary" href="/">
        Home Page
      </Button>
    </div>
  )
}
