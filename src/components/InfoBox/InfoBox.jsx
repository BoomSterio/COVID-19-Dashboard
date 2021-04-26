import React from 'react'
import s from './InfoBox.module.css'
import {Typography} from '@material-ui/core'
import Card from '@material-ui/core/Card'

const InfoBox = ({title, cases, total}) => {
  return (
    <Card elevation={2} className={s.infoBox}>
      <Typography color={'textSecondary'}>{title}</Typography>
      <h3>+{cases}</h3>
      <Typography color={'textSecondary'}>Total: {total}</Typography>
    </Card>
  )
}

export default InfoBox
