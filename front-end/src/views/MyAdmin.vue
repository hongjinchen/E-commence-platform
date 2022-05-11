<template>
  <div id="MyAdmin" style="max-width: 1225px; margin-left: auto; margin-right: auto">

    <el-card>
      <h1>Admin</h1>
      <div style="margin-top: 60px; margin-bottom: 10px; display: -webkit-flex">
        <h2>Orders: {{this.Orders.length}}</h2>
        <h2>/</h2>
        <h2>Products: {{this.Products.length}}</h2>
        <h2>/</h2>
        <h2>Active Users: {{this.Users.length}}</h2>
        <h2></h2>
      </div>
    </el-card>

  </div>
</template>

<script>
export default {
  name: "MyAdmin",

  data() {
    return{
      Users: [],
      Orders: [],
      Products: [],
    }
  },

  created() {
    this.init()
  },

  methods: {
    init(){
// Get login state
      this.$axios({
        method: "POST",
        url: "/api/back-end/user.php?action=adminLoginChecker"
      })
          .then((r) => {
            console.log(r.data);
            if(r.data.error === true){
              this.notifyError("please login with an admin account");
            }
            else{
    // Get all users
              this.$axios({
                method: "POST",
                url: "/api/back-end/userAdmin.php?action=getAllUsers",
              })
                  .then((re) => {
                    console.log(re.data);
                    if(re.data.error === false){
                      this.Users = re.data.users;
                      for(let i=0; i<this.Users.length; i++){
                        let fd= new FormData();
                        fd.append("user_id", this.Users[i].user_id)
        // Get all orders
                        this.$axios({
                          method: "POST",
                          url: "/api/back-end/order.php?action=getUserOrders",
                          data: fd
                        })
                            .then((res) => {
                              console.log(res.data);
                              let buf = res.data.products;
                              this.Products.concat(buf);
                            })
        // orders end
                      }
                    }
                  })
    // products end
    // Get all products
              this.$axios({
                method: "POST",
                url: "/api/back-end/product.php?action=getAllProducts"
              })
                  .then((re) => {
                    console.log(re.data);
                    this.Products = re.data.products;
                  })
    // products end
            }
          })
//state end
    },
  }
}
</script>

<style scoped>
h1{
  font-size: 36px;
}

h2{
  font-size: 20px;
  font-family: "Calibri Light";
  margin-right: 32px;
}
</style>