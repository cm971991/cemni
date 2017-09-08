/**
 * Created by hale 2017年9月8日15:15:08
 */

import Vue from 'vue'
import api from '../api/commonApi'

const actions = {
  /**
   * 新老用户查询
   * @param commit
   * @param state
   * @param body
   * @returns {Promise}
   */
  queryUserStatus ({commit, state} = {}, body) {
    console.log('body.openId:', body.openId)
    return new Promise((resolve) => {
      api.queryUserStatus(body.openId).then((res) => {
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
   * 参与活动
   * @param commit
   * @param state
   * @param body
   * @returns {Promise}
   */
  joinActivity ({commit, state} = {}, body) {
    console.log('body.openId:', body.openId)
    return new Promise((resolve) => {
      api.joinActivity(body.openId).then((res) => {
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
   * 查询以往获奖人信息
   * @param commit
   * @param state
   * @returns {Promise}
   */
  queryWinnerInfo ({commit, state} = {}) {
    return new Promise((resolve) => {
      api.queryWinnerInfo().then((res) => {
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
   * 查询待抽奖人信息
   * @param commit
   * @param state
   * @returns {Promise}
   */
  queryWaitLotteryInfo ({commit, state} = {}) {
    return new Promise((resolve) => {
      api.queryWaitLotteryInfo().then((res) => {
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
   * 领取中奖奖励接口
   * @param commit
   * @param state
   * @param body
   * @returns {Promise}
   */
  receiveAward ({commit, state} = {}, body) {
    console.log('body.openId:', body.openId)
    return new Promise((resolve) => {
      api.receiveAward(body.openId).then((res) => {
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
   * 查询自己是否中奖
   * @param commit
   * @param state
   * @param body
   * @returns {Promise}
   */
  queryPersonalLottery ({commit, state} = {}, body) {
    console.log('body.openId:', body.openId)
    return new Promise((resolve) => {
      api.queryUserStatus(body.openId).then((res) => {
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
  }
}

export default {
  actions
}
