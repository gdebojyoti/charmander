// TODO: Re-do UI

import React, { useState, useEffect } from 'react'

import BasicPage from 'components/Ui/BasicPage'
import Button from 'components/Ui/Button'

import { getValue, setValue } from 'utilities/localStorage'

import './style'

let newUsername = ''

const EditProfile = ({ onReady }) => {
  const [name, setName] = useState('')

  useEffect(() => {
    // check for username & name from local storage
    const { name: playerName = '', username = '' } = getValue('profile') || {}
    newUsername = username || `_t_${new Date().getTime()}`
    setName(playerName.trim())
  }, [])

  const updateName = e => {
    setName(e.target.value)
  }

  const onSave = () => {
    const profileData = {
      name,
      username: newUsername.trim()
    }
    setValue('profile', profileData)
    onReady(profileData)
  }

  const ctaText = 'Save & Continue'

  return (
    <BasicPage
      heading='Getting Started'
      subheading="Enter a name and that's it. You can always change it later"
      className='edit-profile'
    >
      <input type='text' className='edit-profile__input' value={name} onChange={updateName} autoFocus placeholder='Your name' />
      <Button onClick={onSave} disabled={!name}>{ctaText}</Button>
    </BasicPage>
  )
}

export default EditProfile
