<!--
 * @Description: 我的收藏页面组件
 -->
<template>
  <div class="collect">
    <!-- Add a static page for my favorite module -->
    <div class="collect-header">
      <div class="collect-title">
        <i class="el-icon-collection-tag" style="color: #ec9d8f;"></i>
        My wishlist
      </div>
    </div>
    <div class="content">
      <div class="goods-list" v-if="collectListDetail.length > 0">
        <div v-if="collectListDetail.length > 0">
          <div id="myList" class="myList">
            <ul>
              <li v-for="item in collectListDetail" :key="item.product_id">
                <router-link
                  :to="{
                    path: '/goods/details',
                    query: { productID: item.product_id },
                  }"
                >
                  <el-button size="mini" @click="deleteCollect(item.product_id)"
                    >Delete</el-button
                  >
                  <img :src="item.product_picture" alt />
                  <h2>{{ item.product_name }}</h2>
                  <h3>{{ item.product_title }}</h3>
                  <p>
                    <span>{{ item.product_selling_price }}RMB</span>
                    <span
                      v-show="item.product_price != item.product_selling_price"
                      class="del"
                      >{{ item.product_price }}RMB</span
                    >
                  </p>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 收藏列表为空的时候显示的内容 -->
      <div v-else class="collect-empty">
        <div class="empty">
          <h2>It is empty!</h2>
          <p>Try exploring the fun world of flowers!</p>
        </div>
      </div>
      <!--  收藏列表为空的时候显示的内容END -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      collectList: [],
      collectListDetail: [],
    };
  },
  methods: {
    deleteCollect(product_id) {
      this.$axios({
        method: "post",
        url: "/api/collect.php?action=deleteCollect",
        data: {
          user_id: this.$store.state.user_id,
          product_id: product_id,
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
          alert(res.data.message);
          // switch (res.data.code) {
          //   case "001":
          //     // 删除成功
          //     // 删除删除列表中的该商品信息
          //     for (let i = 0; i < this.list.length; i++) {
          //       const temp = this.list[i];
          //       if (temp.product_id == product_id) {
          //         this.list.splice(i, 1);
          //       }
          //     }
          //     // 提示删除成功信息
          //     this.notifySucceed(res.data.msg);
          //     break;
          //   default:
          //     // 提示删除失败信息
          //     this.notifyError(res.data.msg);
          // }
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    // 获取收藏商品的信息
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
          this.collectListDetail.push(res.data.product_info);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
  },
  activated() {
    // 获取收藏数据
    this.collectList = [];
    this.collectListDetail = [];
    this.$axios({
      method: "post",
      url: "/api/back-end/collect.php?action=getUserCollects",
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
        this.collectList = res.data.charts;
        this.notifySucceed("success!");
        console.log(this.collectList);
        for (let i = 0; i < this.collectList.length; i++) {
          this.getDetails(this.collectList[i].id);
        }
        console.log(this.collectListDetail);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  },
};
</script>
<style>
.collect {
  background-color: #f5f5f5;
}
.collect .collect-header {
  height: 64px;
  background-color: #fff;
  border-bottom: 2px solid #ec9d8f;
}
.collect .collect-header .collect-title {
  width: 1225px;
  margin: 0 auto;
  height: 64px;
  line-height: 58px;
  font-size: 25px;
}
.collect .content {
  padding: 20px 0;
  width: 1225px;
  margin: 0 auto;
}
.collect .content .goods-list {
  margin-left: -13.7px;
  overflow: hidden;
}
/* 收藏列表为空的时候显示的内容CSS */
.collect .collect-empty {
  width: 1225px;
  margin: 0 auto;
}
.collect .collect-empty .empty {
  height: 300px;
  padding: 0 0 130px 558px;
  margin: 65px 0 0;
  background: url(../assets/imgs/cart-empty.svg) no-repeat 124px 0;
  color: #b0b0b0;
  overflow: hidden;
}
.collect .collect-empty .empty h2 {
  margin: 70px 0 15px;
  font-size: 36px;
}
.collect .collect-empty .empty p {
  margin: 0 0 20px;
  font-size: 20px;
}
/* 收藏列表为空的时候显示的内容CSS END */
.myList ul li {
  z-index: 1;
  float: left;
  width: 234px;
  height: 280px;
  padding: 10px 0;
  margin: 0 0 14.5px 13.7px;
  background-color: white;
  -webkit-transition: all 0.2s linear;
  transition: all 0.2s linear;
  position: relative;
}
.myList ul li:hover {
  z-index: 2;
  -webkit-box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
}
.myList ul li img {
  display: block;
  width: 160px;
  height: 160px;
  background: url(../assets/imgs/placeholder.png) no-repeat 50%;
  margin: 0 auto;
}
.myList ul li h2 {
  margin: 25px 10px 0;
  font-size: 14px;
  font-weight: 400;
  color: #333;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.myList ul li h3 {
  margin: 5px 10px;
  height: 18px;
  font-size: 12px;
  font-weight: 400;
  color: #b0b0b0;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.myList ul li p {
  margin: 10px 10px 10px;
  text-align: center;
  color: #ec9d8f;
}
.myList ul li p .del {
  margin-left: 0.5em;
  color: #b0b0b0;
  text-decoration: line-through;
}
.myList #more {
  text-align: center;
  line-height: 280px;
}
.myList #more a {
  font-size: 18px;
  color: #333;
}
.myList #more a:hover {
  color: #ec9d8f;
}
.myList ul li .delete {
  position: absolute;
  top: 10px;
  right: 10px;
  display: none;
}
.myList ul li:hover .delete {
  display: block;
}
.myList ul li .delete:hover {
  color: #ec9d8f;
}
</style>
