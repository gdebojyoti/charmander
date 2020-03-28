import initialState from 'reducers/initialState'

export default function (state = initialState.profile, { type, payload }) {
  switch (type) {
    case 'UPDATE_PROFILE': {
      const profile = { ...state }
      return { ...profile, ...payload }
    }

    default:
      return state
  }
}
