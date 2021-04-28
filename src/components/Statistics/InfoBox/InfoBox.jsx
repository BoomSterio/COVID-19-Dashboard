import React, {useContext} from 'react'
import s from './InfoBox.module.css'
import {Typography} from '@material-ui/core'
import Card from '@material-ui/core/Card'
import {contextActions, DispatchContext, StateContext} from '../../../context/context'

const InfoBox = ({type, title, cases, total}) => {
  const {mapCasesType} = useContext(StateContext)
  const dispatch = useContext(DispatchContext)

  const handleClick = () => {
    dispatch(contextActions.setMapCasesType(type))
  }

  const active = mapCasesType === type

  return (
    <Card elevation={3} onClick={handleClick} className={`${s.infoBox} ${active && s[type]}`}>
      <Typography color={'textSecondary'}>{title}</Typography>
      <h3>+{cases}</h3>
      <Typography color={'textSecondary'}>Total: {total}</Typography>
    </Card>
  )
}

export default InfoBox
