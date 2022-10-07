import { types } from '../types/types'

const initialState = {
  data: {},
  logged: false,
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.login:
      return {
        ...action.payload,
        logged: true,
      }

    case types.logout:
      return {
        logged: false,
      }

    default:
      return state
  }
}
