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
import { mapGetters } from "vuex";
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
    ...mapGetters([
      "getShoppingCart"
    ]),
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
      let fd = new FormData();
      fd.append("username", this.LoginUser.name);
      fd.append("password", this.LoginUser.pass);

      let u = this.LoginUser.name === "admin" ? "/api/back-end/user.php?action=adminLogin" : "/api/back-end/user.php?action=userLogin";

      this.$axios({
        method: "post",
        url: u,
        data: {
          username: this.LoginUser.name,
          password: this.LoginUser.pass,
        },
        transformRequest: [
          function(data) {
            // 将{username:111,password:111} 转成 username=111&password=111
            var ret = "";
            for (var it in data) {
              // 如果要发送中文 编码
              ret +=
                encodeURIComponent(it) +
                "=" +
                encodeURIComponent(data[it]) +
                "&";
            }
            return ret.substring(0, ret.length - 1);
          },
        ],
      })
        .then((res) => {
          if (res.data.message == "Operation Success") {
            this.isLogin = false;
            // 登录信息存到本地
            this.$store.state.userName = this.LoginUser.name;
            this.$store.state.userEmail = res.data.login_user.userEmail;
            this.$store.state.user_id = res.data.login_user.user_id;
            // 改变登陆状态
            this.$store.state.islogin = true;
            let user_id = res.data.user_id;
            localStorage.setItem("userName", this.LoginUser.name);
            localStorage.setItem("user_id", user_id);
            console.log(this.$store.state.userName);
            console.log(this.$store.state.user_id);
            // 登录信息存到vuex
            this.setUser(this.LoginUser.name);
            // 获取用户购物车
            this.getUserChart();
            // 弹出通知框提示登录成功信息
            this.notifySucceed("success!");
            console.log(res.data);
          } else {
            this.notifySucceed("Please try again!");
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    getUserChart() {
      // 用户已经登录,获取该用户的购物车信息
      this.$axios({
        method: "post",
        url: "/api/back-end/shoppingChart.php?action=getUserCharts",
        data: {
          user_id: this.$store.state.user_id,
        },
        transformRequest: [
          function(data) {
            // 将{username:111,password:111} 转成 username=111&password=111
            var ret = "";
            for (var it in data) {
              // 如果要发送中文 编码
              ret +=
                encodeURIComponent(it) +
                "=" +
                encodeURIComponent(data[it]) +
                "&";
            }
            return ret.substring(0, ret.length - 1);
          },
        ],
      })
        .then((res) => {
          if (res.data.message === "Operation Success") {
            //成功, 更新vuex购物车状态
                      this.isLogin = false;

          // 登录信息存到本地
          if(this.LoginUser.name === "admin"){
            this.$store.state.userName = this.LoginUser.name;
            this.$store.state.userEmail= "1"
            this.$store.state.user_id= "1"
          }
          else{
            this.$store.state.userName = this.LoginUser.name;
            this.$store.state.userEmail= res.data.login_user.userEmail
            this.$store.state.user_id=res.data.login_user.user_id
          }
                    if(this.LoginUser.name === "admin"){
            this.$router.push("/admin");
                      // 改变登陆状态
          this.$store.state.islogin = true;
          let user_id = res.data.user_id;
          localStorage.setItem("userName", this.LoginUser.name);
          localStorage.setItem("user_id", user_id);
          console.log(this.$store.state.userName);
          console.log( this.$store.state.user_id);
          // 登录信息存到vuex
          this.setUser(this.LoginUser.name);
          // 弹出通知框提示登录成功信息
          this.notifySucceed("success!");
          console.log(res.data);
            this.setShoppingCart(res.data.shoppingCartData);
            console.log("the chart info");
            console.log(res.data);
            console.log(this.getShoppingCart);
          } else {
            // 提示失败信息
            this.notifyError(res.data.msg);
          }
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        });

    },
  },
};
</script>
<style></style>
