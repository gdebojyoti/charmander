// TODO: Delete this

import React, { useState, useEffect } from 'react'

import { getValue, setValue } from 'utilities/localStorage'

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
    setName(e.target.value.trim())
  }

  const onSave = () => {
    const profileData = {
      name,
      username: newUsername
    }
    setValue('profile', profileData)
    onReady(profileData)
  }

  const ctaText = 'Save details'

  return (
    <div>
      Editing profile...
      <input type='text' value={name} onChange={updateName} autoFocus />
      <button onClick={onSave} disabled={!name}>{ctaText}</button>
    </div>
  )
}

export default EditProfile
