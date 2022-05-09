<!--
 * @Description: 全部商品页面组件(包括全部商品,商品分类,商品搜索)
 -->
<template>
  <div class="goods" id="goods" name="goods">
    <!-- 面包屑 -->
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">Home</el-breadcrumb-item>
        <el-breadcrumb-item>Products</el-breadcrumb-item>
        <el-breadcrumb-item v-if="search">Search</el-breadcrumb-item>
        <el-breadcrumb-item v-else>List</el-breadcrumb-item>
        <el-breadcrumb-item v-if="search">{{ search }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 面包屑END -->

    <!-- 分类标签 -->
    <div class="nav">
      <div class="product-nav">
        <div class="title">List</div>
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane
            v-for="item in categoryList"
            :key="item.category_id"
            :label="item.category_name"
            :name="'' + item.category_id"
          />
        </el-tabs>
      </div>
    </div>
    <!-- 分类标签END -->

    <!-- 主要内容区 -->
    <div class="main">
      <div class="list">
        <div v-if="productList.length > 0">
          <div id="myList" class="myList">
            <ul>
              <li v-for="item in productList" :key="item.product_id">
                <el-popover placement="top">
                  <p>Are you sure?</p>
                  <div style="text-align: right; margin: 10px 0 0">
                    <el-button
                      type="primary"
                      size="mini"
                      @click="deleteCollect(item.product_id)"
                      >Continue</el-button
                    >
                  </div>
                  <i
                    class="el-icon-close delete"
                    slot="reference"
                    v-show="isDelete"
                  ></i>
                </el-popover>
                <router-link
                  :to="{
                    path: '/goods/details',
                    query: { productID: item.product_id },
                  }"
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
              <li v-show="isMore && list.length >= 1" id="more">
                <router-link
                  :to="{ path: '/goods', query: { categoryID: categoryID } }"
                >
                  Browse more...
                  <i class="el-icon-d-arrow-right"></i>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <div v-else class="none-product">
          Sorry, we do not provide relevant products at present, please have a
          look at other products
        </div>
      </div>
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="total"
          @current-change="currentChange"
        ></el-pagination>
      </div>
      <!-- 分页END -->
    </div>
    <!-- 主要内容区END -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      categoryList: "", //分类列表
      categoryID: [], // 分类id
      productList: [],
      BouquetsList: [],
      FlowerCutList: [],
      total: 0, // 商品总量
      pageSize: 15, // 每页显示的商品数量
      currentPage: 1, //当前页码
      activeName: "-1", // 分类列表当前选中的id
      search: "", // 搜索条件
    };
  },
  created() {
    // 获取分类列表
    this.getCategory();
    this.getData();
  },
  activated() {
    this.activeName = "-1"; // 初始化分类列表当前选中的id为-1
    this.total = 0; // 初始化商品总量为0
    this.currentPage = 1; //初始化当前页码为1
    // 如果路由没有传递参数，默认为显示全部商品
    if (Object.keys(this.$route.query).length == 0) {
      this.categoryID = [];
      this.activeName = "0";
      return;
    }
    // 如果路由传递了categoryID，则显示对应的分类商品
    if (this.$route.query.categoryID != undefined) {
      this.categoryID = this.$route.query.categoryID;
      if (this.categoryID.length == 1) {
        this.activeName = "" + this.categoryID[0];
      }
      return;
    }
    // 如果路由传递了search，则为搜索，显示对应的分类商品
    if (this.$route.query.search != undefined) {
      this.search = this.$route.query.search;
    }
  },
  watch: {
    // 监听点击了哪个分类标签，通过修改分类id，响应相应的商品
    activeName: function(val) {
      if (val == 0) {
        this.categoryID = [];
      }
      if (val > 0) {
        this.categoryID = [Number(val)];
      }
      // 初始化商品总量和当前页码
      this.total = 0;
      this.currentPage = 1;
      // 更新地址栏链接，方便刷新页面可以回到原来的页面
      this.$router.push({
        path: "/goods",
        query: { categoryID: this.categoryID },
      });
    },
    // 监听搜索条件，响应相应的商品
    search: function(val) {
      if (val != "") {
        this.getProductBySearch(val);
      }
    },
    // 监听分类id，响应相应的商品
    categoryID: function() {
      this.getData();
      this.search = "";
    },
    // 监听路由变化，更新路由传递了搜索条件
    $route: function(val) {
      if (val.path == "/goods") {
        if (val.query.search != undefined) {
          this.activeName = "-1";
          this.currentPage = 1;
          this.total = 0;
          this.search = val.query.search;
        }
      }
    },
  },

  methods: {
    // 返回顶部
    backtop() {
      const timer = setInterval(function() {
        const top =
          document.documentElement.scrollTop || document.body.scrollTop;
        const speed = Math.floor(-top / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          top + speed;

        if (top === 0) {
          clearInterval(timer);
        }
      }, 20);
    },
    // 页码变化调用currentChange方法
    currentChange(currentPage) {
      this.currentPage = currentPage;
      if (this.search != "") {
        this.getProductBySearch();
      } else {
        this.getData();
        this.FlowerCutList = [];
        this.BouquetsList = [];
      }
      this.backtop();
    },

    // 请求分类列表数据
    getCategory() {
      this.$axios({
        method: "post",
        url: "http://localhost:80/back-end/category.php?action=getCategories",
      })
        .then((res) => {
          for (let i = 0; i < res.data.categories.length; i++) {
            console.log(res.data.categories[i]);
          }
          this.categoryList = res.data.categories;
          // 弹出通知框提示登录成功信息
          this.notifySucceed("success!");
          console.log(this.categoryList);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    // 向后端请求全部商品或分类商品数据
    getData() {
      this.productList = [];
      this.BouquetsList = [];
      this.FlowerCutList = [];
      this.$axios({
        method: "post",
        url: "http://localhost:80/back-end/product.php?action=getAllProducts",
      })
        .then((res) => {
          // this.productList = res.data.products;
          for (let i = 0; i < res.data.products.length; i++) {
            if (res.data.products[i].category_id == 1) {
              this.BouquetsList.push(res.data.products[i]);
            } else {
              this.FlowerCutList.push(res.data.products[i]);
            }
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        });
      console.log("categoryID" + this.categoryID);
      if (this.categoryID == 1) {
        this.productList = this.BouquetsList;
      } else {
        this.productList = this.FlowerCutList;
      }
    },

    // 通过搜索条件向后端请求商品数据
    getProductBySearch() {
      this.$axios
        .post("/api/product/getProductBySearch", {
          search: this.search,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        })
        .then((res) => {
          this.product = res.data.Product;
          this.total = res.data.total;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
  },
};
</script>

<style scoped>
.goods {
  background-color: #f5f5f5;
}
/* 面包屑CSS */
.el-tabs--card .el-tabs__header {
  border-bottom: none;
}
.goods .breadcrumb {
  height: 50px;
  background-color: white;
}
.goods .breadcrumb .el-breadcrumb {
  width: 1225px;
  line-height: 30px;
  font-size: 16px;
  margin: 0 auto;
}
/* 面包屑CSS END */

/* 分类标签CSS */
.goods .nav {
  background-color: white;
}
.goods .nav .product-nav {
  width: 1225px;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
}
.nav .product-nav .title {
  width: 50px;
  font-size: 16px;
  font-weight: 700;
  float: left;
}
/* 分类标签CSS END */

/* 主要内容区CSS */
.goods .main {
  margin: 0 auto;
  max-width: 1225px;
}
.goods .main .list {
  min-height: 650px;
  padding-top: 14.5px;
  margin-left: -13.7px;
  overflow: auto;
}
.goods .main .pagination {
  height: 50px;
  text-align: center;
}
.goods .main .none-product {
  color: #333;
  margin-left: 13.7px;
}
/* 主要内容区CSS END */
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
