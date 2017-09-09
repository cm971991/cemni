/**
 * Created by hale 2017年9月8日15:14:15
 */

import Vue from 'vue'
import url from '../api/apiUrl'

export default {
  /**
   * 新老用户查询接口
   * @param openId
   * @returns {Promise}
   */
  queryUserStatus(openId) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.post(url.getUrl('queryUserStatus'), {openId: openId}).then((res) => {
        resolve(res)
      }).catch((ex) => {
        Vue.$vux.alert.show({content: '传输异常，请稍后再试！'})
      })
    })
  },
  /**
   * 新增用户信息
   * @param userInfo
   * @returns {Promise}
   */
  registerUser(userInfo) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.post(url.getUrl('registerUser'), userInfo).then((res) => {
        resolve(res)
      }).catch((ex) => {
        Vue.$vux.alert.show({content: '传输异常，请稍后再试！'})
      })
    })
  },
  /**
   * 修改用户信息
   * @param body
   * @returns {Promise}
   */
  editUser(body) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.post(url.getUrl('editUser'), body).then((res) => {
        resolve(res)
      }).catch((ex) => {
        Vue.$vux.alert.show({content: '传输异常，请稍后再试！'})
      })
    })
  },
  /**
   * 参与活动
   * @param openId
   * @param activityNo
   * @returns {Promise}
   */
  joinActivity(openId, activityNo) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.post(url.getUrl('joinActivity'), {openId: openId, activityNo: activityNo}).then((res) => {
        resolve(res)
      }).catch((ex) => {
        Vue.$vux.alert.show({content: '传输异常，请稍后再试！'})
      })
    })
  },
  /**
   * 领取中奖奖励接口
   * @param openId
   * @param activityNo
   * @returns {Promise}
   */
  receiveAward(openId, activityNo) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.post(url.getUrl('receiveAward'), {openId: openId, activityNo: activityNo}).then((res) => {
        resolve(res)
      }).catch((ex) => {
        Vue.$vux.alert.show({content: '传输异常，请稍后再试！'})
      })
    })
  },
  /**
   * 查询是否已参与活动
   * @param openId
   * @returns {Promise}
   */
  queryJoinActivity(openId) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.post(url.getUrl('queryJoinActivity'), {openId: openId}).then((res) => {
        resolve(res)
      }).catch((ex) => {
        Vue.$vux.alert.show({content: '传输异常，请稍后再试！'})
      })
    })
  }
}
