/**
 * Created by hale 2017年9月8日15:14:15
 */

import Vue from 'vue'

export default {
  /**
   * 新老用户查询接口
   * @param openId
   * @returns {Promise}
   */
  queryUserStatus (openId) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.post('', {openId: openId}).then((res) => {
        resolve(res)
      }).catch((ex) => {
        Vue.$vux.alert.show({content: '传输异常，请稍后再试！'})
      })
    })
  },
  /**
   * 参与活动接口
   * @param openId
   * @returns {Promise}
   */
  joinActivity (openId) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.post('', {openId: openId}).then((res) => {
        resolve(res)
      }).catch((ex) => {
        Vue.$vux.alert.show({content: '传输异常，请稍后再试！'})
      })
    })
  },
  /**
   * 查询以往获奖人信息
   * @returns {Promise}
   */
  queryWinnerInfo () {
    return new Promise((resolve) => {
      Vue.$api.xHttp.post('', {}).then((res) => {
        resolve(res)
      }).catch((ex) => {
        Vue.$vux.alert.show({content: '传输异常，请稍后再试！'})
      })
    })
  },
  /**
   * 查询待抽奖人信息
   * @returns {Promise}
   */
  queryWaitLotteryInfo () {
    return new Promise((resolve) => {
      Vue.$api.xHttp.post('', {}).then((res) => {
        resolve(res)
      }).catch((ex) => {
        Vue.$vux.alert.show({content: '传输异常，请稍后再试！'})
      })
    })
  },
  /**
   * 领取中奖奖励接口
   * @param openId
   * @returns {Promise}
   */
  receiveAward (openId) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.post('', {openId: openId}).then((res) => {
        resolve(res)
      }).catch((ex) => {
        Vue.$vux.alert.show({content: '传输异常，请稍后再试！'})
      })
    })
  },
  /**
   * 查询自己是否中奖
   * @param openId
   * @returns {Promise}
   */
  queryPersonalLottery (openId) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.post('', {openId: openId}).then((res) => {
        resolve(res)
      }).catch((ex) => {
        Vue.$vux.alert.show({content: '传输异常，请稍后再试！'})
      })
    })
  }
}
