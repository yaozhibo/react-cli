// import axios from 'axios'
import request from '../../utils/request'

export const GET_USER_INFO = 'userInfo/GET_USER_INFO'

export function getUserInfo() {
  return dispatch => {
    request({
      url: '/api/user',
      method: 'post'
    }).then(res => {
      // console.log(res)
      let data = res
      dispatch({
        type: GET_USER_INFO,
        payload: data
      })
    })
  }
}