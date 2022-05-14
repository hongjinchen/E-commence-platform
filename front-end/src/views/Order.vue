<!--
 * @Description: 我的订单页面组件
 * @Author: hai-27
 * @Date: 2020-02-20 17:21:54
 * @LastEditors: hai-27
 * @LastEditTime: 2020-02-27 13:36:27
 -->
<template>
  <div class="order">
    <!-- 我的订单头部 -->
    <div class="order-header">
      <div class="order-header-content">
        <p>
          <i
            class="el-icon-s-order"
            style="font-size: 30px;color: #ec9d8f;"
          ></i>
          My order
        </p>
      </div>
    </div>
    <!-- 我的订单头部END -->

    <!-- 我的订单主要内容 -->
    <div class="order-content" v-if="orders.length > 0">
      <div class="content" v-for="(item, index) in ordersDetail" :key="index">
        <ul>
          <!-- 我的订单表头 -->
          <li class="order-info">
            <div class="order-id">Order No:{{ item.order_id }}</div>
            <div class="order-time">Order Time: {{ item.order_time }}</div>
          </li>
          <li class="header">
            <div class="pro-img"></div>
            <div class="pro-name">Type of plant</div>
            <div class="pro-price">Price</div>
            <div class="pro-num">Number</div>
            <div class="pro-total">Subtotal</div>
          </li>
          <!-- 我的订单表头END -->

          <!-- 订单列表 -->
          <el-card style="  box-shadow: none">
            <div class="pro-img">
              <router-link
                :to="{
                  path: '/goods/details',
                  query: { productID: item.product.product_id },
                }"
              >
                <img :src="item.product.product_picture" />
              </router-link>
            </div>
            <div class="pro-name">
              <router-link
                :to="{
                  path: '/goods/details',
                  query: { productID: item.product.product_id },
                }"
                >{{ item.product.product_name }}</router-link
              >
            </div>
            <div class="pro-price">{{ item.product.product_price }}RMB</div>
            <div class="pro-num">{{ item.product_num }}</div>
            <div class="pro-total pro-total-in">
              {{ item.product.product_price * item.product_num }}RMB
            </div>
          </el-card>
        </ul>
        <div class="order-bar">
          <div class="order-bar-left"></div>
          <div class="order-bar-right"></div>
          <!-- 订单列表END -->
        </div>
      </div>
      <div style="margin-top:-40px;"></div>
    </div>
    <!-- 我的订单主要内容END -->

    <!-- 订单为空的时候显示的内容 -->
    <div v-else class="order-empty">
      <div class="empty">
        <h2>Your order is still empty!</h2>
        <p>Go shopping!</p>
      </div>
    </div>
    <!-- 订单为空的时候显示的内容END -->
  </div>
</template>
<script>

export default {
  data() {
    return {
      orders: [], // 订单列表
      ordersDetail: [], // 订单列表
      product: [],
    };
  },

  activated() {
    // 获取订单数据

    this.$axios({
      method: "post",
      url: "/api/back-end/order.php?action=getUserOrders",
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
              encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
          }
          return ret.substring(0, ret.length - 1);
        },
      ],
    })
      .then((res) => {
        this.orders = []; // 订单列表
        this.ordersDetail = []; // 订单列表
        this.product = [];
        this.notifySucceed("success!");
        this.orders = res.data.orders;
      })
      .catch((err) => {
        return Promise.reject(err);
      });

    for (let i = 0; i < this.orders.length; i++) {
      // 获取收藏商品的信息
      this.$axios({
        method: "post",
        url: "/api/back-end/product.php?action=getProductById",
        data: {
          product_id: this.orders[i].product_id,
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
          console.log(res.data.product_info);
          let product = res.data.product_info;
          console.log("productInfo", product);
          let order_time = this.timetrans(this.orders[i].order_time);
          console.log(order_time);
          let newitem = {
            id: this.orders[i].id,
            order_id: this.orders[i].order_id,
            order_time: order_time,
            payment_info: this.orders[i].payment_info,
            product_id: this.orders[i].product_id,
            product_num: this.orders[i].product_num,
            product_price: this.orders[i].product_price,
            shipping_info: this.orders[i].shipping_info,
            user_id: this.orders[i].user_id,
            product: product,
          };
          this.ordersDetail.push(newitem);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }
    console.log("success");
    console.log(this.ordersDetail);
  },
  methods: {
    timetrans(date) {
      date = new Date(date * 1000); //如果date为13位不需要乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    },
  },
  watch: {
    // 通过订单信息，计算出每个订单的商品数量及总价
    orders: function(val) {
      let total = [];
      for (let i = 0; i < val.length; i++) {
        const element = val[i];

        let totalNum = 0;
        let totalPrice = 0;
        for (let j = 0; j < element.length; j++) {
          const temp = element[j];
          totalNum += temp.product_num;
          totalPrice += temp.product_price * temp.product_num;
        }
        total.push({ totalNum, totalPrice });
      }
      this.total = total;
    },
  },
};
</script>
<style scoped>
.order {
  background-color: #f5f5f5;
  padding-bottom: 20px;
}
/* 我的订单头部CSS */
.order .order-header {
  height: 64px;
  border-bottom: 2px solid #ec9d8f;
  background-color: #fff;
  margin-bottom: 20px;
}
.order .order-header .order-header-content {
  width: 1225px;
  margin: 0 auto;
}
.order .order-header p {
  font-size: 25px;
  line-height: 58px;
  float: left;
  font-weight: normal;
  color: #424242;
}
/* 我的订单头部CSS END */
.order .content {
  width: 1225px;
  margin: 0 auto;
  background-color: #fff;
  margin-bottom: 50px;
}

.order .content ul {
  background-color: #fff;
  color: #424242;
  line-height: 85px;
}
/* 我的订单表头CSS */
.order .content ul .order-info {
  height: 60px;
  line-height: 60px;
  padding: 0 26px;
  color: #424242;
  border-bottom: 1px solid #ec9d8f;
}
.order .content ul .order-info .order-id {
  float: left;
  color: #ec9d8f;
}
.order .content ul .order-info .order-time {
  float: right;
}

.order .content ul .header {
  height: 85px;
  padding-right: 26px;
  color: #424242;
}
/* 我的订单表头CSS END */

/* 订单列表CSS */
.order .content ul .product-list {
  height: 85px;
  padding: 15px 26px 15px 0;
  border-top: 1px solid #e0e0e0;
}
.order .content ul .pro-img {
  float: left;
  height: 85px;
  width: 120px;
  padding-left: 80px;
}
.order .content ul .pro-img img {
  height: 80px;
  width: 80px;
}
.order .content ul .pro-name {
  float: left;
  width: 380px;
}
.order .content ul .pro-name a {
  color: #424242;
}
.order .content ul .pro-name a:hover {
  color: #ec9d8f;
}
.order .content ul .pro-price {
  float: left;
  width: 160px;
  padding-right: 18px;
  text-align: center;
}
.order .content ul .pro-num {
  float: left;
  width: 190px;
  text-align: center;
}
.order .content ul .pro-total {
  float: left;
  width: 130px;
  padding-right: 81px;
  text-align: right;
}
.order .content ul .pro-total-in {
  color: #ec9d8f;
}

.order .order-bar {
  width: 1185px;
  padding: 0 20px;
  border-top: 1px solid #ec9d8f;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
}
.order .order-bar .order-bar-left {
  float: left;
}
.order .order-bar .order-bar-left .order-total {
  color: #757575;
}
.order .order-bar .order-bar-left .order-total-num {
  color: #ec9d8f;
}
.order .order-bar .order-bar-right {
  float: right;
}
.order .order-bar .order-bar-right .total-price-title {
  color: #ec9d8f;
  font-size: 14px;
  margin-right: 20px;
}
.order .order-bar .order-bar-right .total-price {
  color: #ec9d8f;
  font-size: 20px;
}
/* 订单列表CSS END */

/* 订单为空的时候显示的内容CSS */
.order .order-empty {
  width: 1225px;
  margin: 0 auto;
}
.order .order-empty .empty {
  height: 300px;
  padding: 0 0 130px 558px;
  margin: 65px 0 0;
  background: url(../assets/imgs/cart-empty.svg) no-repeat 124px 0;
  color: #b0b0b0;
  overflow: hidden;
}
.order .order-empty .empty h2 {
  margin: 70px 0 15px;
  font-size: 36px;
}
.order .order-empty .empty p {
  margin: 0 0 20px;
  font-size: 20px;
}
/* 订单为空的时候显示的内容CSS END */
</style>
