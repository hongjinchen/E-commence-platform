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
          <!-- <div class="pro-check">
            <el-checkbox v-model="isAllCheck">Choose all</el-checkbox>
          </div> -->
          <div class="pro-img"></div>
          <div class="name">Plant product type</div>
          <div class="pro-price">Price</div>
          <div class="pro-num">Size</div>
          <div class="pro-total">Subtotal</div>
          <div class="pro-action">Delete</div>
        </li>
        <!-- 购物车表头END -->

        <!-- 购物车列表 -->
        <li class="product-list" v-for="item in shoppingCart" :key="item.id">
          <div class="pro-check"></div>
          <div class="pro-img">
            <router-link
              :to="{
                path: '/goods/details',
                query: { productID: item.productID },
              }"
            >
              <img :src="item.productImg" />
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
              v-model="item.num"
              :min="1"
            ></el-input-number>
          </div>
          <div class="pro-total pro-total-in">
            {{ item.price * item.num }}RMB
          </div>
          <div class="pro-action">
            <el-popover placement="right">
              <p>Are you sure?</p>
              <div style="text-align: right; margin: 10px 0 0">
                <el-button
                  type="primary"
                  size="mini"
                  @click="deleteItem(item.id, item.productID)"
                  >Continue</el-button
                >
              </div>
              <i
                class="el-icon-error"
                slot="reference"
                style="font-size: 18px;"
              ></i>
            </el-popover>
          </div>
          <div>
            <el-button @click="centerDialogVisible = true">
              Purchase
            </el-button>

            <!-- 下订单页面 -->
            <el-dialog :visible.sync="centerDialogVisible" width="80%" center>
              <div class="confirmOrder">
                <!-- 头部 -->
                <div class="confirmOrder-header">
                  <div class="header-content">
                    <p>
                      <i
                        @click="centerDialogVisible = false"
                        class="el-icon-s-order"
                      ></i>
                    </p>
                    <p>Confirm an order</p>
                    <router-link to></router-link>
                  </div>
                </div>
                <!-- 头部END -->

                <!-- 主要内容容器 -->
                <div class="content">
                  <!-- 商品及优惠券 -->
                  <div class="section-goods">
                    <p class="title">Goods</p>
                    <div class="goods-list">
                      <ul>
                        <img
                          style="height:150px;width:150px"
                          :src="item.productImg"
                        />
                        <span class="pro-name">{{ item.productName }}</span>
                        <span class="pro-price"
                          >{{ item.price }}RMB x {{ item.num }}</span
                        >
                        <span class="pro-status"></span>
                        <span class="pro-total"
                          >{{ item.price * item.num }}RMB</span
                        >
                      </ul>
                    </div>
                  </div>
                  <!-- 商品END -->

                  <!-- 结算列表 -->
                  <div class="section-count">
                    <div class="money-box">
                      <ul>
                        <li>
                          <span class="title">Freight charge: </span>
                          <span class="value">0RMB</span>
                        </li>
                        <li class="total">
                          <span class="title">Amount:</span>
                          <span class="value">
                            <span class="total-price">{{
                              item.price * item.num
                            }}</span
                            >RMB
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <!-- 结算列表END -->

                  <!-- 结算导航 -->
                  <div class="section-bar">
                    <div class="btn">
                      <router-link
                        @click="centerDialogVisible = false"
                        class="btn-base btn-return"
                        >Return</router-link
                      >
                      <a
                        href="javascript:void(0);"
                        class="btn-base btn-primary"
                        @click="
                          (centerDialogVisible = false),
                            purchaseGood(item.productID, item.num, item.price)
                        "
                        >Comfirm</a
                      >
                    </div>
                  </div>
                  <!-- 结算导航END -->
                </div>
                <!-- 主要内容容器END -->
              </div>
            </el-dialog>
            <!-- 下订单页面END -->
          </div>
        </li>
        <!-- 购物车列表END -->
      </ul>
      <div style="height:20px;background-color: #f5f5f5"></div>
      <!-- 购物车底部导航条 -->
      <div class="cart-bar">
        <div class="cart-bar-left">
          <router-link to="/goods">
            <el-button>Continuing shopping </el-button></router-link
          >
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
      // 购买页面是否出现
      centerDialogVisible: false,
    };
  },
  created() {
    this.getUserChartDetail();
  },
  activated() {
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
      // 向后端发起获取购物车的数据库信息请求
      this.$axios({
        method: "post",
        url: "/api/back-end/shoppingChart.php?action=getUserCharts",
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
          if (res.data.message == "Operation Success") {
            this.notifySucceed("Item quantity changed successfully");
            this.$router.go(0);
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
    getUserChartDetail() {
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
          this.userCharts = [];
          this.shoppingCart = [];
          this.shoppingCartDetail = [];
          this.userCharts = res.data.charts;
        })
        .catch((err) => {
          return Promise.reject(err);
        });

      for (let i = 0; i < this.userCharts.length; i++) {
        let productInfo = [];
        this.$axios({
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
    //  <el-button @click="purchaseGood(item.productID,item.num,item.price)">
    purchaseGood(productID, num, price) {
      let shipping_info = " ";
      let payment_info = " ";
      this.$axios({
        method: "post",
        url: "/api/back-end/order.php?action=createOrder",
        data: {
          user_id: this.$store.state.user_id,
          product_id: productID,
          product_num: num,
          product_price: price,
          shipping_info: shipping_info,
          payment_info: payment_info,
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
            this.notifySucceed("success!");
          } else {
            this.notifySucceed(res.data.message);
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    deleteItem(id, productID) {
      this.$axios({
        method: "post",
        url: "/api/back-end/shoppingChart.php?action=deleteChart",
        data: {
          id: productID,
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
            this.notifySucceed("Item deleted successfully");
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
  },
  computed: {
    ...mapGetters([
      "getShoppingCart",
      "getCheckNum",
      "getTotalPrice",
      "getNum",
    ]),
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
  width: 200px;
}
.shoppingCart .content ul .name {
  float: left;
  width: 310px;
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

.confirmOrder {
  background-color: #f5f5f5;
  padding-bottom: 20px;
}
/* 头部CSS */
.confirmOrder .confirmOrder-header {
  background-color: #fff;
  border-bottom: 2px solid #ec9d8f;
  margin-bottom: 20px;
}
.confirmOrder .confirmOrder-header .header-content {
  width: 1225px;
  margin: 0 auto;
  height: 80px;
}
.confirmOrder .confirmOrder-header .header-content p {
  float: left;
  font-size: 28px;
  line-height: 80px;
  color: #424242;
  margin-right: 20px;
}
.confirmOrder .confirmOrder-header .header-content p i {
  font-size: 45px;
  color: #ec9d8f;
  line-height: 80px;
}
/* 头部CSS END */

/* 主要内容容器CSS */
.confirmOrder .content {
  width: 1225px;
  margin: 0 auto;
  padding: 48px 0 0;
  background-color: #fff;
}

/* 选择地址CSS */
.confirmOrder .content .section-address {
  margin: 0 48px;
  overflow: hidden;
}
.confirmOrder .content .section-address .title {
  color: #333;
  font-size: 18px;
  line-height: 20px;
  margin-bottom: 20px;
}
.confirmOrder .content .address-body li {
  float: left;
  color: #333;
  width: 220px;
  height: 178px;
  border: 1px solid #e0e0e0;
  padding: 15px 24px 0;
  margin-right: 17px;
  margin-bottom: 24px;
}
.confirmOrder .content .address-body .in-section {
  border: 1px solid #ec9d8f;
}
.confirmOrder .content .address-body li h2 {
  font-size: 18px;
  font-weight: normal;
  line-height: 30px;
  margin-bottom: 10px;
}
.confirmOrder .content .address-body li p {
  font-size: 14px;
  color: #757575;
}
.confirmOrder .content .address-body li .address {
  padding: 10px 0;
  max-width: 180px;
  max-height: 88px;
  line-height: 22px;
  overflow: hidden;
}
.confirmOrder .content .address-body .add-address {
  text-align: center;
  line-height: 30px;
}
.confirmOrder .content .address-body .add-address i {
  font-size: 30px;
  padding-top: 50px;
  text-align: center;
}
/* 选择地址CSS END */

/* 商品及优惠券CSS */
.confirmOrder .content .section-goods {
  margin: 0 48px;
}
.confirmOrder .content .section-goods p.title {
  color: #333;
  font-size: 18px;
  line-height: 40px;
}
.confirmOrder .content .section-goods .goods-list {
  padding: 5px 0;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
}
.confirmOrder .content .section-goods .goods-list li {
  padding: 10px 0;
  color: #424242;
  overflow: hidden;
}
.confirmOrder .content .section-goods .goods-list li img {
  float: left;
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
.confirmOrder .content .section-goods .goods-list li .pro-name {
  float: left;
  width: 650px;
  line-height: 30px;
}
.confirmOrder .content .section-goods .goods-list li .pro-price {
  float: left;
  width: 150px;
  text-align: center;
  line-height: 30px;
}
.confirmOrder .content .section-goods .goods-list li .pro-status {
  float: left;
  width: 99px;
  height: 30px;
  text-align: center;
  line-height: 30px;
}
.confirmOrder .content .section-goods .goods-list li .pro-total {
  float: left;
  width: 190px;
  text-align: center;
  color: #ec9d8f;
  line-height: 30px;
}
/* 商品及优惠券CSS END */

/* 配送方式CSS */
.confirmOrder .content .section-shipment {
  margin: 0 48px;
  padding: 25px 0;
  border-bottom: 1px solid #e0e0e0;
  overflow: hidden;
}
.confirmOrder .content .section-shipment .title {
  float: left;
  width: 150px;
  color: #333;
  font-size: 18px;
  line-height: 38px;
}
.confirmOrder .content .section-shipment .shipment {
  float: left;
  line-height: 38px;
  font-size: 14px;
  color: #ec9d8f;
}
/* 配送方式CSS END */

/* 发票CSS */
.confirmOrder .content .section-invoice {
  margin: 0 48px;
  padding: 25px 0;
  border-bottom: 1px solid #e0e0e0;
  overflow: hidden;
}
.confirmOrder .content .section-invoice .title {
  float: left;
  width: 150px;
  color: #333;
  font-size: 18px;
  line-height: 38px;
}
.confirmOrder .content .section-invoice .invoice {
  float: left;
  line-height: 38px;
  font-size: 14px;
  margin-right: 20px;
  color: #ec9d8f;
}
/* 发票CSS END */

/* 结算列表CSS */
.confirmOrder .content .section-count {
  margin: 0 48px;
  padding: 20px 0;
  overflow: hidden;
}
.confirmOrder .content .section-count .money-box {
  float: right;
  text-align: right;
}
.confirmOrder .content .section-count .money-box .title {
  float: left;
  width: 126px;
  height: 30px;
  display: block;
  line-height: 30px;
  color: #757575;
}
.confirmOrder .content .section-count .money-box .value {
  float: left;
  min-width: 105px;
  height: 30px;
  display: block;
  line-height: 30px;
  color: #ec9d8f;
}
.confirmOrder .content .section-count .money-box .total .title {
  padding-top: 15px;
}
.confirmOrder .content .section-count .money-box .total .value {
  padding-top: 10px;
}
.confirmOrder .content .section-count .money-box .total-price {
  font-size: 30px;
}
/* 结算列表CSS END */

/* 结算导航CSS */
.confirmOrder .content .section-bar {
  padding: 20px 48px;
  border-top: 2px solid #f5f5f5;
  overflow: hidden;
}
.confirmOrder .content .section-bar .btn {
  float: right;
}
.confirmOrder .content .section-bar .btn .btn-base {
  float: left;
  margin-left: 30px;
  width: 158px;
  height: 38px;
  border: 1px solid #b0b0b0;
  font-size: 14px;
  line-height: 38px;
  text-align: center;
}
.confirmOrder .content .section-bar .btn .btn-return {
  color: rgba(0, 0, 0, 0.27);
  border-color: rgba(0, 0, 0, 0.27);
}
.confirmOrder .content .section-bar .btn .btn-primary {
  background: #ec9d8f;
  border-color: #ec9d8f;
  color: #fff;
}
/* 结算导航CSS */

/* 主要内容容器CSS END */
</style>
