<template>
    <div class="lottoBear-Contain">
        <!-- region logo标志 -->
        <img class="logo" src="../assets/images/common/logo.png"/>
        <!-- endregion logo标志 -->

        <!-- region 礼物盒 -->
        <div class="gift">
            <img src="../assets/images/lottoBear/giftClose.png" title="小熊玩偶"/>
            <div>
                <label class="gift-text">{{ lotteryName || '您未中奖' }}</label>
            </div>
        </div>
        <!-- endregion 礼物盒 -->

        <!-- region 领取按钮 -->
        <div class="getGift">
            <button @click="showDialog = winning" :disabled="received">{{ buttonText }}</button>
            <img class="ring" src="../assets/images/common/ringLeft.png"/>
        </div>
        <!-- endregion 领取按钮 -->

        <!-- region 中奖弹窗 -->
        <x-dialog v-model="showDialog" :scroll="false" :hide-on-blur="true">
            <div style="margin: 30px auto;color: #999">
                <div style="font-size: 14px">确认领取奖品吗</div>
            </div>
            <div style="border-top: 1px solid #D5D5D6;">
                <span style="float: left;width: 49%;padding:10px 0;font-size: 14px ;color: #39a4b4;border-right: 1px solid #D5D5D6;"
                      @click="getTicket">确定</span>
                <span style="float: right;width: 50%;padding:10px 0;font-size: 14px ;"
                      @click="showDialog=false">取消</span>
            </div>
        </x-dialog>
        <!-- endregion 中奖弹窗 -->
    </div>
</template>

<script>
  import {XDialog} from 'vux'

  export default {
    components: {XDialog},
    data() {
      return {
        audioSrc: '',
        lotteryName: '',
        winning: true,      // 是否中奖
        received: false,    // 是否已领取奖品
        isJoin: false,      // 是否已参与过活动
        showDialog: false,  // 是否显示弹窗
        buttonText: '领取奖品'
      }
    },
    mounted() {
      this.isJoin = this.$route.query.isJoin
      this.initWXBmgPlay()
    },
    created() {
      this.joinActivity()
    },
    methods: {
      /**
       *  解决ios微信无法自动播放
       */
      initWXBmgPlay() {
        let audio = document.querySelector('audio')
        if (audio) {
          if (this.isJoin) {
            audio.load()
            audio.play()
          }
          this.$parent.$data.bgmShow = true
          this.$parent.$data.audioPlay = true
        }
        document.addEventListener('WeixinJSBridgeReady', () => {
          let audio = document.querySelector('audio')
          if (audio) {
            if (this.isJoin) {
              audio.load()
              audio.play()
            }
            this.$parent.$data.bgmShow = true
            this.$parent.$data.audioPlay = true
          }
        }, false)
      },
      /**
       * 背景音乐播放
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
       * 查询中奖信息
       */
      joinActivity() {
        this.$store.dispatch('joinActivity', {
          openId: this.$utils.localStorage.get('openId'),
          activityNo: this.$utils.localStorage.get('activityNo')
        }).then(res => {
          console.log('joinActivity:', res)
          this.winning = res.winning
          this.received = res.received
          if (res.received) {
            this.buttonText = '已领取'
            this.lotteryName = res.prize ? '已获得' + res.prize : ''
          } else {
            this.lotteryName = res.prize ? '获得' + res.prize : ''
          }
        })
      },
      /**
       * 获得奖品
       */
      getTicket() {
        this.$store.dispatch('receiveAward', {
          openId: this.$utils.localStorage.get('openId'),
          activityNo: this.$utils.localStorage.get('activityNo')
        }).then(res => {
          console.log('receiveAward:', res)
          this.showDialog = false
          this.received = true
          this.buttonText = '已领取'
        })
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
    @import '../assets/styles/pages/lottoBear';
</style>
