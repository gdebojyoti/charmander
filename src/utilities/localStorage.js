export const getValue = label => {
  let value = window.localStorage.getItem(label)
  // TODO: find a better alternative to try-catch
  try {
    value = JSON.parse(value)
  } catch (e) {
    return value
  }
  return value
}

export const setValue = (label, value) => {
  window.localStorage.setItem(label, typeof value === 'object' ? JSON.stringify(value) : value)
}

export const remove = (label) => {
  window.localStorage.removeItem(label)
}
