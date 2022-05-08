<!--
 * @Description: 登录组件
 -->
<template>
  <div id="myLogin">
    <el-dialog title="Login" width="300px" center :visible.sync="isLogin">
      <el-form status-icon ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="name">
          <el-input
            prefix-icon="el-icon-user-solid"
            placeholder="Please enter your user name"
            v-model="LoginUser.name"
          ></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input
            prefix-icon="el-icon-view"
            type="password"
            placeholder="Please enter your password"
            v-model="LoginUser.pass"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            size="medium"
            type="primary"
            @click="Login"
            style="width:100%;"
            >Continue</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "MyLogin",
  data() {
    // 用户名的校验方法
    return {
      LoginUser: {
        name: "",
        pass: "",
      },
    };
  },

  computed: {
    // 获取vuex中的showLogin，控制登录组件是否显示
    isLogin: {
      get() {
        return this.$store.getters.getShowLogin;
      },
      set(val) {
        this.$refs["ruleForm"].resetFields();
        this.setShowLogin(val);
      },
    },
  },
  
  methods: {
    ...mapActions(["setUser", "setShowLogin"]),
    Login() {
      // 隐藏登录组件
      this.isLogin = false;
      // 登录信息存到本地
      this.$store.state.userName = this.LoginUser.name;
      this.$store.state.islogin = true;
      let user_id="11111";
      localStorage.setItem("userName", this.LoginUser.name);
      localStorage.setItem("user_id", user_id);
      console.log(this.LoginUser);
      console.log(this.$store.state.userName);
      console.log(this.$store.state.islogin);
      // 登录信息存到vuex
      this.setUser(this.LoginUser.name);
      // 弹出通知框提示登录成功信息
      this.notifySucceed("success!");

      // this.$refs["ruleForm"].validate(valid => {

      //   if (valid) {
      // this.$axios({
      //   method: "post",
      //   url: "http://localhost:80/back-end/user.php?action=userLogin",
      //   data: {
      //     userName: this.LoginUser.name,
      //     password: this.LoginUser.pass,
      //   },
      //   transformRequest: [
      //     function(data) {
      //       // 将{username:111,password:111} 转成 username=111&password=111
      //       var ret = "";
      //       for (var it in data) {
      //         // 如果要发送中文 编码
      //         ret +=
      //           encodeURIComponent(it) +
      //           "=" +
      //           encodeURIComponent(data[it]) +
      //           "&";
      //       }
      //       return ret.substring(0, ret.length - 1);
      //     },
      //   ],

      //   // this.$axios
      //   //   .post("http://localhost:80/user.php?action=userLogin", {
      //   //     userName: this.LoginUser.name,
      //   //     password: this.LoginUser.pass
      //   //   })

      // })
      //   .then((res) => {
      //     // “001”代表登录成功，其他的均为失败
      //     if (res.message === "Operation Success") {
      //       // 隐藏登录组件
      //       this.isLogin = false;
      //       // 登录信息存到本地
      //       let user = JSON.stringify(res.users);
      //       localStorage.setItem("user", user);
      //       // 登录信息存到vuex
      //       this.setUser(res.data.user);
      //       // 弹出通知框提示登录成功信息
      //       this.notifySucceed(res.data.msg);
      //     } else {
      //       // 清空输入框的校验状态
      //       // this.$refs["ruleForm"].resetFields();
      //       // 弹出通知框提示登录失败信息
      //       this.notifyError(res.data.msg);
      //     }
      //   })
      //   .catch((err) => {
      //     return Promise.reject(err);
      //   });
    },
  },
};
</script>
<style></style>
