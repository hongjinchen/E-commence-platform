<template>
  <div>
    <div>
      <el-button @click="centerDialogVisible = true">
        Purchase
      </el-button>
    </div>
    <!-- 下订单页面 -->
    <el-dialog :visible.sync="centerDialogVisible" width="80%" center>
      <div class="confirmOrder">
        <!-- 头部 -->
        <div class="confirmOrder-header">
          <div class="header-content">
            <p>
              <i class="el-icon-s-order"></i>
            </p>
            <p>Confirm an order</p>
            <router-link to></router-link>
          </div>
        </div>
        <!-- 头部END -->

        <!-- 主要内容容器 -->
        <div class="content">
          <!-- 选择地址 -->
          <div class="section-address">
            <p class="title">shipping address</p>
            <div class="address-body">
              <ul>
                <li
                  :class="item.id == confirmAddress ? 'in-section' : ''"
                  v-for="item in address"
                  :key="item.id"
                >
                  <h2>{{ item.name }}</h2>
                  <p class="phone">{{ item.phone }}</p>
                  <p class="address">{{ item.address }}</p>
                </li>
                <li class="add-address">
                  <i class="el-icon-circle-plus-outline"></i>
                  <p>添加新地址</p>
                </li>
              </ul>
            </div>
          </div>
          <!-- 选择地址END -->

          <!-- 商品及优惠券 -->
          <div class="section-goods">
            <p class="title">Goods</p>
            <div class="goods-list">
              <ul>
                <li v-for="item in getCheckGoods" :key="item.id">
                  <img :src="$target + item.productImg" />
                  <span class="pro-name">{{ item.productName }}</span>
                  <span class="pro-price"
                    >{{ item.price }}元 x {{ item.num }}</span
                  >
                  <span class="pro-status"></span>
                  <span class="pro-total">{{ item.price * item.num }}元</span>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品END -->

          <!-- 结算列表 -->
          <div class="section-count">
            <div class="money-box">
              <ul>
                <li>
                  <span class="title">商品件数：</span>
                  <span class="value">{{ getCheckNum }}件</span>
                </li>
                <li>
                  <span class="title">商品总价：</span>
                  <span class="value">{{ getTotalPrice }}RMB</span>
                </li>
                <li>
                  <span class="title">Freight charge: </span>
                  <span class="value">0RMB</span>
                </li>
                <li class="total">
                  <span class="title">Amount:</span>
                  <span class="value">
                    <span class="total-price">{{ getTotalPrice }}</span
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
              <router-link to="/shoppingCart" class="btn-base btn-return"
                >返回购物车</router-link
              >
              <a
                href="javascript:void(0);"
                @click="addOrder"
                class="btn-base btn-primary"
                >结算</a
              >
            </div>
          </div>
          <!-- 结算导航END -->
        </div>
        <!-- 主要内容容器END -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">Cancel</el-button>
        <el-button
          type="primary"
          @click="
            (centerDialogVisible = false),
              purchaseGood(item.productID, item.num, item.price)
          "
          >Comfirm</el-button
        >
      </span>
    </el-dialog>
    <!-- 下订单页面END -->
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
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

/* 主要内容容器CSS END */</style>
