import initialState from 'reducers/initialState'

export default function (state = initialState.message, { type, payload }) {
  switch (type) {
    case 'SET_MESSAGE': {
      return { ...payload }
    }

    default:
      return state
  }
}
