<template>
    <div class="main-Contain">
        <!-- region logo标志 -->
        <img class="logo" src="../assets/images/common/logo.png"/>
        <!-- endregion logo标志 -->

        <!-- region 标语 -->
        <div class="slogan"><img src="../assets/images/main/slogan.png"/></div>
        <!-- endregion 标语 -->

        <!-- region 视频 -->
        <div class="video">
            <video id="video" controls="controls" preload="auto" playsinline="true" webkit-playsinline="true"
                   autoplay="autoplay" x5-video-player-fullscreen=”true”            style="object-fit: fill;"
                   src="../../static/advertising.mp4"
                   poster="../../static/videoLoading.png"
                   type="video/mp4"></video>
        </div>
        <!-- endregion 视频 -->

        <!-- region 浮动图片元素 -->
        <img class="flower-one" src="../assets/images/main/flower1.png"/>
        <img class="flower-two" src="../assets/images/main/flower2.png"/>
        <img class="flower-three" src="../assets/images/main/flower3.png"/>
        <img class="ring" src="../assets/images/common/ringRight.png"/>
        <img class="lzl" src="../assets/images/main/lzl.png"/>
        <!-- endregion 浮动图片元素 -->

        <!-- region 参与游戏按钮 -->
        <div class="playGame" @click="skipUserInfo">
            <button>参与游戏</button>
        </div>
        <!-- endregion 参与游戏按钮 -->
    </div>
</template>

<script>
  export default {
    data() {
      return {
        isJoin: false   // 是否已参与过活动
      }
    },
    created() {
      this.initUrlParams()
      this.initActivity()
    },
    mounted() {
      this.initWXBmgPlay()
      this.videoPlay()
    },
    methods: {
      /**
       *  解决ios微信无法自动播放
       */
      initWXBmgPlay() {
        let audio = document.querySelector('audio')
        if (audio) {
          audio.pause()
          this.$parent.$data.bgmShow = false
          this.$parent.$data.audioPlay = false
        }
        document.addEventListener('WeixinJSBridgeReady', () => {
          let audio = document.querySelector('audio')
          if (audio) {
            audio.pause()
            this.$parent.$data.bgmShow = false
            this.$parent.$data.audioPlay = false
          }
        }, false)
      },
      videoPlay() {
        document.addEventListener('WeixinJSBridgeReady', () => {
          let video = document.querySelector('#video')
          if (video !== null) {
            video.play()
          }
        }, false)
      },
      /**
       * 初始化url参数
       */
      initUrlParams() {
        let openId = this.$utils.Common.getParam('openId')
        let activityNo = this.$utils.Common.getParam('activityNo')
        this.$utils.localStorage.set('openId', openId)
        this.$utils.localStorage.set('activityNo', activityNo)
      },
      initActivity() {
        this.$store.dispatch('queryJoinActivity', {openId: this.$utils.localStorage.get('openId')}).then(res => {
          console.log('queryJoinActivity:', res)
          this.isJoin = res.join
        })
      },
      /**
       * 跳转到用户信息页面
       */
      skipUserInfo() {
        if (this.isJoin) {
          this.$router.push({path: '/gift', query: {isJoin: this.isJoin}})
        } else {
          this.$router.push({path: '/userInfo'})
        }
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
    @import '../assets/styles/pages/main';
</style>
