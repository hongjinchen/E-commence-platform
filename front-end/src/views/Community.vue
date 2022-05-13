<!--
 * @Description: View Community
 -->
<template>
  <el-row :gutter="10">
    <el-col :xs="0" :sm="2" :md="2" :lg="3" :xl="3"
      ><div class="grid-content "></div
    ></el-col>
    <el-col :xs="24" :sm="20" :md="20" :lg="18" :xl="18"
      ><div>
        <div class="box-hd">
          <div class="title">Most Popular</div>
        </div>
        <!-- Show the most popular posts  -->
        <el-carousel
          indicator-position="outside"
          height="25rem"
          interval="1500"
        >
          <el-carousel-item
            v-for="(item, index) in ListReview"
            :key="index"
            style="background: #ec9d8f"
          >
            <el-row :gutter="0">
              <el-col :span="14">
                <el-card shadow="hover">
                  <img style="height:350px;width:100%" :src="item.imgPath" />
                </el-card>
              </el-col>
              <el-col :span="1"><br /> </el-col>
              <el-col :span="8">
                <el-card
                  shadow="hover"
                  style="background: #ec9d8f;color: #fff;border: 0.2rem;font-size: 1.5rem;"
                >
                  <p>{{ item.html }}</p>
                </el-card>
              </el-col>
              <el-col :span="1"><br /> </el-col>
            </el-row>
          </el-carousel-item>
        </el-carousel>
        <!-- Show the most popular posts END -->

        <div class="box-hd">
          <div class="title">Write a Review</div>
        </div>
        <!-- Write a review part -->
        <el-card shadow="hover" class="ReviewCard">
          <p>
            Please describe what you liked or disliked about this product and
            whether you recommend it to others.
          </p>
          <p>
            Please remember to be polite and follow the Rules and Guidelines.
          </p>
          <input class="input" placeholder=" Please write your review" />
          <el-button
            type="primary"
            plain
            style="font-size: 0.3rem;background: #434953;margin-top: 0.4rem; color: #F5F5F5;"
            >Post Review</el-button
          >
        </el-card>
        <!-- Write a review part END -->

        <div class="box-hd">
          <div class="title">Customer Reviews</div>
        </div>
        <!-- Show customer's reviews -->
        <!-- All reviews -->
        <el-tabs type="card">
          <el-tab-pane label="All">
            <el-col :span="24">
              <el-card shadow="hover">
                <div class="prosItem">
                  <ul class="proitem">
                    <li class="reviewpic">
                      <img src="../assets/imgs/flower1.png" />
                    </li>
                    <h2>It's a Deep Ocean !!!</h2>
                    <div class="ReviewCard">
                      <p>
                        Very satisfied with a shopping, there are deep ocean
                        flowers for sale here.
                      </p>
                    </div>
                    <el-row type="flex" class="row-bg" justify="center">
                      <el-col :span="1"> </el-col>
                      <el-col :span="15"
                        ><div class="grid-content">
                          <div class="TextLeft">
                            <br />
                            <div class="proinfo">
                              <a
                                >Overall Reviews:&nbsp;&nbsp;&nbsp;&nbsp;<font
                                  color=""
                                  >⭐⭐⭐⭐⭐</font
                                >
                              </a>
                            </div>
                            <br />
                            <div class="proinfo">
                              <a
                                >Arthur：&nbsp;&nbsp;&nbsp;&nbsp;<font
                                  color="#FFAB4D"
                                  >Customers1</font
                                >
                              </a>
                              <div class="proinfo">
                                <a
                                  >Last Modified：&nbsp;&nbsp;&nbsp;&nbsp;<font
                                    color=""
                                    >2022/5/10</font
                                  >
                                </a>
                              </div>
                              <br />
                              <div>
                                <el-button
                                  type="primary"
                                  size="small"
                                  icon="el-icon-medal"
                                  style="background: #FF5A3D ;"
                                  >Like</el-button
                                >
                                <el-button
                                  type="primary"
                                  size="small"
                                  icon="el-icon-star-off"
                                  style="background: #FF5A3D;"
                                  >Collect</el-button
                                >
                              </div>
                            </div>
                            <br />
                            <li class="item"><a>Sunflower</a></li>
                            <li class="item"><a>Birthday</a></li>
                            <li class="item"><a>Friendship</a></li>
                          </div>
                        </div>
                      </el-col>
                      <el-row :gutter="1"
                        ><br /><br />
                        <el-button
                          type="primary"
                          size="small"
                          icon="el-icon-present"
                          style="background: #21b004;"
                          @click="addToWishList()"
                          >Add to Wishlist</el-button
                        ><br />
                        <el-button
                          type="primary"
                          size="small"
                          icon="el-icon-shopping-cart-2"
                          style="background: #E66877;"
                          @click="addToBasket()"
                          >Add to Flower Basket</el-button
                        ><br />
                        <el-button
                          type="primary"
                          size="small"
                          icon="el-icon-thumb"
                          style="background: #FFAB4D;"
                          @click="jumpToPro()"
                          >Jump</el-button
                        ><br />
                      </el-row>
                    </el-row>
                  </ul>
                </div>
              </el-card>
              <el-card shadow="hover">
                <div class="prosItem">
                  <ul class="proitem">
                    <li class="reviewpic">
                      <img src="../assets/imgs/flower2.png" />
                    </li>
                    <h2>Spring's Breath</h2>
                    <div class="ReviewCard">
                      <p>
                        Nam augue velit, commodo in laoreet in, sollicitudin nec
                        felis. Praesent ornare blandit est vel pellentesque.
                        Aliquam non vulputate ante.
                      </p>
                    </div>
                    <el-row type="flex" class="row-bg" justify="center">
                      <el-col :span="1"> </el-col>
                      <el-col :span="15"
                        ><div class="grid-content">
                          <div class="TextLeft">
                            <br />
                            <div class="proinfo">
                              <a
                                >Overall Reviews:&nbsp;&nbsp;&nbsp;&nbsp;<font
                                  color=""
                                  >⭐⭐⭐⭐</font
                                >
                              </a>
                            </div>
                            <br />
                            <div class="proinfo">
                              <a
                                >Arthur：&nbsp;&nbsp;&nbsp;&nbsp;<font
                                  color="#FFAB4D"
                                  >Customers2</font
                                >
                              </a>
                              <div class="proinfo">
                                <a
                                  >Last Modified：&nbsp;&nbsp;&nbsp;&nbsp;<font
                                    color=""
                                    >2022/5/10</font
                                  >
                                </a>
                              </div>
                              <br />
                              <div>
                                <el-button
                                  type="primary"
                                  size="small"
                                  icon="el-icon-medal"
                                  style="background: #FF5A3D ;"
                                  >Like</el-button
                                >
                                <el-button
                                  type="primary"
                                  size="small"
                                  icon="el-icon-star-off"
                                  style="background: #FF5A3D;"
                                  >Collect</el-button
                                >
                              </div>
                            </div>
                            <br />
                            <li class="item"><a>Rose</a></li>
                            <li class="item"><a>Birthday</a></li>
                            <li class="item"><a>Love</a></li>
                          </div>
                        </div>
                      </el-col>
                      <el-row :gutter="1"
                        ><br /><br />
                        <el-button
                          type="primary"
                          size="small"
                          icon="el-icon-present"
                          style="background: #21b004;"
                          @click="addToWishList()"
                          >Add to Wishlist</el-button
                        ><br />
                        <el-button
                          type="primary"
                          size="small"
                          icon="el-icon-shopping-cart-2"
                          style="background: #E66877;"
                          @click="addToBasket()"
                          >Add to Flower Basket</el-button
                        ><br />
                        <el-button
                          type="primary"
                          size="small"
                          icon="el-icon-thumb"
                          style="background: #FFAB4D;"
                          @click="jumpToPro()"
                          >Jump</el-button
                        ><br />
                      </el-row>
                    </el-row>
                  </ul>
                </div>
              </el-card>
              <el-card shadow="hover">
                <div class="prosItem">
                  <ul class="proitem">
                    <li class="reviewpic">
                      <img src="../assets/imgs/picture1.jpg" />
                    </li>
                    <h2>Daily life</h2>
                    <div class="ReviewCard">
                      <p>
                        Maecenas porttitor vulputate dapibus. Suspendisse tempor
                        turpis neque, vel gravida lorem luctus ut. Nam augue
                        velit, commodo in laoreet in, sollicitudin nec felis.
                        Praesent ornare blandit est vel pellentesque. Aliquam
                        non vulputate ante. Donec commodo metus sed mauris
                        dictum feugiat. Vestibulum pretium mi eget velit
                        pulvinar.
                      </p>
                    </div>
                    <el-row type="flex" class="row-bg" justify="center">
                      <el-col :span="1"> </el-col>
                      <el-col :span="15"
                        ><div class="grid-content">
                          <div class="TextLeft">
                            <br />
                            <div class="proinfo">
                              <a
                                >Overall Reviews:&nbsp;&nbsp;&nbsp;&nbsp;<font
                                  color=""
                                  >⭐⭐⭐⭐⭐</font
                                >
                              </a>
                            </div>
                            <br />
                            <div class="proinfo">
                              <a
                                >Arthur：&nbsp;&nbsp;&nbsp;&nbsp;<font
                                  color="#FFAB4D"
                                  >Customers3</font
                                >
                              </a>
                              <div class="proinfo">
                                <a
                                  >Last Modified：&nbsp;&nbsp;&nbsp;&nbsp;<font
                                    color=""
                                    >2022/5/10</font
                                  >
                                </a>
                              </div>
                              <br />
                              <div>
                                <el-button
                                  type="primary"
                                  size="small"
                                  icon="el-icon-medal"
                                  style="background: #FF5A3D ;"
                                  >Like</el-button
                                >
                                <el-button
                                  type="primary"
                                  size="small"
                                  icon="el-icon-star-off"
                                  style="background: #FF5A3D;"
                                  >Collect</el-button
                                >
                              </div>
                            </div>
                            <br />
                            <li class="item"><a>Share life</a></li>
                            <li class="item"><a>Love</a></li>
                          </div>
                        </div>
                      </el-col>
                      <el-row :gutter="1"
                        ><br /><br />
                        <el-button
                          type="primary"
                          size="small"
                          icon="el-icon-thumb"
                          style="background: #FFAB4D;"
                          @click="jumpToPro()"
                          >Jump</el-button
                        ><br />
                      </el-row>
                    </el-row>
                  </ul>
                </div>
              </el-card>
            </el-col>
          </el-tab-pane>
          <!-- All reviews END -->

          <!-- Show reviews that include products -->
          <el-tab-pane label="Products">
            <el-col :span="24">
              <el-card shadow="hover">
                <div class="prosItem">
                  <ul class="proitem">
                    <li class="reviewpic">
                      <img src="../assets/imgs/flower1.png" />
                    </li>
                    <h2>It's a Deep Ocean !!!</h2>
                    <div class="ReviewCard">
                      <p>
                        Very satisfied with a shopping, there are deep ocean
                        flowers for sale here.
                      </p>
                    </div>
                    <el-row type="flex" class="row-bg" justify="center">
                      <el-col :span="1"> </el-col>
                      <el-col :span="15"
                        ><div class="grid-content">
                          <div class="TextLeft">
                            <br />
                            <div class="proinfo">
                              <a
                                >Overall Reviews:&nbsp;&nbsp;&nbsp;&nbsp;<font
                                  color=""
                                  >⭐⭐⭐⭐⭐</font
                                >
                              </a>
                            </div>
                            <br />
                            <div class="proinfo">
                              <a
                                >Arthur：&nbsp;&nbsp;&nbsp;&nbsp;<font
                                  color="#FFAB4D"
                                  >Customers1</font
                                >
                              </a>
                              <div class="proinfo">
                                <a
                                  >Last Modified：&nbsp;&nbsp;&nbsp;&nbsp;<font
                                    color=""
                                    >2022/5/10</font
                                  >
                                </a>
                              </div>
                              <br />
                              <div>
                                <el-button
                                  type="primary"
                                  size="small"
                                  icon="el-icon-medal"
                                  style="background: #FF5A3D ;"
                                  >Like</el-button
                                >
                                <el-button
                                  type="primary"
                                  size="small"
                                  icon="el-icon-star-off"
                                  style="background: #FF5A3D;"
                                  >Collect</el-button
                                >
                              </div>
                            </div>
                            <br />
                            <li class="item"><a>Sunflower</a></li>
                            <li class="item"><a>Birthday</a></li>
                            <li class="item"><a>Friendship</a></li>
                          </div>
                        </div>
                      </el-col>
                      <el-row :gutter="1"
                        ><br /><br />
                        <el-button
                          type="primary"
                          size="small"
                          icon="el-icon-present"
                          style="background: #21b004;"
                          @click="addToWishList()"
                          >Add to Wishlist</el-button
                        ><br />
                        <el-button
                          type="primary"
                          size="small"
                          icon="el-icon-shopping-cart-2"
                          style="background: #E66877;"
                          @click="addToBasket()"
                          >Add to Flower Basket</el-button
                        ><br />
                        <el-button
                          type="primary"
                          size="small"
                          icon="el-icon-thumb"
                          style="background: #FFAB4D;"
                          @click="jumpToPro()"
                          >Jump</el-button
                        ><br />
                      </el-row>
                    </el-row>
                  </ul>
                </div>
              </el-card>
              <el-card shadow="hover">
                <div class="prosItem">
                  <ul class="proitem">
                    <li class="reviewpic">
                      <img src="../assets/imgs/flower2.png" />
                    </li>
                    <h2>Spring's Breath</h2>
                    <div class="ReviewCard">
                      <p>
                        Nam augue velit, commodo in laoreet in, sollicitudin nec
                        felis. Praesent ornare blandit est vel pellentesque.
                        Aliquam non vulputate ante.
                      </p>
                    </div>
                    <el-row type="flex" class="row-bg" justify="center">
                      <el-col :span="1"> </el-col>
                      <el-col :span="15"
                        ><div class="grid-content">
                          <div class="TextLeft">
                            <br />
                            <div class="proinfo">
                              <a
                                >Overall Reviews:&nbsp;&nbsp;&nbsp;&nbsp;<font
                                  color=""
                                  >⭐⭐⭐⭐</font
                                >
                              </a>
                            </div>
                            <br />
                            <div class="proinfo">
                              <a
                                >Arthur：&nbsp;&nbsp;&nbsp;&nbsp;<font
                                  color="#FFAB4D"
                                  >Customers2</font
                                >
                              </a>
                              <div class="proinfo">
                                <a
                                  >Last Modified：&nbsp;&nbsp;&nbsp;&nbsp;<font
                                    color=""
                                    >2022/5/10</font
                                  >
                                </a>
                              </div>
                              <br />
                              <div>
                                <el-button
                                  type="primary"
                                  size="small"
                                  icon="el-icon-medal"
                                  style="background: #FF5A3D ;"
                                  >Like</el-button
                                >
                                <el-button
                                  type="primary"
                                  size="small"
                                  icon="el-icon-star-off"
                                  style="background: #FF5A3D;"
                                  >Collect</el-button
                                >
                              </div>
                            </div>
                            <br />
                            <li class="item"><a>Rose</a></li>
                            <li class="item"><a>Birthday</a></li>
                            <li class="item"><a>Love</a></li>
                          </div>
                        </div>
                      </el-col>
                      <el-row :gutter="1"
                        ><br /><br />
                        <el-button
                          type="primary"
                          size="small"
                          icon="el-icon-present"
                          style="background: #21b004;"
                          @click="addToWishList()"
                          >Add to Wishlist</el-button
                        ><br />
                        <el-button
                          type="primary"
                          size="small"
                          icon="el-icon-shopping-cart-2"
                          style="background: #E66877;"
                          @click="addToBasket()"
                          >Add to Flower Basket</el-button
                        ><br />
                        <el-button
                          type="primary"
                          size="small"
                          icon="el-icon-thumb"
                          style="background: #FFAB4D;"
                          @click="jumpToPro()"
                          >Jump</el-button
                        ><br />
                      </el-row>
                    </el-row>
                  </ul>
                </div>
              </el-card>
            </el-col>
          </el-tab-pane>
          <!-- Show reviews that include products END -->

          <!-- Show reviews that include discussions -->
          <el-tab-pane label="Discussion">
            <el-col :span="24">
              <el-card shadow="hover">
                <div class="prosItem">
                  <ul class="proitem">
                    <li class="reviewpic">
                      <img src="../assets/imgs/picture1.jpg" />
                    </li>
                    <h2>Daily life</h2>
                    <div class="ReviewCard">
                      <p>
                        Maecenas porttitor vulputate dapibus. Suspendisse tempor
                        turpis neque, vel gravida lorem luctus ut. Nam augue
                        velit, commodo in laoreet in, sollicitudin nec felis.
                        Praesent ornare blandit est vel pellentesque. Aliquam
                        non vulputate ante. Donec commodo metus sed mauris
                        dictum feugiat. Vestibulum pretium mi eget velit
                        pulvinar.
                      </p>
                    </div>
                    <el-row type="flex" class="row-bg" justify="center">
                      <el-col :span="1"> </el-col>
                      <el-col :span="15"
                        ><div class="grid-content">
                          <div class="TextLeft">
                            <br />
                            <div class="proinfo">
                              <a
                                >Overall Reviews:&nbsp;&nbsp;&nbsp;&nbsp;<font
                                  color=""
                                  >⭐⭐⭐⭐⭐</font
                                >
                              </a>
                            </div>
                            <br />
                            <div class="proinfo">
                              <a
                                >Arthur：&nbsp;&nbsp;&nbsp;&nbsp;<font
                                  color="#FFAB4D"
                                  >Customers3</font
                                >
                              </a>
                              <div class="proinfo">
                                <a
                                  >Last Modified：&nbsp;&nbsp;&nbsp;&nbsp;<font
                                    color=""
                                    >2022/5/10</font
                                  >
                                </a>
                              </div>
                              <br />
                              <div>
                                <el-button
                                  type="primary"
                                  size="small"
                                  icon="el-icon-medal"
                                  style="background: #FF5A3D ;"
                                  >Like</el-button
                                >
                                <el-button
                                  type="primary"
                                  size="small"
                                  icon="el-icon-star-off"
                                  style="background: #FF5A3D;"
                                  >Collect</el-button
                                >
                              </div>
                            </div>
                            <br />
                            <li class="item"><a>Share life</a></li>
                            <li class="item"><a>Love</a></li>
                          </div>
                        </div>
                      </el-col>
                      <el-row :gutter="1"
                        ><br /><br />
                        <el-button
                          type="primary"
                          size="small"
                          icon="el-icon-thumb"
                          style="background: #FFAB4D;"
                          @click="jumpToPro()"
                          >Jump</el-button
                        ><br />
                      </el-row>
                    </el-row>
                  </ul>
                </div>
              </el-card>
            </el-col>
          </el-tab-pane>
        </el-tabs>
        <!-- Show reviews that include discussions END -->
      </div></el-col
    >
    <el-col :xs="0" :sm="0" :md="2" :lg="2" :xl="2"
      ><div class="grid-content "></div
    ></el-col>
    <!-- Show customer's reviews END -->
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      ListReview: [
        {
          html:
            '"Maecenas porttitor vulputate dapibus. Suspendisse tempor turpis neque, vel gravida lorem luctus ut. Nam augue velit, commodo in laoreet in, sollicitudin nec felis.   --Admin"',
          imgPath: require("../assets/imgs/picture1.jpg"),
        },
        {
          html:
            '"Aliquam non vulputate ante. Donec commodo metus sed mauris dictum feugiat. Vestibulum pretium mi eget velit pulvinar. --Admin"',
          imgPath: require("../assets/imgs/picture2.jpg"),
        },
        {
          html:
            '"Nam augue velit, commodo in laoreet in, sollicitudin nec felis. Praesent ornare blandit est vel pellentesque. Aliquam non vulputate ante. Donec commodo metus sed mauris dictum feugiat. Vestibulum pretium mi eget velit pulvinar.   --Admin"',
          imgPath: require("../assets/imgs/picture3.jpg"),
        },
      ],
    };
  },
};
</script>

<style>
.ReviewCard {
  text-align: left;
  color: #e68877;
}

.ReviewCard p {
  font-size: 0.27rem;
  text-align: left;
}

.input {
  width: 100%;
  height: 10rem;
  margin-top: 0.1rem;
  background: #424242;
}

.col {
  text-align: center;
}

.ReviewCard li {
  margin-top: 0.1rem;
}

.ContentTitle {
  text-align: left;
  font-size: 0.4rem;
  color: #00000;
}

.el-aside {
  color: #333;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 20px;
  opacity: 0.75;
  line-height: 100rem;
  margin: 0;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.card-image {
  width: 30%;
  float: left;
  height: 4rem;
}
</style>

<style scoped>
.prosItem {
}
#products {
}
.item {
  text-align: center;
  font-size: 0.21rem;
  color: black;
  width: 5rem;
  border: 0.01rem solid #000;
  margin-left: 0.241rem;
  float: left;
}
.proitem {
  list-style: none;
}
.proitem h2 {
  color: #00001;
}
.reviewpic img {
  float: left;
  width: 15rem;
  height: 15rem;
  margin-left: 0.81rem;
  margin-right: 0.81rem;
  background-size: 100% auto;
}
.el-card {
  background: #f5f5f5;
}
.proinfo {
  text-align: left;
  font-size: 0.25rem;
  color: #acb2b8;
}
.grid-content {
  border-radius: 2px;
  min-height: 30px;
}
</style>
