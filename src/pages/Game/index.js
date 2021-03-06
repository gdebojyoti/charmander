import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Lobby from 'components/Lobby'
import EditProfile from 'components/EditProfile' // change
import HostOrJoin from 'components/HostOrJoin'
import Arena from 'components/Arena'
import PostGame from 'components/PostGame'

import matchStatus from 'constants/matchStatus'
import { getValue } from 'utilities/localStorage'
import * as socketActions from 'actions/socket'
import * as profileActions from 'actions/profile'

const Uno = (props) => {
  const { match, match: { status }, profile, socketActions, profileActions } = props

  const [isReady, setIsReady] = useState(false) // true, if name & username exist in local storage

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

  // if isReady = false, open edit profile form
  if (!isReady) {
    const onReady = (profileData) => {
      setIsReady(true)
      profileActions.updateProfile(profileData)
    }
    return <EditProfile onReady={onReady} />
  }

  // if no match status, open form to select host vs join (as a client)
  if (!status) {
    const onHost = () => {
      const { username, name } = profile
      socketActions.hostMatch({ username, name })
    }
    const onJoin = (code) => {
      const { username, name } = profile
      socketActions.joinMatch({ username, name, code })
    }

    // modal for user to choose between host & client
    return <HostOrJoin onHost={onHost} onJoin={onJoin} />
  }

  // before match starts
  if (status === matchStatus.PREMATCH) {
    return (
      <Lobby
        socketActions={socketActions}
        match={match}
        profile={profile}
      />
    )
  }

  // during match
  if (status === matchStatus.LIVE) {
    return (
      <Arena
        socketActions={socketActions}
        match={match}
        profile={profile}
      />
    )
  }

  // on match complete (i.e., when one player has no cards left)
  if (status === matchStatus.COMPLETED) {
    return (
      <PostGame
        socketActions={socketActions}
        match={match}
        profile={profile}
      />
    )
  }

  // on match abandoned (i.e., only one player remains)
  if (status === matchStatus.ABANDONED) {
    return (
      <PostGame
        socketActions={socketActions}
        match={match}
        profile={profile}
        isAbandoned
      />
    )
  }

  return null
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
