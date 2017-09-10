/**
 * Created by hale 2017年9月8日15:15:08
 */

import Vue from 'vue'
import api from '../api/commonApi'

const state = {
  openId: '',
  activityNo: ''
}

const getters = {
  openId: state => {
    return state.openId
  },
  activityNo: state => {
    return state.activityNo
  }
}

const actions = {
  /**
   * 新老用户查询
   * @param commit
   * @param state
   * @param body
   * @returns {Promise}
   */
  queryUserStatus({commit, state} = {}, body) {
    return new Promise((resolve) => {
      api.queryUserStatus(body.openId).then((res) => {
        if (res) {
          if (res.responseCode === '0000') {
            debugger
            if (res.userInfo.name && res.userInfo.name.length > 1) {
              if (!res.userInfo.companyAddress && res.userInfo.companyAddress.length >= 0) {
                res.userInfo.companyAddress = []
              } else {
                let city = res.userInfo.companyAddress
                let area = city.substring(0, 4) + '00'
                let province = city.substring(0, 2) + '0000'
                res.userInfo.companyAddress = [province, area, city]
              }
              if (!res.userInfo.userType) {
                res.userInfo.userType = []
              }
            }
            resolve(res)
          } else {
            Vue.$vux.alert.show({content: res.responseMsg})
          }
        } else {
          Vue.$vux.alert.show({content: '传输异常，请稍后再试！'})
        }
      })
    })
  },
  /**
   * 新增用户信息
   * @param commit
   * @param state
   * @param body
   * @returns {Promise}
   */
  registerUser({commit, state} = {}, body) {
    return new Promise((resolve) => {
      api.registerUser(body.userInfo).then((res) => {
        if (res) {
          if (res.flag) {
            resolve(res)
          } else {
            Vue.$vux.alert.show({content: res.msg})
          }
        } else {
          Vue.$vux.alert.show({content: '传输异常，请稍后再试！'})
        }
      })
    })
  },
  /**
   * 修改用户信息
   * @param commit
   * @param state
   *  @param body
   * @returns {Promise}
   */
  editUser({commit, state} = {}, body) {
    return new Promise((resolve) => {
      api.editUser(body).then((res) => {
        if (res) {
          if (res.flag) {
            resolve(res)
          } else {
            Vue.$vux.alert.show({content: res.msg})
          }
        } else {
          Vue.$vux.alert.show({content: '传输异常，请稍后再试！'})
        }
      })
    })
  },
  /**
   * 参与活动
   * @param commit
   * @param state
   * @param body
   * @returns {Promise}
   */
  joinActivity({commit, state} = {}, body) {
    // body.openId = '11'
    // body.activityNo = 'AC20170320002'
    return new Promise((resolve) => {
      api.joinActivity(body.openId, body.activityNo).then((res) => {
        if (res) {
          if (res.responseCode === '0000') {
            resolve(res)
          } else {
            resolve(res)
            // Vue.$vux.alert.show({content: res.responseMsg})
          }
        } else {
          Vue.$vux.alert.show({content: '传输异常，请稍后再试！'})
        }
      })
    })
  },
  /**
   * 领取中奖奖励接口
   * @param commit
   * @param state
   * @param body
   * @returns {Promise}
   */
  receiveAward({commit, state} = {}, body) {
    // body.openId = '11'
    // body.activityNo = 'AC20170320002'
    return new Promise((resolve) => {
      api.receiveAward(body.openId, body.activityNo).then((res) => {
        if (res) {
          if (res.responseCode === '0000') {
            resolve(res)
          } else {
            Vue.$vux.alert.show({content: res.responseMsg})
          }
        } else {
          Vue.$vux.alert.show({content: '传输异常，请稍后再试！'})
        }
      })
    })
  },
  /**
   * 查询是否已参与活动
   * @param commit
   * @param state
   * @param body
   * @returns {Promise}
   */
  queryJoinActivity({commit, state} = {}, body) {
    return new Promise((resolve) => {
      api.queryJoinActivity(body.openId).then((res) => {
        if (res) {
          if (res.responseCode === '0000') {
            resolve(res)
          } else {
            Vue.$vux.alert.show({content: res.responseMsg})
          }
        } else {
          Vue.$vux.alert.show({content: '传输异常，请稍后再试！'})
        }
      })
    })
  },
}

const mutations = {
  set_openId(state, val) {
    state.openId = val
  },
  set_activityNo(state, val) {
    state.activityNo = val
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
