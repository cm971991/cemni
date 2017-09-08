<template>
    <div class="lottoBear-Contain">
        <img class="logo" src="../assets/images/common/logo.png"/>
        <div class="gift">
            <img src="../assets/images/lottoBear/giftClose.png" title="小熊玩偶"/>
            <div>
                <label class="gift-text">小熊玩偶一只</label>
            </div>
        </div>
        <div class="getGift">
            <button @click="getTicket">领取林志玲门票</button>
            <img class="ring" src="../assets/images/common/ringLeft.png"/>
        </div>
    </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    methods: {
      getTicket () {
        this.$router.push({path: '/ticket'})
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
    @import '../assets/styles/pages/lottoBear';
</style>
