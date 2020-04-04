import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Arena from 'components/Ui/Arena'
import EditProfile from 'components/EditProfile' // change
import HostOrJoin from 'components/Ui/HostOrJoin'

import { getValue } from 'utilities/localStorage'
import * as socketActions from 'actions/socket'
import * as profileActions from 'actions/profile'

// import Engine from 'services/Engine'

const Uno = (props) => {
  const { match, profile, socketActions, profileActions } = props

  const [isReady, setIsReady] = useState(false) // true, if name & username exist in local storage
  const [showChoiceModal, setShowChoiceModal] = useState(true) // modal for user to choose between host & client

  const { id: matchId, status } = match

  // connect to Socket server; retrieve profile data from local storage
  useEffect(() => {
    // connect to Socket server
    socketActions.initialize()

    // check for username & name from local storage
    const { name = '', username = '' } = getValue('profile') || {}

    // set isReady to true, if name & username exist
    if (name && username) {
      setIsReady(true)
      profileActions.updateProfile({ name, username })

      // stuff
      const matchId = getValue('matchId')
      if (matchId) {
        socketActions.rejoinMatch({ username, matchId })
        console.log('in the middle of a game', matchId)
      }
    }
  }, [])

  // TODO: find a better condition for hiding modal
  // no need for choice modal if status is already LIVE
  useEffect(() => {
    if (status) {
      setShowChoiceModal(false)
    }
  }, [status])

  // if isReady = false, open edit profile form
  if (!isReady) {
    const onReady = (profileData) => {
      setIsReady(true)
      profileActions.updateProfile(profileData)
    }
    return <EditProfile onReady={onReady} />
  }

  // if showChoiceModal = true, open form to select host vs join (as a client)
  if (showChoiceModal) {
    const onHost = () => {
      const { username, name } = profile
      socketActions.hostMatch({ username, name })
      setShowChoiceModal(false)
    }
    const onJoin = () => {
      const { username, name } = profile
      socketActions.joinMatch({ username, name, matchId })
      setShowChoiceModal(false)
    }
    return <HostOrJoin onHost={onHost} onJoin={onJoin} />
  }

  return (
    <Arena
      socketActions={socketActions}
      match={match}
      profile={profile}
    />
  )
}

const mapStateToProps = ({
  profile,
  match
}) => ({
  match,
  profile
})

const mapDispatchToProps = dispatch => {
  return {
    socketActions: bindActionCreators(socketActions, dispatch),
    profileActions: bindActionCreators(profileActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Uno)
