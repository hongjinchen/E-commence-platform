/*
 * @Description: 全局变量
 */
exports.install = function (Vue) {
  Vue.prototype.$target = "http://localhost:80"; // 本地后端地址
  // 封装提示成功的弹出框
  Vue.prototype.notifySucceed = function (msg) {
    this.$notify({
      title: "Success",
      message: msg,
      type: "success",
      offset: 100
    });
  };
  // 封装提示失败的弹出框
  Vue.prototype.notifyError = function (msg) {
    this.$notify.error({
      title: "Error",
      message: msg,
      offset: 100
    });
  };
}