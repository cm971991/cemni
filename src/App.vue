<template>
    <div id="cenmniapp">
        <div class="bmg" v-show="bgmShow">
            <audio loop="loop">
            </audio>
            <img class="bmg-start animated infinite rotate" src="../static/bmg.png" v-show="audioPlay"
                 @click="bmgPlay"/>
            <img class="bmg-stop" src="../static/bmgStop.png" v-show="!audioPlay" @click="bmgPlay"/>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
  export default {
    name: 'cenmniapp',
    data () {
      return {
        bgmShow: false,
        audioSrc: '',
        audioPlay: false
      }
    },
    mounted () {
      this.initWXBmgPlay()
    },
    methods: {
      /**
       *  解决ios微信无法自动播放
       */
      initWXBmgPlay () {
        let audio = document.querySelector('audio')
        let source = document.createElement('source')
        source.src = '../static/bgm.mp3'
        audio.appendChild(source)
        document.addEventListener('WeixinJSBridgeReady', () => {
          let audio = document.querySelector('audio')
          if (audio) {
            audio.load()
            audio.pause()
          }
        }, false)
      },
      /**
       * 背景音乐播放、暂停
       */
      bmgPlay () {
        this.audioPlay = !this.audioPlay
        let audio = document.querySelector('audio')
        if (audio !== null) {
          if (audio.paused) {
            audio.play()
          } else {
            audio.pause()
          }
        }
      }
    }
  }
</script>

<style lang="less">
    @import '~vux/src/styles/reset.less';
    @import '~vux/src/styles/1px.less';
    @import "./assets/styles/global/constom";
    @import "./assets/styles/global/common";
    @import "./assets/styles/global/icon.css";


    #cenmniapp {
        height: 100%;
        .bmg {
            width: 58nopx;
            height: 58nopx;
            position: fixed;
            right: 30nopx;
            top: 30nopx;
            z-index: 1;
            .bmg-start {
                width: 58nopx;
                height: 58nopx;
                animation: 3s linear infinite CDturn;
            }
            .bmg-stop {
                width: 58nopx;
                height: 58nopx;
            }
            @keyframes CDturn {
                from {
                    transform: rotate(0deg)
                }
                to {
                    transform: rotate(360deg)
                }
            }
        }
    }
</style>
