<template>
  <div class="shoppingCart">
    <!-- 购物车头部 -->
    <div class="cart-header">
      <div class="cart-header-content">
        <p>
          <i class="el-icon-shopping-cart-full" style="font-weight: 300;"></i>
          Flower Basket
        </p>
      </div>
    </div>
    <!-- 购物车头部END -->

    <!-- 购物车主要内容区 -->
    <div class="content" v-if="shoppingCart.length > 0">
      <ul>
        <!-- 购物车表头 -->
        <li class="header">
          <div class="pro-check">
            <el-checkbox v-model="isAllCheck">Choose all</el-checkbox>
          </div>
          <div class="pro-img"></div>
          <div class="pro-name">Plant product type</div>
          <div class="pro-price">Price</div>
          <div class="pro-num">Size</div>
          <div class="pro-total">Subtotal</div>
          <div class="pro-action">Delet</div>
        </li>
        <!-- 购物车表头END -->

        <!-- 购物车列表 -->
        <li
          class="product-list"
          v-for="(item, index) in shoppingCart"
          :key="item.id"
        >
          <!-- {{item}} -->
          <div class="pro-check">
            <el-checkbox
              :value="item.check"
              @change="checkChange($event, index)"
            ></el-checkbox>
          </div>
          <div class="pro-img">
            <router-link
              :to="{
                path: '/goods/details',
                query: { productID: item.productID },
              }"
            >
              <img :src="$target + item.productImg" />
            </router-link>
          </div>
          <div class="pro-name">
            <router-link
              :to="{
                path: '/goods/details',
                query: { productID: item.productID },
              }"
              >{{ item.productName }}</router-link
            >
          </div>
          <div class="pro-price">{{ item.price }}元</div>
          <div class="pro-num">
            <el-input-number
              size="small"
              :value="item.num"
              @change="handleChange($event, index, item.productID)"
              :min="1"
              :max="item.maxNum"
            ></el-input-number>
          </div>
          <div class="pro-total pro-total-in">
            {{ item.price * item.num }}元
          </div>
          <div class="pro-action">
            <el-popover placement="right">
              <p>确定删除吗？</p>
              <div style="text-align: right; margin: 10px 0 0">
                <el-button
                  type="primary"
                  size="mini"
                  @click="deleteItem($event, item.id, item.productID)"
                  >确定</el-button
                >
              </div>
              <i
                class="el-icon-error"
                slot="reference"
                style="font-size: 18px;"
              ></i>
            </el-popover>
          </div>
        </li>
        <!-- 购物车列表END -->
      </ul>
      <div style="height:20px;background-color: #f5f5f5"></div>
      <!-- 购物车底部导航条 -->
      <div class="cart-bar">
        <div class="cart-bar-left">
          <span>
            <router-link to="/goods">Continuing shopping</router-link>
          </span>
          <span class="sep">|</span>
          <span class="cart-total">
            There are
            <span class="cart-total-num">{{ getNum }}</span> items in cart, you
            have choosed
            <span class="cart-total-num">{{ getCheckNum }}</span> items
          </span>
        </div>
        <div class="cart-bar-right">
          <span>
            <span class="total-price-title">Cart subtotal:</span>
            <span class="total-price">{{ getTotalPrice }}RMB</span>
          </span>
          <router-link :to="getCheckNum > 0 ? '/confirmOrder' : ''">
            <div
              :class="getCheckNum > 0 ? 'btn-primary' : 'btn-primary-disabled'"
            >
              proceed to checkout
            </div>
          </router-link>
        </div>
      </div>
      <!-- 购物车底部导航条END -->
    </div>
    <!-- 购物车主要内容区END -->

    <!-- 购物车为空的时候显示的内容 -->
    <div v-else class="cart-empty">
      <div class="empty">
        <h2>It is empty</h2>
        <p>Why don't we take a look at some other products!</p>
      </div>
    </div>
    <!-- 购物车为空的时候显示的内容END -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      userCharts: [],
      shoppingCart: [],
      shoppingCartDetail: [],
    };
  },
  created() {
    this.getUserChart();
    this.getUserChartDetail();
  },
  methods: {
    ...mapActions([
      "updateShoppingCart",
      "deleteShoppingCart",
      "checkAll",
      "setShoppingCart",
    ]),
    // 修改商品数量的时候调用该函数
    handleChange(currentValue, key, productID) {
      // 当修改数量时，默认勾选
      this.updateShoppingCart({ key: key, prop: "check", val: true });
      // 向后端发起获取购物车的数据库信息请求
      this.$axios({
        method: "post",
        url: "/api/shoppingChart.php?action=getUserCharts",
        data: {
          product_id: productID,
          num: currentValue,
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
          switch (res.data.message) {
            case "Operation Success":
              // 更新vuex状态
              this.updateShoppingCart({
                key: key,
                prop: "num",
                val: currentValue,
              });
              // 提示更新成功信息
              this.notifySucceed(res.data.msg);
              break;
            default:
              // 提示更新失败信息
              this.notifyError(res.data.msg);
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    getDetails(val) {
      this.$axios({
        method: "post",
        url: "/api/back-end/product.php?action=getProductById",
        data: {
          product_id: val,
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
          this.shoppingCartDetail.push(res.data.product_info);
          console.log(this.shoppingCartDetail);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    checkChange(val, key) {
      // 更新vuex中购物车商品是否勾选的状态
      this.updateShoppingCart({ key: key, prop: "check", val: val });
    },
    getUserChart() {
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
          this.userCharts = res.data.charts;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    async getUserChartDetail() {
      // 用户已经登录,获取该用户的购物车信息
      //   await
      for (let i = 0; i < this.userCharts.length; i++) {
        let productInfo = [];
        await this.$axios({
          method: "post",
          url: "/api/back-end/product.php?action=getProductById",
          data: {
            product_id: this.userCharts[i].product_id,
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
            productInfo = res.data.product_info;
            console.log(this.userCharts);
            let newItem = {
              id: this.userCharts[i].id,
              productID: this.userCharts[i].product_id,
              productName: productInfo.product_name,
              productImg: productInfo.product_picture,
              price: productInfo.product_price,
              num: this.userCharts[i].num,
              maxNum: productInfo.product_num,
              check: false,
            };
            this.shoppingCart.push(newItem);
            console.log(this.shoppingCart);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      if (this.shoppingCart.length > 0) {
        this.setShoppingCart(this.shoppingCart);
        console.log("the value of setShoppingCart");
        console.log(this.getShoppingCart);
        console.log(this.getCheckNum);
        console.log(this.getTotalPrice);
      }
    },
  },
  computed: {
    ...mapGetters([
      "getShoppingCart",
      "getCheckNum",
      "getTotalPrice",
      "getNum",
    ]),
    isAllCheck: {
      get() {
        return this.$store.getters.getIsAllCheck;
      },
      set(val) {
        this.checkAll(val);
      },
    },
  },
};
</script>
<style scoped>
.shoppingCart {
  background-color: #f5f5f5;
  padding-bottom: 20px;
}
/* 购物车头部CSS */
.shoppingCart .cart-header {
  height: 64px;
  border-bottom: 2px solid #ec9d8f;
  background-color: #fff;
  margin-bottom: 20px;
}
.shoppingCart .cart-header .cart-header-content {
  width: 1225px;
  margin: 0 auto;
}
.shoppingCart .cart-header p {
  font-size: 25px;
  line-height: 58px;
  float: left;
  font-weight: normal;
  color: #424242;
}
.shoppingCart .cart-header span {
  color: #757575;
  font-size: 12px;
  float: left;
  height: 20px;
  line-height: 20px;
  margin-top: 30px;
  margin-left: 15px;
}
/* 购物车头部CSS END */

/* 购物车主要内容区CSS */
.shoppingCart .content {
  width: 1225px;
  margin: 0 auto;
  background-color: #fff;
}

.shoppingCart .content ul {
  background-color: #fff;
  color: #424242;
  line-height: 85px;
}
/* 购物车表头及CSS */
.shoppingCart .content ul .header {
  height: 85px;
  padding-right: 26px;
  color: #424242;
}
.shoppingCart .content ul .product-list {
  height: 85px;
  padding: 15px 26px 15px 0;
  border-top: 1px solid #e0e0e0;
}
.shoppingCart .content ul .pro-check {
  float: left;
  height: 85px;
  width: 110px;
}
.shoppingCart .content ul .pro-check .el-checkbox {
  font-size: 16px;
  margin-left: 24px;
}
.shoppingCart .content ul .pro-img {
  float: left;
  height: 85px;
  width: 120px;
}
.shoppingCart .content ul .pro-img img {
  height: 80px;
  width: 80px;
}
.shoppingCart .content ul .pro-name {
  float: left;
  width: 380px;
}
.shoppingCart .content ul .pro-name a {
  color: #424242;
  font-size: 14px;
}
.shoppingCart .content ul .pro-name a:hover {
  color: #ec9d8f;
}
.shoppingCart .content ul .pro-price {
  float: left;
  width: 140px;
  padding-right: 18px;
  text-align: center;
}
.shoppingCart .content ul .pro-num {
  float: left;
  width: 150px;
  text-align: center;
}
.shoppingCart .content ul .pro-total {
  float: left;
  width: 120px;
  padding-right: 81px;
  text-align: right;
}
.shoppingCart .content ul .pro-total-in {
  color: #ec9d8f;
}
.shoppingCart .content ul .pro-action {
  float: left;
  width: 80px;
  text-align: center;
}
.shoppingCart .content ul .pro-action i:hover {
  color: #ec9d8f;
}
/* 购物车表头及CSS END */

/* 购物车底部导航条CSS */
.shoppingCart .cart-bar {
  width: 1225px;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
}
.shoppingCart .cart-bar .cart-bar-left {
  float: left;
}
.shoppingCart .cart-bar .cart-bar-left a {
  line-height: 50px;
  margin-left: 32px;
  color: #757575;
}
.shoppingCart .cart-bar .cart-bar-left a:hover {
  color: #ec9d8f;
}
.shoppingCart .cart-bar .cart-bar-left .sep {
  color: #eee;
  margin: 0 20px;
}
.shoppingCart .cart-bar .cart-bar-left .cart-total {
  color: #757575;
}
.shoppingCart .cart-bar .cart-bar-left .cart-total-num {
  color: #ec9d8f;
}
.shoppingCart .cart-bar .cart-bar-right {
  float: right;
}
.shoppingCart .cart-bar .cart-bar-right .total-price-title {
  color: #ec9d8f;
  font-size: 14px;
}
.shoppingCart .cart-bar .cart-bar-right .total-price {
  color: #ec9d8f;
  font-size: 30px;
}
.shoppingCart .cart-bar .cart-bar-right .btn-primary {
  float: right;
  width: 200px;
  text-align: center;
  font-size: 18px;
  margin-left: 50px;
  background: #ec9d8f;
  color: #fff;
}
.shoppingCart .cart-bar .cart-bar-right .btn-primary-disabled {
  float: right;
  width: 200px;
  text-align: center;
  font-size: 18px;
  margin-left: 50px;
  background: #e0e0e0;
  color: #b0b0b0;
}
.shoppingCart .cart-bar .cart-bar-right .btn-primary:hover {
  background-color: #f25807;
}
/* 购物车底部导航条CSS END */
/* 购物车主要内容区CSS END */

/* 购物车为空的时候显示的内容CSS */
.shoppingCart .cart-empty {
  width: 1225px;
  margin: 0 auto;
}
.shoppingCart .cart-empty .empty {
  height: 300px;
  padding: 0 0 130px 558px;
  margin: 65px 0 0;
  background: url(../assets/imgs/cart-empty.svg) no-repeat 124px 0;
  color: #b0b0b0;
  overflow: hidden;
}
.shoppingCart .cart-empty .empty h2 {
  margin: 70px 0 15px;
  font-size: 36px;
}
.shoppingCart .cart-empty .empty p {
  margin: 0 0 20px;
  font-size: 20px;
}
/* 购物车为空的时候显示的内容CSS END */
</style>
