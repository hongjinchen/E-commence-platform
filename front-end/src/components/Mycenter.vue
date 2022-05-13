<template>
  <div>
    <div>User name: {{ user.name }}</div>
    <div>User email: {{ user.email }}</div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>User address</span>
        <el-button
          @click="dialogFormVisible=true"
          style="float: right; padding: 3px 0"
          type="text"
          >Add new address</el-button
        >
      </div>
      <div v-for="(item, index) in user.order" :key="index" class="text item">
        <el-card>
          <el-row>
            <el-col :span="20"
              ><div class="grid-content bg-purple">
                <div>Receiver:{{ item.receiver }}</div>
                <div>Phone Number:{{ item.phoneNumber }}</div>
                <div>Address:{{ item.address }}</div>
              </div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content bg-purple-light">
                <el-button @click="deletAddress(index)">
                  <img
                    style="height:15px;width:15px"
                    src="../assets/imgs/sami-select.png"
                  />
                </el-button></div
            ></el-col>
          </el-row>
        </el-card>
      </div>
    </el-card>
    <el-dialog
      width="30%"
      title="内层 Dialog"
      :visible.sync="innerVisible"
      append-to-body>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
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
    };
  },
  created() {
    this.getUserInfo();
  },

  methods: {
    ...mapActions(["setUser", "setShowLogin"]),

    getUserInfo() {
      console.log(this.$store.state.userName);
      console.log(this.$store.state.islogin);
      this.user.name = this.$store.state.userName;
      console.log(this.$store.state.userName);
    },
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
    open() {
      this.$prompt("Please enter a new address", "Input", {
        confirmButtonText: "Continue",
        cancelButtonText: "Cancel",
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "Your address is " + value,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Cancel the action",
          });
        });
    },
  },
};
</script>
<style scoped>
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
</style>
