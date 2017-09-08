<template>
    <div class="main-Contain">
        <img class="logo" src="../assets/images/common/logo.png"/>
        <div class="slogan"><img src="../assets/images/main/slogan.png"/></div>
        <div class="video">
            <my-video :sources="video.sources" :options="video.options"></my-video>
        </div>
        <img class="flower-one" src="../assets/images/main/flower1.png"/>
        <img class="flower-two" src="../assets/images/main/flower2.png"/>
        <img class="flower-three" src="../assets/images/main/flower3.png"/>
        <img class="ring" src="../assets/images/common/ringRight.png"/>
        <img class="lzl" src="../assets/images/main/lzl.png"/>
        <div class="playGame">
            <button @click="skipUserInfo">参与游戏</button>
        </div>
    </div>
</template>

<script>
  import myVideo from 'vue-video'

  export default {
    components: {myVideo},
    data () {
      return {
        video: {
          sources: [{
            src: '../../static/advertising.mp4',
            type: 'video/mp4'
          }],
          options: {
            autoplay: true,
            volume: 1,
            poster: this.loadingImg
          },
          loadingImg: '../assets/main/videoLoading.png'
        }
      }
    },
    created () {},
    methods: {
      wxInit () {

      },
      /**
       * 跳转到用户信息页面
       */
      skipUserInfo () {
        console.log('skipUserInfo')
        this.$router.push({path: '/userInfo'})
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
    @import '../assets/styles/pages/main';
</style>
