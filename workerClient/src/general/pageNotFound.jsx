import { Button } from '@mui/material'
import imag from '../assets/3828541.jpg'
export default function PageNotFound() {
  return (
    <div
      style={{
        backgroundImage: `url(${imag})`,
        backgroundSize: '100% 100%', // אופן מילוי התמונה לכל העמוד
        backgroundRepeat: 'no-repeat',
        height: '80vh',
        width: '40vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button></Button>
    </div>
  )
}
