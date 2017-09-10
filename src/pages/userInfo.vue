<template>
    <div class="userInfo-contain">
        <!-- region logo标志 -->
        <img class="logo" src="../assets/images/common/logo.png"/>
        <!-- endregion logo标志 -->

        <!-- region 表单 -->
        <div class="form">
            <div class="form-contain">
                <!-- region 姓名 -->
                <div class="title">姓名：</div>
                <div class="user-name">
                    <input type="text" v-model="formData.name" title="姓名" maxlength="6" minlength="2"/>
                </div>
                <!-- endregion 姓名 -->

                <!-- region 手机号码 -->
                <div class="title">手机号码：</div>
                <div class="mobile">
                    <input type="tel" v-model="formData.mobile" title="手机号码" maxlength="11"/>
                </div>
                <!-- endregion 手机号码 -->

                <!-- region 区域 -->
                <div class="title">区域：</div>
                <div class="area">
                    <popup-picker :data="areaData.list" :columns="3" v-model="areaData.companyAddress" :show-name="true"
                                  :class="{ fill:areaData.isEmpty }"
                                  value-text-align="left" @on-change="areaChange"></popup-picker>
                </div>
                <!-- endregion 区域 -->

                <!-- region 客户类型 -->
                <div class="title picker-title">客户类型：</div>
                <div class="user-type">
                    <popup-picker :data="userTypeData.list" v-model="userTypeData.userType" :show-name="true"
                                  :class="{ fill:userTypeData.isEmpty }"
                                  value-text-align="left" @on-change="userTypeChange"></popup-picker>
                </div>
                <!-- endregion 客户类型 -->

                <!-- region 公司名称 -->
                <div class="title picker-title">公司名称：</div>
                <div class="company-name">
                    <img class="flower-three" src="../assets/images/userInfo/flower3.png"/>
                    <input type="text" v-model="formData.company" title="公司名称" maxlength="20"/>
                </div>
                <!-- endregion 公司名称 -->

                <!-- region 确认提交按钮 -->
                <div class="submit" @click="submit">
                    <button :disabled="disabled" :class="{ active : disabled }">确认提交</button>
                </div>
                <!-- endregion 确认提交按钮 -->
            </div>
        </div>
        <!-- endregion 表单 -->

        <!-- region 浮动图片元素 -->
        <img class="flower-one" src="../assets/images/userInfo/flower1.png"/>
        <img class="flower-two" src="../assets/images/userInfo/flower2.png"/>
        <img class="ring" src="../assets/images/userInfo/ringShadow.png"/>
        <img class="lzl" src="../assets/images/userInfo/lzl.png">
        <!-- endregion 浮动图片元素 -->
    </div>
</template>

<script>
  import {PopupPicker, ChinaAddressData} from 'vux'

  export default {
    components: {PopupPicker},
    data() {
      return {
        audioSrc: '',
        formData: {
          name: '',
          mobile: '',
          company: ''
        },
        userStatus: 1,
        areaData: {
          list: ChinaAddressData,
          companyAddress: [],
          isEmpty: true
        },
        userTypeData: {
          list: [[
            {
              name: '工作人员',
              value: '1'
            },
            {
              name: '参展人员',
              value: '2'
            }]],
          userType: [],
          isEmpty: true
        }
      }
    },
    computed: {
      errMsg() {
        if (!this.$utils.Validate.chkFormat(this.formData.name, 'chinaName')) {
          return '请输入正确的姓名'
        }
        if (!this.$utils.Validate.chkFormat(this.formData.mobile, 'phone')) {
          return '请输入正确的手机号码'
        }
        return null
      },
      disabled() {
        if (!this.formData.name || this.formData.name.length < 2) {
          return true
        }
        if (!this.formData.mobile || this.formData.mobile.length !== 11) {
          return true
        }
        if (!this.areaData.companyAddress || this.areaData.companyAddress.length <= 2) {
          return true
        }
        if (!this.userTypeData.userType || this.userTypeData.userType.length <= 0) {
          return true
        }
        return false
      },
      packParam() {
        let domain = {}
        domain['mobile'] = this.formData.mobile
        domain['userType'] = this.userTypeData.userType[0]
        domain['name'] = this.formData.name
        domain['companyAddress'] = this.areaData.companyAddress[2]
        domain['company'] = this.formData.company
        domain['openid'] = this.$utils.localStorage.get('openId')
        domain['activityNo'] = this.$utils.localStorage.get('activityNo')
        return domain
      }
    },
    mounted() {
      this.initWXBmgPlay()
    },
    created() {
      this.getUserStatus()
    },
    methods: {
      /**
       *  解决ios微信无法自动播放
       */
      initWXBmgPlay() {
        let audio = document.querySelector('audio')
        if (audio) {
          audio.load()
          audio.play()
          this.$parent.$data.bgmShow = true
          this.$parent.$data.audioPlay = true
        }
        document.addEventListener('WeixinJSBridgeReady', () => {
          let audio = document.querySelector('audio')
          if (audio) {
            audio.load()
            audio.play()
            this.$parent.$data.bgmShow = true
            this.$parent.$data.audioPlay = true
          }
        }, false)
      },
      /**
       * 背景音乐播放、暂停
       */
      bmgPlay() {
        this.audioPlay = !this.audioPlay
        let audio = document.querySelector('audio')
        if (audio !== null) {
          if (audio.paused) {
            audio.play()
          } else {
            audio.pause()
          }
        }
      },
      /**
       * 区域下拉框事件
       */
      areaChange(val) {
        this.areaData.isEmpty = false
        this.areaData.companyAddress = val
      },
      /**
       * 客户类型下拉框事件
       */
      userTypeChange(val) {
        this.userTypeData.isEmpty = false
        this.userTypeData.userType = val
      },
      /**
       * 新老用户查询接口
       */
      getUserStatus() {
        this.$store.dispatch('queryUserStatus', {openId: this.$utils.localStorage.get('openId')}).then(res => {
          console.log('queryUserStatus:', res)
          if (res.userInfo.name && res.userInfo.name.length > 1) {
            debugger
            this.formData = res.userInfo
            if (res.userInfo.companyAddress && res.userInfo.companyAddress.length > 0) {
              this.areaData.companyAddress = res.userInfo.companyAddress
            }
            if (res.userInfo.userType && res.userInfo.userType.length > 0) {
              this.userTypeData.userType = res.userInfo.userType
            }
          }
          this.userStatus = res.userStatus
        })
      },
      /**
       * 提交用户数据
       */
      submit() {
        if (this.errMsg) {
          this.$vux.alert.show({content: this.errMsg})
          return
        }
        let apiName = this.userStatus === 0 ? 'editUser' : 'registerUser'
        this.$store.dispatch(apiName, {userInfo: this.packParam}).then(res => {
          if (res && res.flag) {
            this.$router.push({path: '/gift'})
          }
        })
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
    @import '../assets/styles/pages/userInfo';
</style>
