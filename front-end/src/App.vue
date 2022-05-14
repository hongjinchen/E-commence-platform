<!--
 * @Description: 项目根组件
 -->
<template>
  <div id="app" name="app">
    <el-container>
      <!-- 顶部导航栏 -->
      <div class="topbar">
        <div class="nav">
          <ul>
            <li v-if="this.$store.state.islogin">
              Welcome
              <el-popover placement="top" width="180" v-model="visible">
                <p>Are you sure to log out?</p>
                <div style="text-align: right; margin: 10px 0 0">
                  <el-button size="mini" type="text" @click="visible = false"
                    >Cancel</el-button
                  >
                  <el-button type="primary" size="mini" @click="logout"
                    >Continue</el-button
                  >
                </div>
                <el-button type="text" slot="reference">{{
                  this.$store.state.userName
                }}</el-button>
              </el-popover>
            </li>
            <li v-else>
              <el-button type="text" @click="login">Login</el-button>
              <span class="sep">|</span>
              <el-button type="text" @click="register = true"
                >Register</el-button
              >
            </li>

            <li>
              <router-link to="/order">My order</router-link>
            </li>
            <li>
              <router-link to="/collect">My wishlist</router-link>
            </li>
            <li :class="getNum > 0 ? 'shopCart-full' : 'shopCart'">
              <router-link to="/ShoppingCartPage">
                <i style="color:#fff"></i>
                Flower Basket
              </router-link>
            </li>
            <li>
              <img
                v-if="this.$store.state.islogin"
                @click="openMyCenter = true"
                style="height:30px;width:30px"
                src="./assets/imgs/user.png"
              />
            </li>
            <li>
              <img
                v-if="this.$store.state.islogin"
                @click="customerServes = true"
                style="height:30px;width:30px"
                src="./assets/imgs/bussiness-man.png"
              />
            </li>
          </ul>
        </div>
      </div>
      <!-- 顶部导航栏END -->
      <!-- 客服联系 -->
      <el-dialog
        title="Costumer Service"
        :visible.sync="customerServes"
        width="30%"
      >
        <img
          style="height:400px; width:400px;margin:20px"
          src="./assets/imgs/CustomerService.png"
        />
        <div>Please contact customer service through the above QR code!</div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="customerServes = false"
            >OK</el-button
          >
        </span>
      </el-dialog>

      <!-- 用户中心 -->
      <div v-if="this.$store.state.islogin" v-show="openMyCenter">
        <el-dialog
          title="My Center"
          :visible.sync="openMyCenter"
          width="30%"
          center
        >
          <div>
            <div>User name: {{ this.$store.state.userName }}</div>
            <div style="margin-bottom:20px">User email: {{ this.$store.state.userEmail }}</div>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>User address</span>
                <el-button
                  @click="dialogFormVisible = true"
                  style="float: right; padding: 3px 0"
                  type="text"
                  >Add new address</el-button
                >
              </div>
              <div
                v-for="(item, index) in user.order"
                :key="index"
                class="text item"
              >
                <el-card>
                  <el-row>
                    <el-col :span="20"
                      ><div class="grid-content bg-purple">
                        <div>Receiver:  {{ item.receiver }}</div>
                        <div>Phone Number:  {{ item.phoneNumber }}</div>
                        <div>Address:  {{ item.address }}</div>
                      </div></el-col
                    >
                    <el-col :span="4"
                      ><div class="grid-content bg-purple-light">
                        <el-button @click="deletAddress(index)">
                          <img
                            style="height:15px;width:15px"
                            src="./assets/imgs/sami-select.png"
                          />
                        </el-button></div
                    ></el-col>
                  </el-row>
                </el-card>
              </div>
              <div v-if="user.order.length<1">
                There is still no address here,please add it soon
              </div>
            </el-card>
            <el-dialog
              width="30%"
              :visible.sync="dialogFormVisible"
              append-to-body
            >
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="Receiver">
                  <el-input v-model="form.receiver"></el-input>
                </el-form-item>
                <el-form-item label="Phone Number">
                  <el-input v-model="form.phoneNumber"></el-input>
                </el-form-item>
                <el-form-item label="Address">
                  <el-input type="textarea" v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit"
                    >Continue</el-button
                  >
                  <el-button>Cancel</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="openMyCenter = false"
              >Continue</el-button
            >
          </span>
        </el-dialog>
      </div>
      <!-- 用户中心END -->

      <!-- 顶栏容器 -->
      <el-header>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          active-text-color="#ec9d8f"
          router
        >
          <div class="logo">
            <router-link to="/">
              <img
                style="margin-left:15px; width: -webkit-fill-available;height: -webkit-fill-available;"
                src="./assets/imgs/logo.png"
                alt
              />
            </router-link>
          </div>
          <el-menu-item style="font-size:18px" index="/">Home</el-menu-item>
          <!-- <el-menu-item style="font-size:18px" index="/forum"
            >Forum</el-menu-item
          > -->
          <el-menu-item style="font-size:18px" index="/goods"
            >Products</el-menu-item
          >
          <el-menu-item style="font-size:18px" index="/community"
            >Community</el-menu-item
          >
          <el-menu-item style="font-size:18px" index="/about"
            >About Us</el-menu-item
          >
        </el-menu>
      </el-header>
      <!-- 顶栏容器END -->

      <!-- 登录模块 -->
      <MyLogin></MyLogin>
      <!-- 注册模块 -->
      <MyRegister :register="register" @fromChild="isRegister"></MyRegister>

      <!-- 主要区域容器 -->
      <el-main>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-main>
      <!-- 主要区域容器END -->

      <!-- 底栏容器 -->
      <!-- Site footer -->
      <footer class="site-footer">
        <div style="margin-left:200px">
          <el-row :gutter="20">
            <!-- <el-col :span="6"
              ><div class="grid-content bg-purple"></div
            ></el-col> -->
            <el-col :span="12">
              <div>
                <h6>About</h6>
                <p class="text">
                  Put the busy down, bring flowers home.<br />
                  We aims to break down the information barrier between flower
                  bases and customers, creating a B2C platform that can unite
                  multiple bases to bring the best value for money products to
                  the platform users, including untreated fresh cut flowers and
                  finished bouquets.
                </p>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <h6>Categories</h6>
                <ul class="footer-links">
                  <li>
                    <router-link :to="{ path: '/goods' }">
                      All products
                    </router-link>
                  </li>
                  <li>
                    <router-link :to="{ path: '/community' }">
                      View community
                    </router-link>
                  </li>
                </ul>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <h6>Quick Links</h6>
                <ul class="footer-links">
                  <router-link :to="{ path: '/about' }">
                    About Us
                  </router-link>
                </ul>
              </div>
            </el-col>
            <!-- <el-col :span="6"
              ><div class="grid-content bg-purple"></div
            ></el-col> -->
          </el-row>
          <hr />
        </div>
        <el-divider></el-divider>
        <div style="margin-left:200px">
          <el-row :gutter="20">
            <el-col :span="12">
              <div>
                <p class="text">
                  Copyright &copy; 2022 All Rights Reserved by CAN302 Group 35.
                </p>
              </div>
            </el-col>
            <el-col :span="12">
              <div style="padding-right:40px">
                <ul class="social-icons">
                  <li>
                    <a class="facebook" href="#"
                      ><i class="fa fa-facebook"></i
                    ></a>
                  </li>
                  <li>
                    <a class="twitter" href="#"
                      ><i class="fa fa-twitter"></i
                    ></a>
                  </li>
                  <li>
                    <a class="dribbble" href="#"
                      ><i class="fa fa-dribbble"></i
                    ></a>
                  </li>
                  <li>
                    <a class="linkedin" href="#"
                      ><i class="fa fa-linkedin"></i
                    ></a>
                  </li>
                </ul>
              </div>
            </el-col>
          </el-row>
        </div>
      </footer>
      <!-- 底栏容器END -->
    </el-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
export default {
  beforeUpdate() {
    this.activeIndex = this.$route.path;
  },
  data() {
    return {
      user: {
        name: "user",
        email: "12345678901@student.xjtlu.edu.cn",
        telephone: "12345678901",
        order: [
          {
            receiver: "11",
            phoneNumber: "0512-88161000",
            address:
              "No. 111 Renai Road, Suzhou, Jiangsu Province, West University of Liverpool",
          },
          {
            receiver: "22",
            phoneNumber: "0512-88161000",
            address:
              "No. 111 Renai Road, Suzhou, Jiangsu Province, West University of Liverpool",
          },
          {
            receiver: "33",
            phoneNumber: "0512-88161000",
            address:
              "No. 111 Renai Road, Suzhou, Jiangsu Province, West University of Liverpool",
          },
        ],
      },
      dialogFormVisible: false,
      activeIndex: "", // 头部导航栏选中的标签
      search: "", // 搜索条件
      register: false, // 是否显示注册组件
      visible: false, // 是否退出登录
      openMyCenter: false,
      customerServes: false, //联系客服diolog
      form: {
        receiver: "",
        phoneNumber: "",
        address: "",
      },
    };
  },
  components: {},
  created() {
    this.getUserInfo();
    // 获取浏览器localStorage，判断用户是否已经登录
    if (localStorage.getItem("user_id")) {
      // 如果已经登录，设置vuex登录状态
      this.setUser(JSON.parse(localStorage.getItem("userName")));
    }
  },
  computed: {
    ...mapGetters(["getUser", "getNum"]),
  },
  watch: {},
  methods: {
    ...mapActions(["setUser", "setShowLogin", "setShoppingCart"]),
    login() {
      // 点击登录按钮, 通过更改vuex的showLogin值显示登录组件
      this.setShowLogin(true);
    },
    // 退出登录
    logout() {
      this.$axios({
        method: "post",
        url: "/api/back-end/user.php?action=userLogout",
      })
        .then((res) => {
          this.visible = false;
          // 清空本地登录信息
          this.$store.state.userName = "";
          this.$store.state.userEmail = "";
          this.$store.state.user_id = "";
          this.$store.state.islogin = false;
          localStorage.setItem("userName", "");
          localStorage.setItem("user_id", "");
          // 清空vuex登录信息
          this.setUser("");
          this.notifySucceed("Log out successfully");

          console.log(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    // 接收注册子组件传过来的数据
    isRegister(val) {
      this.register = val;
    },
    // 点击搜索按钮
    searchClick() {
      if (this.search != "") {
        // 跳转到全部商品页面,并传递搜索条件
        this.$router.push({ path: "/goods", query: { search: this.search } });
        this.search = "";
      }
    },
    // 获取用户信息
    getUserInfo() {
      console.log(this.$store.state.userName);
      this.user.name = this.$store.state.userName;
      console.log(this.$store.state.userName);
    },
    // 删除地址
    deletAddress(res) {
      var result = [];
      for (var i = 0; i < this.user.order.length; i++) {
        if (i != res) {
          result.push(this.user.order[i]);
        }
      }
      this.user.order = result;
      console.log(result);
      console.log("success!");
    },

    // 新增地址
    onSubmit() {
      this.user.order.push(this.form);
    },
  },
};
</script>

<style>
/* 用户中心CSS */
.text {
  font-size: 14px;
  color: black;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}

/* 全局CSS */
* {
  padding: 0;
  margin: 0;
  border: 0;
  list-style: none;
}
#app .el-header {
  padding: 0;
}
#app .el-main {
  min-height: 300px;
  padding: 20px 0;
}
#app .el-footer {
  padding: 0;
}
a,
a:hover {
  text-decoration: none;
}
/* 全局CSS END */

/* 顶部导航栏CSS */
.topbar {
  height: 40px;
  background-color: #3d3d3d;
  margin-bottom: 20px;
}
.topbar .nav {
  width: 1225px;
  margin: 0 auto;
}
.topbar .nav ul {
  float: right;
}
.topbar .nav li {
  float: left;
  height: 40px;
  color: #b0b0b0;
  font-size: 14px;
  text-align: center;
  line-height: 40px;
  margin-left: 20px;
}
.topbar .nav .sep {
  color: #b0b0b0;
  font-size: 12px;
  margin: 0 5px;
}
.topbar .nav li .el-button {
  color: #b0b0b0;
}
.topbar .nav .el-button:hover {
  color: #fff;
}
.topbar .nav li a {
  color: #b0b0b0;
}
.topbar .nav a:hover {
  color: #fff;
}
.topbar .nav .shopCart {
  width: 120px;
  background: #424242;
}
.topbar .nav .shopCart:hover {
  background: #fff;
}
.topbar .nav .shopCart:hover a {
  color: #ec9d8f;
}
.topbar .nav .shopCart-full {
  width: 120px;
  background: #ec9d8f;
}
.topbar .nav .shopCart-full a {
  color: white;
}
/* 顶部导航栏CSS END */

/* 顶栏容器CSS */
.el-header .el-menu {
  max-width: 1225px;
  margin: 0 auto;
}
.el-header .logo {
  height: 60px;
  width: 189px;
  float: left;
  margin-right: 100px;
}

.el-header .so {
  margin-top: 10px;
  width: 300px;
  float: right;
}
/* 顶栏容器CSS END */

/* 底栏容器CSS */
.site-footer {
  background-color: #ec9d8f;
  padding: 45px 0 20px;
  font-size: 15px;
  line-height: 24px;
  color: #737373;
}
.site-footer hr {
  border-top-color: #bbb;
  opacity: 0.5;
}
.site-footer hr.small {
  margin: 20px 0;
}
.site-footer h6 {
  color: #fff;
  font-size: 16px;
  text-transform: uppercase;
  margin-top: 5px;
  letter-spacing: 2px;
}
.site-footer a {
  color: #737373;
}
.site-footer a:hover {
  color: #3366cc;
  text-decoration: none;
}
.footer-links {
  padding-left: 0;
  list-style: none;
}
.footer-links li {
  display: block;
}
.footer-links a {
  color: #fff;
}
.footer-links a:active,
.footer-links a:focus,
.footer-links a:hover {
  color: #3366cc;
  text-decoration: none;
}
.footer-links.inline li {
  display: inline-block;
}
.site-footer .social-icons {
  text-align: right;
}
.site-footer .social-icons a {
  width: 40px;
  height: 40px;
  line-height: 40px;
  margin-left: 6px;
  margin-right: 0;
  border-radius: 100%;
  background-color: #33353d;
}
.copyright-text {
  margin: 0;
}
@media (max-width: 991px) {
  .site-footer [class^="col-"] {
    margin-bottom: 30px;
  }
}
@media (max-width: 767px) {
  .site-footer {
    padding-bottom: 0;
  }
  .site-footer .copyright-text,
  .site-footer .social-icons {
    text-align: center;
  }
}
.social-icons {
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
}
.social-icons li {
  display: inline-block;
  margin-bottom: 4px;
}
.social-icons li.title {
  margin-right: 15px;
  text-transform: uppercase;
  color: #96a2b2;
  font-weight: 700;
  font-size: 13px;
}
.social-icons a {
  background-color: #eceeef;
  color: #818a91;
  font-size: 16px;
  display: inline-block;
  line-height: 44px;
  width: 44px;
  height: 44px;
  text-align: center;
  margin-right: 8px;
  border-radius: 100%;
  -webkit-transition: all 0.2s linear;
  -o-transition: all 0.2s linear;
  transition: all 0.2s linear;
}
.social-icons a:active,
.social-icons a:focus,
.social-icons a:hover {
  color: #fff;
  background-color: #29aafe;
}
.social-icons.size-sm a {
  line-height: 34px;
  height: 34px;
  width: 34px;
  font-size: 14px;
}
.social-icons a.facebook:hover {
  background-color: #3b5998;
}
.social-icons a.twitter:hover {
  background-color: #00aced;
}
.social-icons a.linkedin:hover {
  background-color: #007bb6;
}
.social-icons a.dribbble:hover {
  background-color: #ea4c89;
}
@media (max-width: 767px) {
  .social-icons li.title {
    display: block;
    margin-right: 0;
    font-weight: 600;
  }
}
.text {
  color: #fff;
}

/* 底栏容器CSS END */

</style>
