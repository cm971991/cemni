import localStorage from './localStorage'
import Common from './common'
import Date from './date'
import Validate from './validate'
import WeiXin from './weixin'
import PinYin from './pinyin'

export default function (Vue) {
  if (!Vue.$utils) {
    Vue.$utils = {
      localStorage,
      Common,
      Date,
      Validate,
      WeiXin,
      PinYin
    }
  } else {
    Vue.$utils = {
      localStorage,
      Common,
      Date,
      Validate,
      WeiXin,
      PinYin
    }
  }
  Vue.mixin({
    created () {
      this.$utils = {
        localStorage,
        Common,
        Date,
        Validate,
        WeiXin,
        PinYin
      }
    }
  })
}
