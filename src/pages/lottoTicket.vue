<template>
    <div class="lottoTicket-contain">
        <img class="logo" src="../assets/images/common/logo.png"/>
        <div class="jackpot">
            <div class="title"><label>开奖倒计时 : </label></div>
            <div class="count-down">
                <flexbox>
                    <flexbox-item>
                        <div class="count-down-item">
                            <div>{{ countDownData.hours ? countDownData.hours.first : 0 }}</div>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="count-down-item">
                            <div>{{ countDownData.hours ? countDownData.hours.second : 0 }}</div>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="count-down-item-img">
                            <div><img src="../assets/images/lottoTickets/dot.png"/></div>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="count-down-item">
                            <div>{{ countDownData.minutes ? countDownData.minutes.first : 0 }}</div>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="count-down-item">
                            <div>{{ countDownData.minutes ? countDownData.minutes.second : 0 }}</div>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="count-down-item-img">
                            <div><img src="../assets/images/lottoTickets/dot.png"/></div>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="count-down-item">
                            <div>{{ countDownData.seconds ? countDownData.seconds.first : 0 }}</div>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="count-down-item">
                            <div>{{ countDownData.seconds ? countDownData.seconds.second : 0 }}</div>
                        </div>
                    </flexbox-item>
                </flexbox>
            </div>
            <div class="lotto-userInfo">
                <div>
                    <h4>中奖用户信息</h4>
                    <div class="lotto-userInfo-contain">
                        <template v-for="(item , index) in lottoUserList">
                            <flexbox align="center">
                                <flexbox-item :span="1/3">
                                    <div>{{ item.name }}</div>
                                </flexbox-item>
                                <flexbox-item :span="2/3">
                                    <div>{{ item.mobile }}</div>
                                </flexbox-item>
                            </flexbox>
                        </template>
                    </div>
                </div>
            </div>
            <div class="wait-userInfo">
                <div>
                    <h4>待抽奖用户资料池</h4>
                    <div class="wait-userInfo-contain">
                        <template v-for="(item , index) in waitUserList">
                            <flexbox align="center">
                                <flexbox-item :span="1/3">
                                    <img :src="item.head">
                                </flexbox-item>
                                <flexbox-item :span="2/3">
                                    <div>{{ item.mobile }}</div>
                                </flexbox-item>
                            </flexbox>
                        </template>
                    </div>
                </div>
            </div>
            <div class="btn">
                <button @click="getTicket">领取林志玲门票</button>
            </div>
            <img class="ring" src="../assets/images/common/ringLeft.png"/>
        </div>
    </div>
</template>

<script>
  import {Flexbox, FlexboxItem} from 'vux'

  export default {
    components: {
      Flexbox, FlexboxItem
    },
    data () {
      return {
        countDownData: {},
        lottoUserList: [
          {name: 'xxx', mobile: '13776626715'},
          {name: 'vvv', mobile: '13776626715'},
          {name: 'ccc', mobile: '13776626715'}],
        waitUserList: [
          {head: 'http://wo.iuni.com.cn/iProbe/Content/img/adminHead.jpg', mobile: '13855555554'},
          {head: 'http://wo.iuni.com.cn/iProbe/Content/img/adminHead.jpg', mobile: '13855555554'},
          {head: 'http://wo.iuni.com.cn/iProbe/Content/img/adminHead.jpg', mobile: '13855555554'},
          {head: 'http://wo.iuni.com.cn/iProbe/Content/img/adminHead.jpg', mobile: '13866666664'}
        ]
      }
    },
    mounted () {
      this.countDown()
    },
    methods: {
      getTicket () {
        this.$vux.alert.show({content: '遗憾，您未中奖'})
      },
      /**
       * 获取倒计时
       */
      countDown () {
        let vm = this
        let tc = setInterval(() => {
          let nowTime = vm.$utils.Date.format(new Date())
          let endTime = ''
          if (vm.$utils.Date.format(new Date(), 'hh') > 12) {
            let end = new Date()
            end.setDate(end.getDate() + 1)
            endTime = vm.$utils.Date.format(end).split(' ')[0] + ' 12:00:00'
          } else {
            endTime = nowTime.split(' ')[0] + ' 12:00:00'
          }
          vm.countDownData = vm.$utils.Date.getDifferenceHour(nowTime, endTime)
          console.log('this.countDownData:', vm.countDownData)
          if (vm.countDownData.hours.end && vm.countDownData.minutes.end && vm.countDownData.seconds.end) {
            clearInterval(tc)
          }
        }, 1000)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
    @import '../assets/styles/pages/lottoTicket';
</style>
