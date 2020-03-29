import initialState from 'reducers/initialState'

export default function (state = initialState.match, { type, payload }) {
  switch (type) {
    case 'UPDATE_MATCH_DETAILS': {
      const match = { ...state }
      return { ...match, ...payload }
    }

    default:
      return state
  }
}
