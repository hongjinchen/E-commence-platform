<!--
 * @Description: 用户注册组件
 -->
<template>
  <div id="register">
    <el-dialog title="Register" width="300px" center :visible.sync="isRegister">
      <el-form
        :model="RegisterUser"
        :rules="rules"
        status-icon
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="name">
          <el-input
            prefix-icon="el-icon-user-solid"
            placeholder="Please enter your account"
            v-model="RegisterUser.name"
          ></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input
            prefix-icon="el-icon-user-solid"
            placeholder="Please enter your email"
            v-model="RegisterUser.email"
          ></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input
            prefix-icon="el-icon-view"
            type="password"
            placeholder="Please enter your password"
            v-model="RegisterUser.pass"
          ></el-input>
        </el-form-item>
        <el-form-item prop="confirmPass">
          <el-input
            prefix-icon="el-icon-view"
            type="password"
            placeholder="Please enter your password again!"
            v-model="RegisterUser.confirmPass"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            size="medium"
            type="primary"
            @click="Register"
            style="width:100%;"
            >Continue to register</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "MyRegister",
  props: ["register"],
  data() {
    // 确认密码的校验方法
    let validateConfirmPass = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("Please confirm password"));
      }
      // 校验是否以密码一致
      if (this.RegisterUser.pass != "" && value === this.RegisterUser.pass) {
        this.$refs.ruleForm.validateField("checkPass");
        return callback();
      } else {
        return callback(new Error("The entered passwords are inconsistent"));
      }
    };
    return {
      isRegister: false, // 控制注册组件是否显示
      RegisterUser: {
        name: "",
        pass: "",
        confirmPass: "",
        email: "",
      },
      // 用户信息校验
      rules: {
        confirmPass: [{ validator: validateConfirmPass, trigger: "blur" }],
      },
    };
  },
  watch: {
    // 监听父组件传过来的register变量，设置this.isRegister的值
    register: function(val) {
      if (val) {
        this.isRegister = val;
      }
    },
    // 监听this.isRegister变量的值，更新父组件register变量的值
    isRegister: function(val) {
      if (!val) {
        this.$refs["ruleForm"].resetFields();
        this.$emit("fromChild", val);
      }
    },
  },
  methods: {
    Register() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.$axios({
            method: "post",
            url: "http://localhost:80/back-end/user.php?action=userRegister",
            data: {
              username: this.RegisterUser.name,
              password: this.RegisterUser.pass,
              email: this.RegisterUser.email,
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
              console.log(res.data)
              // “001”代表注册成功，其他的均为失败
              if (res.data.message === "Operation Success") {
                // 隐藏注册组件
                this.isRegister = false;
                // 弹出通知框提示注册成功信息
                this.notifySucceed(res.data.msg);
              } else {
                // 弹出通知框提示注册失败信息
                this.notifyError(res.data.msg);
              }
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style></style>
