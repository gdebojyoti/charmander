export const updateProfile = (profileData) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'UPDATE_PROFILE',
      payload: profileData
    })
  }
}
