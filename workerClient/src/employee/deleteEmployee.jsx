import React from 'react'
import Snackbar from '@mui/joy/Snackbar'
import Button from '@mui/joy/Button'
import CloseIcon from '@mui/icons-material/Close'
import EmployeeStore from '../store/employeeStore.js'
import IconButton from '@mui/joy/IconButton'
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded'

function DeleteEmployee(props) {
  const { id, open, handleClose } = props

  async function remove(rowId) {
    try {
      await EmployeeStore.removeData(rowId)
      handleClose(false) // קריאה לפונקציה handleClose עם הערך false
      console.log(`Data with ID ${rowId} removed successfully.`)
    } catch (error) {
      console.error('Error removing data:', error)
    }
  }

  return (
    <>
      <Snackbar
        variant='soft'
        color='danger'
        open={open}
        onClose={() => handleClose()}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        startDecorator={<PlaylistAddCheckCircleRoundedIcon />}
        endDecorator={
          <React.Fragment>
            <Button
              onClick={() => remove(id)} // קריאה לפונקציה remove עם המזהה id
              size='sm'
              variant='soft'
              color='danger'
            >
              ok
            </Button>
            <IconButton variant='soft' size='sm' color='danger' onClick={() => handleClose(false)}>
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      >
        Are you sure you want to delete?
      </Snackbar>
    </>
  )
}

export default DeleteEmployee
