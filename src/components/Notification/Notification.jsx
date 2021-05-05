import React, {useEffect, useState} from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'

const Notification = ({message = 'Stay at home!'}) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true)
    }, 2000)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  const handleClose = () => setShow(false)

  return (
    <Snackbar
      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      open={show}
      onClose={handleClose}
      message={message}
      action={
        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
          x
        </IconButton>
      }
    />
  )
}

export default Notification
