<!--
 * @Description: 首页组件
 -->
<template>
  <div class="home" id="home" name="home">
    <toTop>
      <img
        class="go-top"
        src="../assets/imgs/ziyuan.png"
        v-if="btnFlag"
        @click="backTop"
      />
    </toTop>
    <!-- 轮播图 -->
    <div class="block">
      <el-carousel :interval="4000" type="card" height="250px">
        <el-carousel-item v-for="item in carousel" :key="item.carousel_id">
          <img
            style="height:410px;"
            :src="item.imgPath"
            :alt="item.describes"
          />
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 轮播图END -->
    <div class="main-box">
      <div class="main">
        <!-- 所有商品展示区域 -->
        <div class="phone">
          <div class="box-hd">
            <div class="title">Daily Recommondation</div>
          </div>
          <div class="box-bd">
            <div class="promo-list">
              <router-link to>
                <img height="600px" src="../assets/imgs/picture1.png" />
              </router-link>
            </div>
            <div class="list">
              <el-card style="height:620px;margin-left:20px">
                <el-row gutter="12">
                  <el-col
                    :span="12"
                    style="height:300px"
                    v-for="item in AllProductList"
                    :key="item"
                  >
                    <!-- <el-card
                      @click="goToDetail(item.product_id)"
                      :body-style="{ padding: '0px' }"
                    > -->
                    <el-card :body-style="{ padding: '0px' }">
                      <el-row>
                        <el-col :span="15">
                          <img
                            @click="goToDetail(item.product_id)"
                            :src="item.product_picture"
                            class="image"
                        /></el-col>
                        <el-col :span="9">
                          <div
                            class="title"
                            style="margin-bottom:10px;margin-top:10px"
                          >
                            {{ item.product_name }}
                          </div>
                          <el-card class="context">
                            {{ item.product_intro }}
                          </el-card>
                        </el-col>
                      </el-row>
                    </el-card>
                  </el-col>
                </el-row>
              </el-card>
            </div>
          </div>
        </div>
        <!-- 所有商品展示区域END -->

        <!-- 鲜切花展示区域 -->
        <div class="appliance" id="promo-menu">
          <div class="box-hd">
            <div class="title">Fresh Cut Flowers</div>
          </div>
          <div class="box-bd">
            <div class="promo-list">
              <ul>
                <li>
                  <img src="../assets/imgs/picture2.png" />
                </li>
                <li>
                  <img src="../assets/imgs/picture3.png" />
                </li>
              </ul>
            </div>
            <div class="list">
              <el-card style="height:620px;margin-left:20px">
                <el-row gutter="12">
                  <el-col
                    :span="12"
                    style="height:300px"
                    v-for="item in FlowerCutList"
                    :key="item"
                  >
                    <el-card
                      @click="goToDetail(item.product_id)"
                      :body-style="{ padding: '0px' }"
                    >
                      <el-row>
                        <el-col :span="15">
                          <img :src="item.product_picture" class="image"
                        /></el-col>
                        <el-col :span="9">
                          <div
                            class="title"
                            style="margin-bottom:10px;margin-top:10px"
                          >
                            {{ item.product_name }}
                          </div>
                          <el-card class="context">
                            {{ item.product_intro }}
                          </el-card>
                        </el-col>
                      </el-row>
                    </el-card>
                  </el-col>
                </el-row>
              </el-card>
            </div>
          </div>
        </div>
        <!-- 鲜切花展示区域END -->

        <!-- 成品花束展示区域 -->
        <div class="accessory" id="promo-menu">
          <div class="box-hd">
            <div class="title">Designed Bouquets</div>
          </div>
          <div class="box-bd">
            <div class="promo-list">
              <ul>
                <li>
                  <img src="../assets/imgs/picture4.png" alt />
                </li>
                <li>
                  <img src="../assets/imgs/picture5.png" alt />
                </li>
              </ul>
            </div>
            <div class="list">
              <el-card style="height:620px;margin-left:20px">
                <el-row gutter="12">
                  <el-col
                    :span="12"
                    style="height:300px"
                    v-for="item in BouquetsList"
                    :key="item"
                  >
                    <el-card
                      @click="goToDetail(item.product_id)"
                      :body-style="{ padding: '0px' }"
                    >
                      <el-row>
                        <el-col :span="15">
                          <img :src="item.product_picture" class="image"
                        /></el-col>
                        <el-col :span="9">
                          <div
                            class="title"
                            style="margin-bottom:10px;margin-top:10px"
                          >
                            {{ item.product_name }}
                          </div>
                          <el-card class="context">
                            {{ item.product_intro }}
                          </el-card>
                        </el-col>
                      </el-row>
                    </el-card>
                  </el-col>
                </el-row>
              </el-card>
            </div>
          </div>
        </div>
        <!-- 成品花束展示区域END -->
      </div>
    </div>
  </div>
</template>

<script>
import toTop from "../components/toTop";
export default {
  components: { toTop },
  data() {
    return {
      carousel: [
        {
          carousel_id: 1,
          imgPath: require("../assets/imgs/picture1.jpg"),
          describes: "123456",
        },
        {
          carousel_id: 2,
          imgPath: require("../assets/imgs/picture2.jpg"),
          describes: "123456",
        },
        {
          carousel_id: 3,
          imgPath: require("../assets/imgs/picture3.jpg"),
          describes: "123456",
        },
        {
          carousel_id: 4,
          imgPath: require("../assets/imgs/picture4.jpg"),
          describes: "123456",
        },
      ], // 轮播图数据
      AllProductList: [],
      BouquetsList: [],
      FlowerCutList: [],
    };
  },
  created() {
    // 获取数据
    this.getAllProducts();
  },
  methods: {
    getAllProducts() {
      this.$axios({
        method: "post",
        // url: "http://localhost:80/back-end/product.php?action=getAllProducts",
         url: "/api/back-end/product.php?action=getAllProducts",
      })
        .then((res) => {
          this.AllProductList = res.data.products;
          for (let i = 0; i < res.data.products.length; i++) {
            if (res.data.products[i].category_id == 1) {
              this.BouquetsList.push(res.data.products[i]);
            } else {
              this.FlowerCutList.push(res.data.products[i]);
            }
          }
          console.log(res.data);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    goToDetail(index) {
      // 前往详情页
      alert(index);
      this.$router.push({
        path: "/goods/details",
        query: { productID: index },
      });
    },
    Test() {
      alert("????");
    },
  },
};
</script>
<style scoped>
@import "../assets/css/index.css";
.image {
  height: 280px;
  width: 280px;
}
.title {
  overflow: hidden; /*超出部分隐藏*/
  text-overflow: ellipsis; /* 超出部分显示省略号 */
  white-space: nowrap; /*规定段落中的文本不进行换行 */
  width: auto; /*需要配合宽度来使用*/
  font-size: 20px;
}
.context {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  width: auto; /*需要配合宽度来使用*/
  height: 220px;
  font-size: 12px;
}
</style>
