<template>
  <div id="toTop">
      <img class="go-top"  src='../assets/imgs/ziyuan.png' v-if="btnFlag" @click="backTop">
  </div>
</template>

<script>
export default {
  name: "toTop",
  data() {
    return {
      btnFlag: false,
    };
  },
  components: {
  },
  mounted() {
    window.addEventListener("scroll", this.scrollToTop);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollToTop);
  },
  methods: {
    backTop () {
      const that = this
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
        if (that.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 16)
  },
 
  // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
  scrollToTop () {
    const that = this
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    that.scrollTop = scrollTop
    if (that.scrollTop > 60) {
      that.btnFlag = true
    } else {
      that.btnFlag = false
    }
  }, 
  created() {

  },
  }
};
</script>

<style scoped>

.go-top{
   position: fixed;
   bottom:50px;
   right:30px;
   width:60px;
}
</style>