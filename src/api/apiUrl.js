/**
 * Created by hale on 2017年9月9日18:08:00.
 */

export default {
  getUrl: (action) => {
    let url = 'http://121.40.231.28:8080/ApiCemni2/' // '/cemniApi/ApiCemni2/' // 'http://121.40.231.28:8080/ApiCemni2/'
    let actions = {
      // 新老用户查询接口
      'queryUserStatus': () => {
        return url + 'queryUserStatus'
      },
      // 新增用户信息
      'registerUser': () => {
        return url + 'registerUser'
      },
      // 修改用户信息
      'editUser': () => {
        return url + 'editUser'
      },
      // 参与活动
      'joinActivity': () => {
        return url + 'joinActivity'
      },
      // 查询自己是否中奖
      'receiveAward': () => {
        return url + 'receiveAward'
      },
      'queryJoinActivity': () => {
        return url + 'queryJoinActivity'
      }
    }
    return actions[action]()
  }
}
