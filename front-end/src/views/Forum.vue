<template>
  <div class="forum">
    <div class="main">
      <el-row gutter="20">
        <el-col :span="6" v-for="o in 10" :key="o">
          <el-card :body-style="{ padding: '0px' }">
            <img
              src="https://picb.zhimg.com/v2-fda0765ef8bf0f0ea4a74e68552cd0d6_r.jpg"
              class="image"
            />
            <div style="padding: 12px;">
              <span>How to match a beautiful bouquet?</span>
              <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentDate: new Date(),
    };
  },
};
</script>

<style scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  height: auto;
  width: 100%;
  align-items: center;
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

.forum {
  background-color: #f5f5f5;
}
.forum .main {
  margin: 0 auto;
  max-width: 1225px;
}
</style>
