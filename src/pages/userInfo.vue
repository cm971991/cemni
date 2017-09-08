<template>
    <div class="userInfo-contain">
        <img class="logo" src="../assets/images/common/logo.png"/>
        <div class="form">
            <div class="form-contain">
                <div class="title"><label>姓名：</label></div>
                <div class="user-name">
                    <template v-if="isOldUser">
                        <label>{{ formData.userName || '' }}</label>
                    </template>
                    <template v-else>
                        <input type="text" v-model="formData.userName" title="姓名"/>
                    </template>
                </div>
                <div class="title"><label>手机号码：</label></div>
                <div class="mobile">
                    <template v-if="isOldUser">
                        <label>{{ formData.mobile || '' }}</label>
                    </template>
                    <template v-else>
                        <input type="tel" v-model="formData.mobile" title="手机号码" maxlength="11"/>
                    </template>
                </div>
                <div class="title"><label>区域：</label></div>
                <div class="area">
                    <popup-picker :data="areaData.list" :columns="3" v-model="areaData.currValue" :show-name="true"
                                  value-text-align="left"></popup-picker>
                </div>
                <div class="title"><label>客户类型：</label></div>
                <div class="user-type">
                    <popup-picker :data="userTypeData.list" v-model="userTypeData.currValue"
                                  value-text-align="left"></popup-picker>
                </div>
                <div class="title"><label>公司名称：</label></div>
                <div class="company-name">
                    <img class="flower-three" src="../assets/images/userInfo/flower3.png"/>
                    <input type="text" v-model="formData.company" title="公司名称"/>
                </div>
                <div class="submit">
                    <button @click="submit">确认提交</button>
                </div>
            </div>
        </div>
        <img class="flower-one" src="../assets/images/userInfo/flower1.png"/>
        <img class="flower-two" src="../assets/images/userInfo/flower2.png"/>

        <img class="ring" src="../assets/images/userInfo/ringShadow.png"/>
        <img class="lzl" src="../assets/images/userInfo/lzl.png">
    </div>
</template>

<script>
  import {PopupPicker} from 'vux'

  export default {
    components: {PopupPicker},
    data () {
      return {
        formData: {
          userName: '小米',
          mobile: '13777777777',
          address: '',
          userType: '',
          company: 'XXX有限公司'
        },
        isOldUser: false,
        areaData: {
          list: [{
            name: '广东',
            value: 'gd',
            parent: 0
          }, {
            name: '广西',
            value: 'gx',
            parent: 0
          }, {
            name: '广州',
            value: 'gz',
            parent: 'gd'
          }, {
            name: '深圳',
            value: 'sz',
            parent: 'gd'
          }, {
            name: '广西001',
            value: 'gx001',
            parent: 'gx'
          }, {
            name: '广西002',
            value: 'gx002',
            parent: 'gx'
          }],
          currValue: ['gd', 'gz']
        },
        userTypeData: {
          list: [['地球用户', '火星用户', '金星用户']],
          currValue: ['火星用户']
        }
      }
    },
    created () {
      this.getUserStatus()
    },
    methods: {
      onChange (val) {
        console.log('val:', val)
      },
      /**
       * 提交用户数据
       */
      submit () {
        console.log('submit')
        this.$router.push({path: '/gift'})
      },
      /**
       * 新老用户查询接口
       */
      getUserStatus () {
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
    @import '../assets/styles/pages/userInfo';
</style>
