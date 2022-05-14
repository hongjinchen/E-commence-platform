<template>
  <div id="MyAdmin" style="max-width: 1225px; margin-left: auto; margin-right: auto">

    <el-card>
      <el-row type="flex">
        <el-col>
          <h1>Admin</h1>
        </el-col>
        <el-col style="float: right; width: max-content">
          <el-button type="primary" @click="key = Math.random()">Refresh</el-button>
        </el-col>
      </el-row>


    </el-card>

    <el-card style="margin-top: 16px">
      <el-tabs v-model="activeName">

<!--Order Table-->
        <el-tab-pane label="Order" name="first">
          <el-row type="flex" style="margin-bottom: 16px">
            <el-col>
              <h2>Orders ({{Orders.length}})</h2>
            </el-col>
            <el-col style="width: max-content; float: right"></el-col>
          </el-row>

          <el-table :data="Orders" :key="key" border stripe>
            <el-table-column label="ID" prop="order_id" width="120px"></el-table-column>
            <el-table-column label="Customer" prop="user_name" width="100px"></el-table-column>
            <el-table-column label="Product" prop="product_name" width="100px"></el-table-column>
            <el-table-column label="Price" prop="product_price" width="100px"></el-table-column>
            <el-table-column label="Count" prop="product_num" width="100px"></el-table-column>
            <el-table-column label="Payment" prop="payment_info" width="100px"></el-table-column>
            <el-table-column label="Date" prop="order_time_readable" width="160px"></el-table-column>
            <el-table-column label="Shipping Information" prop="shipping_info"></el-table-column>
            <el-table-column label="Actions" width="74px">
              <template slot-scope="scope">
                <!-- 修改按钮 -->
                <el-button
                  type="danger"
                  icon="el-icon-edit"
                  size="mini"
                  style="float: right"
                  @click="editOrderDialogShow(scope.row.order_id)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

<!--Product Table-->
        <el-tab-pane label="Products" name="second">
          <el-row type="flex" style="margin-bottom: 16px">
            <el-col>
              <h2>Products ({{Products.length}})</h2>
            </el-col>
            <el-col style="width: max-content; float: right">
              <el-button type="primary" @click="addProductDialog=true">
                Add a product</el-button>
            </el-col>
          </el-row>

          <el-table :data="Products" border stripe>
            <el-table-column label="ID" prop="product_id" width="80px"></el-table-column>
            <el-table-column label="Title" prop="product_title" width="120px"></el-table-column>
            <el-table-column label="Category" prop="category_name" width="120px"></el-table-column>
            <el-table-column label="Name (show to customer)" prop="product_name"></el-table-column>
            <el-table-column label="Price" prop="product_price" width="100px"></el-table-column>
            <el-table-column label="Sell Price" prop="product_selling_price" width="100px"></el-table-column>
            <el-table-column label="Num" prop="product_num" width="100px"></el-table-column>
            <el-table-column label="Sale" prop="product_sales" width="100px"></el-table-column>
            <el-table-column label="Actions" width="120px">
              <template slot-scope="scope">
                <!--详情按钮-->
                <el-button
                  icon="el-icon-info"
                  size="mini"
                  @click="goToDetail(scope.row.product_id)"></el-button>
                <!-- 修改按钮 -->
                <el-button
                  type="danger"
                  icon="el-icon-edit"
                  size="mini"
                  @click="editProductDialogShow(scope.row.product_id)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

<!--User Table-->
        <el-tab-pane label="Users" name="third">
          <el-row type="flex" style="margin-bottom: 16px">
            <el-col>
              <h2>Users ({{Users.length}})</h2>
            </el-col>
            <el-col style="width: max-content; float: right">
              <el-button type="primary" @click="addUserDialog=true">
                Add a user</el-button>
            </el-col>
          </el-row>

          <el-table :data="Users" border stripe>
            <el-table-column label="ID" prop="user_id" width="80px"></el-table-column>
            <el-table-column label="Email" prop="userEmail"></el-table-column>
            <el-table-column label="Username" prop="userName"></el-table-column>
            <el-table-column label="Actions" width="120px">
              <template slot-scope="scope">
                <!--详情按钮-->
                <el-button
                  type="warning"
                  icon="el-icon-document"
                  size="mini"
                  @click="userOrderDialogShow(scope.row.user_id)"></el-button>
                <!-- 修改按钮 -->
                <el-button
                  type="danger"
                  icon="el-icon-edit"
                  size="mini"
                  @click="editUserDialogShow(scope.row.user_id)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

      </el-tabs>
    </el-card>

<!--addUser dialog-->
    <el-dialog
      title="Add a user"
      :visible.sync="addUserDialog"
      width="50%"
    >
      <!--主体区域-->
      <el-form
        :model="addUserForm"
        label-width="100px"
      >
        <el-form-item label="Username" prop="username">
          <el-input v-model="addUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="addUserForm.password"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="addUserForm.email"></el-input>
        </el-form-item>
      </el-form>
      <!--底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addUserCancel">
          Cancel</el-button>
        <el-button type="primary" @click="addUser">
          Upload</el-button>
      </span>
    </el-dialog>

<!--editUser dialog-->
    <el-dialog
      title="Edit user"
      :visible.sync="editUserDialog"
      width="50%"
    >
      <!--主体区域-->
      <el-form
        :model="editUserForm"
        label-width="100px"
      >
        <el-form-item label="ID" prop="user_id">
          <el-input v-model="editUserForm.user_id" readonly></el-input>
        </el-form-item>
        <el-form-item label="Username" prop="username">
          <el-input v-model="editUserForm.userName" readonly></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="editUserForm.password"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="editUserForm.userEmail"></el-input>
        </el-form-item>
        <el-form-item label="Address" prop="email">
          <el-input type="textarea" v-model="editUserForm.user_address"></el-input>
        </el-form-item>
      </el-form>
      <!--底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="deleteUser" style="margin-right: 80px">
          Delete</el-button>
        <el-button @click="editUserCancel">
          Cancel</el-button>
        <el-button type="primary" @click="editUser">
          Update</el-button>
      </span>
    </el-dialog>

<!--addProduct dialog-->
    <el-dialog
      title="Add a product"
      :visible.sync="addProductDialog"
      width="50%"
    >
      <!--主体区域-->
      <el-form
        :model="addProductForm"
        label-width="100px"
      >
        <el-row type="flex">
          <el-col>
            <el-form-item label="Title" prop="product_title">
              <el-input v-model="addProductForm.product_title"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="Category" prop="category_name">
              <el-input v-model="addProductForm.category_name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="Name" prop="product_name">
          <el-input v-model="addProductForm.product_name"></el-input>
        </el-form-item>
        <el-form-item label="Introduction" prop="product_intro">
          <el-input type="textarea" v-model="addProductForm.product_intro"></el-input>
        </el-form-item>
        <el-form-item label="Picture" prop="product_picture">
<!--          <el-input type="File"-->
<!--                    accept="image/jpeg,image/gif,image/png,image/jpg"-->
<!--                    v-model="addProductForm.product_picture"></el-input>-->
          <el-input v-model="addProductForm.product_picture"></el-input>
        </el-form-item>

        <el-row type="flex">
          <el-col>
            <el-form-item label="Price" prop="product_price">
              <el-input v-model="addProductForm.product_price"
                        oninput="value=value.replace(/[^0-9.]/g,'')"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="Selling Price" prop="product_selling_price">
              <el-input v-model="addProductForm.product_selling_price"
                        oninput="value=value.replace(/[^0-9.]/g,'')"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col>
            <el-form-item label="Num" prop="product_num">
              <el-input v-model="addProductForm.product_num"
                        oninput="value=value.replace(/[^\d]/g,'')"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="Sales" prop="product_sales">
              <el-input v-model="addProductForm.product_sales"
                        oninput="value=value.replace(/[^\d]/g,'')"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <!--底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addProductCancel">
          Cancel</el-button>
        <el-button type="primary" @click="addProduct">
          Upload</el-button>
      </span>
    </el-dialog>

<!--editProduct dialog-->
    <el-dialog
      title="Edit product"
      :visible.sync="editProductDialog"
      width="50%"
    >
      <!--主体区域-->
      <el-form
        :model="editProductForm"
        label-width="100px"
      >
        <el-form-item label="ID" prop="product_name">
          <el-input v-model="editProductForm.product_id" readonly></el-input>
        </el-form-item>
        <el-row type="flex">
          <el-col>
            <el-form-item label="Title" prop="product_title">
              <el-input v-model="editProductForm.product_title" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="Category" prop="category_name">
              <el-input v-model="editProductForm.category_name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="Name" prop="product_name">
          <el-input v-model="editProductForm.product_name"></el-input>
        </el-form-item>
        <el-form-item label="Introduction" prop="product_intro">
          <el-input type="textarea" v-model="editProductForm.product_intro"></el-input>
        </el-form-item>
        <el-form-item label="Picture" prop="product_picture">
<!--          <el-input type="File"-->
<!--                    accept="image/jpeg,image/gif,image/png,image/jpg"-->
<!--                    v-model="editProductForm.product_picture"></el-input>-->
          <el-input v-model="editProductForm.product_picture"></el-input>
        </el-form-item>

        <el-row type="flex">
          <el-col>
            <el-form-item label="Price" prop="product_price">
              <el-input v-model="editProductForm.product_price"
                        oninput="value=value.replace(/[^0-9.]/g,'')"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="Selling Price" prop="product_selling_price">
              <el-input v-model="editProductForm.product_selling_price"
                        oninput="value=value.replace(/[^0-9.]/g,'')"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col>
            <el-form-item label="Num" prop="product_num">
              <el-input v-model="editProductForm.product_num"
                        oninput="value=value.replace(/[^\d]/g,'')"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="Sales" prop="product_sales">
              <el-input v-model="editProductForm.product_sales"
                        oninput="value=value.replace(/[^\d]/g,'')"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <!--底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="deleteProduct" style="margin-right: 80px">
          Delete</el-button>
        <el-button @click="editProductCancel">
          Cancel</el-button>
        <el-button type="primary" @click="editProduct">
          Update</el-button>
      </span>
    </el-dialog>

<!--editOrder dialog-->
    <el-dialog
      title="Edit Order"
      :visible.sync="editOrderDialog"
      width="50%"
    >
      <!--主体区域-->
      <el-form
        :model="editOrderForm"
        label-width="100px"
      >

        <el-row type="flex">
          <el-col>
            <el-form-item label="Order ID" prop="order_id">
              <el-input v-model="editOrderForm.order_id" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="Time" prop="order_time_readable">
              <el-input v-model="editOrderForm.order_time_readable" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="Customer" prop="user_name">
          <el-input v-model="editOrderForm.user_name" readonly></el-input>
        </el-form-item>

        <el-divider direction="horizontal" content-position="center"/>

        <el-form-item label="Product" prop="product_name">
          <el-input v-model="editOrderForm.product_name" readonly></el-input>
        </el-form-item>

        <el-row type="flex">
          <el-col>
            <el-form-item label="Count" prop="product_num">
              <el-input v-model="editOrderForm.product_num"
                        oninput="value=value.replace(/[^\d]/g,'')"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="Single Price" prop="product_price">
              <el-input v-model="editOrderForm.product_price"
                        oninput="value=value.replace(/[^0-9.]/g,'')"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-divider direction="horizontal" content-position="center"/>

        <el-form-item label="Payment" prop="payment_info">
          <el-input v-model="editOrderForm.payment_info"></el-input>
        </el-form-item>
        <el-form-item label="Shipping" prop="shipping_info">
          <el-input v-model="editOrderForm.shipping_info"></el-input>
        </el-form-item>

      </el-form>

      <!--底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="deleteOrder" style="margin-right: 80px">
          Delete</el-button>
        <el-button @click="editOrderCancel">
          Cancel</el-button>
        <el-button type="primary" @click="editOrder">
          Update</el-button>
      </span>
    </el-dialog>

<!--userOrder dialog-->
    <el-dialog
      title="Orders of User"
      :visible.sync="userOrderDialog"
      width="80%"
    >
      <!--主体区域-->
      <el-form
        :model="userOrderForm"
        label-width="100px"
      >
        <el-row type="flex">
          <el-col>
            <el-form-item label="ID" prop="user_id">
              <el-input v-model="userOrderForm.user_id" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="Username" prop="userName">
              <el-input v-model="userOrderForm.userName" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>

<!--        <el-form-item label="Email" prop="userEmail">-->
<!--          <el-input v-model="userOrderForm.userEmail" readonly></el-input>-->
<!--        </el-form-item>-->

        <el-form-item label="Address" prop="user_address">
          <el-input v-model="userOrderForm.user_address" readonly></el-input>
        </el-form-item>
      </el-form>

      <el-divider direction="horizontal" content-position="center"/>

      <div style="font-size: 20px; margin-bottom: 16px">Orders</div>

      <el-table :data="this.userOrderForm.orders" :key="key" border stripe>
        <el-table-column label="ID" prop="order_id" width="120px"></el-table-column>
        <el-table-column label="Customer" prop="user_name" width="100px"></el-table-column>
        <el-table-column label="Product" prop="product_name" width="100px"></el-table-column>
        <el-table-column label="Price" prop="product_price" width="100px"></el-table-column>
        <el-table-column label="Count" prop="product_num" width="100px"></el-table-column>
        <el-table-column label="Payment" prop="payment_info" width="100px"></el-table-column>
        <el-table-column label="Date" prop="order_time_readable" width="160px"></el-table-column>
        <el-table-column label="Shipping Information" prop="shipping_info"></el-table-column>
      </el-table>

      <!--底部区域-->
<!--      <span slot="footer" class="dialog-footer">-->
<!--        <el-button type="danger" @click="deleteOrder" style="margin-right: 80px">-->
<!--          Delete</el-button>-->
<!--        <el-button @click="editOrderCancel">-->
<!--          Cancel</el-button>-->
<!--        <el-button type="primary" @click="editOrder">-->
<!--          Update</el-button>-->
<!--      </span>-->
    </el-dialog>

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
      Categories: [],

      key: 0,

      activeName: "first",

      addUserDialog: false,
      editUserDialog: false,
      addUserForm: {
        username: "",
        password: "",
        email: "",
      },
      editUserForm: {
        user_id: "",
        userName: "",
        password: "",
        userEmail: "",
        user_address: "",
      },

      addProductDialog: false,
      editProductDialog: false,
      addProductForm: {
        product_name: "",
        category_id: "",
        category_name: "None",
        product_title: "",
        product_intro: "",
        product_picture: null,
        product_price: "9999",
        product_selling_price: "9999",
        product_num: "0",
        product_sales: "0",
      },
      editProductForm: {
        product_id: "",
        product_name: "",
        category_id: "",
        category_name: "None",
        product_title: "",
        product_intro: "",
        product_picture: null,
        product_price: "9999",
        product_selling_price: "9999",
        product_num: "0",
        product_sales: "0",
      },

      editOrderDialog: false,
      editOrderForm: {
        order_id: "",
        user_id: "",
        user_name: "",
        product_id: "",
        product_name: "",
        product_num: "",
        product_price: "",
        order_time: "",
        order_time_readable :"",
        shipping_info: "Waiting for update",
        payment_info: "Payed"
      },

      userOrderDialog: false,
      userOrderForm: {
        user_id: "",
        userName: "",
        userEmail: "",
        user_address: "",
        orders: [],
      }
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
            console.log("Admin login status: ", r.data);
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
                    if(re.data.error === false){
                      this.Users = re.data.users;
                      console.log("Users: ", this.Users);

                      for(let i=0; i<this.Orders.length; i++){
                        this.Orders[i].user_name = this.findUserById(this.Orders[i].user_id);
                      }
                    }
                  })
    // products end
    // Get all categories
              this.$axios({
                method: "POST",
                url: "/api/back-end/category.php?action=getCategories"
              })
                  .then((re) => {
                    this.Categories = re.data.categories;
        // Get all products
                    this.$axios({
                      method: "POST",
                      url: "/api/back-end/product.php?action=getAllProducts"
                    })
                        .then((re) => {
                          this.Products = re.data.products;
                          console.log("Products: ", this.Products)
            // find empty category
                          const c = new Set();
                          for(let i=0; i<this.Products.length; i++){
                            this.Products[i].category_name = this.findCategoryById(this.Products[i].category_id);
                            c.add(this.Products[i].category_id);
                          }
                          let buf = [];
                          for(let j=0; j<this.Categories.length; j++){
                            if(c.has(this.Categories[j].category_id)){
                              buf[buf.length] = this.Categories[j];
                            }
                            else{
                              let f = new FormData()
                              f.append("category_id", this.Categories[j].category_id)
            // Delete empty category
                              this.$axios({
                                method: "POST",
                                url: "/api/back-end/category.php?action=deleteCategory",
                                data: f,
                              })
                                  .then((res) => {
                                    console.log(res.data);
                                  })

                            }
                          }
                          this.Categories = buf;
                          console.log("Categories: ", this.Categories);

                          for(let i=0; i<this.Orders.length; i++){
                            this.Orders[i].product_name = this.findProductById(this.Orders[i].product_id);
                          }
                        })
        // products end
                  })
    // categories end
    // Get all orders
              this.$axios({
                method: "POST",
                url: "/api/back-end/order.php?action=getAllOrders"
              })
                  .then((re) =>{
                    this.Orders = re.data.orders;
                    for(let i=0; i<this.Orders.length; i++){
                      this.Orders[i].order_time_readable = this.timetrans(this.Orders[i].order_time);
                      if(this.Orders[i].payment_info === ""){
                        this.Orders[i].payment_info = "Payed";
                      }
                      if(this.Orders[i].shipping_info === ""){
                        this.Orders[i].shipping_info = "Waiting for update";
                      }
                      this.Orders[i].product_name = this.findProductById(this.Orders[i].product_id);
                      this.Orders[i].user_name = this.findUserById(this.Orders[i].user_id);
                    }

                    console.log("Orders: ", this.Orders);
                  })
    // Orders end
            }
          })
//state end
    },

    findCategoryByName(category){
      for(let i=0; i<this.Categories.length; i++){
        if(this.Categories[i].category_name === category){
          return this.Categories[i].category_id;
        }
      }
      return -1;
    },

    findCategoryById(id) {
      for(let i=0; i<this.Categories.length; i++){
        if(this.Categories[i].category_id === id){
          return this.Categories[i].category_name;
        }
      }
      return "None";
    },

    findUserById(id){
      for(let i=0; i<this.Users.length; i++){
        if(this.Users[i].user_id === id){
          return this.Users[i].userName;
        }
      }

      return "None";
    },

    findProductById(id){
      for(let i=0; i<this.Products.length; i++){
        if(this.Products[i].product_id === id){
          return this.Products[i].product_name;
        }
      }

      return "None";
    },

    addUser(){
      let fd = new FormData();
      fd.append("username", this.addUserForm.username);
      fd.append("password", this.addUserForm.password);
      fd.append("email", this.addUserForm.email);

      this.$axios({
        method: "POST",
        url: "/api/back-end/userAdmin.php?action=addUser",
        data: fd,
      })
          .then((r) => {
            console.log("addUser: ", r.data);
            if(r.data.error === true){
              this.notifyError("Add user failed");
            }
            else{
              this.notifySucceed("Succeed!");
              location.reload();
            }
          })
    },

    addUserCancel(){
      this.addUserForm = {
        username: "",
        password: "",
        email: "",
      }

      this.addUserDialog = false;
    },

    editUserDialogShow(user_id){
      let buf = {}

      for(let i=0; i<this.Users.length; i++){
        if(this.Users[i].user_id === user_id){
          buf = {
            user_id: this.Users[i].user_id,
            userName: this.Users[i].userName,
            password: this.Users[i].password,
            userEmail: this.Users[i].userEmail,
            user_address: this.Users[i].user_address,
          }
          break;
        }
      }

      this.editUserForm = buf;
      this.editUserDialog = true;
    },

    editUser(){
      let fd = new FormData;
      fd.append("user_id", this.editUserForm.user_id);
      fd.append("username", this.editUserForm.userName);
      fd.append("password", this.editUserForm.password);
      fd.append("email", this.editUserForm.userEmail);
      fd.append("user_address", this.editUserForm.user_address);

      this.$axios({
        method: "POST",
        url: "/api/back-end/userAdmin.php?action=editUser",
        data: fd,
      })
          .then((r) => {
            console.log("editUser: ", r.data);
            if(r.data.error === true){
              this.notifyError("Update user failed");
            }
            else{
              this.notifySucceed("Succeed!");
              location.reload();
            }
          })
    },

    editUserCancel(){
      this.editUserForm = {
        user_id: "",
        userName: "",
        password: "",
        userEmail: "",
        user_address: "",
      }

      this.editUserDialog = false;
    },

    deleteUser(){
      let fd = new FormData();
      fd.append("user_id", this.editUserForm.user_id);

      this.$axios({
        method: "POST",
        url: "/api/back-end/userAdmin.php?action=deleteUser",
        data: fd,
      })
          .then((r) => {
            console.log("deleteUser: ", r.data);
            if(r.data.error === true){
              this.notifyError("Delete user failed");
            }
            else{
              this.notifySucceed("Succeed!");
              location.reload();
            }
          })
    },

    addProduct(){
      let fd = new FormData();
      fd.append("product_name", this.addProductForm.product_name);
      fd.append("product_title", this.addProductForm.product_title);
      fd.append("product_intro", this.addProductForm.product_intro);
      fd.append("product_picture", this.addProductForm.product_picture);
      fd.append("product_price", this.addProductForm.product_price);
      fd.append("product_selling_price", this.addProductForm.product_selling_price);
      fd.append("product_num", this.addProductForm.product_num);
      fd.append("product_sales", this.addProductForm.product_sales);

      // is category exist?
      let category_id = this.findCategoryByName(this.addProductForm.category_name);
      if(category_id === -1){

        // category does not exist
        let f = new FormData();
        f.append("category_name", this.addProductForm.category_name)

        // Add category
        this.$axios({
          method: "POST",
          url: "/api/back-end/category.php?action=addCategory",
          data: f
        })
            .then((r) => {
              console.log("addCategory: ", r.data);
              if(r.data.error){
                this.notifyError("Add category failed");
                return;
              }

              // Re-load category
              this.$axios({
                method: "POST",
                url: "/api/back-end/category.php?action=getCategories",
              })
                  .then((re) => {
                    console.log("reloadCategories: ", re.data);
                    this.Categories = re.data.categories;
                    category_id = this.findCategoryByName(this.addProductForm.category_name)
                    fd.append("category_id", category_id);

                    // Add product
                    this.$axios({
                      method: "POST",
                      url: "/api/back-end/product.php?action=addProduct",
                      data: fd,
                    })
                        .then((res) => {
                          console.log("addProduct: ", res.data);
                          if(res.data.error){
                            this.notifyError("Add product failed");
                            return;
                          }
                          this.notifySucceed("Add project succeed")
                          location.reload();
                        })
                  })
            })

        return;
      }

      // category exist, add product
      fd.append("category_id", category_id);
      this.$axios({
        method: "POST",
        url: "/api/back-end/product.php?action=addProduct",
        data: fd,
      })
          .then((r) => {
            console.log("addProduct: ", r.data);
            if(r.data.error){
              this.notifyError("Add product failed");
              return;
            }
            this.notifySucceed("Add project succeed")
            location.reload();
          })
    },

    addProductCancel(){
      this.addProductForm = {
        product_name: "",
        category_id: "",
        product_title: "",
        product_intro: "",
        product_picture: null,
        product_price: "9999",
        product_selling_price: "9999",
        product_num: "0",
        product_sales: "0",
      }

      this.addProductDialog = false;
    },

    editProductDialogShow(product_id){
      let buf = {};

      for(let i=0; i<this.Products.length; i++){
        if(this.Products[i].product_id === product_id){
          buf = {
            product_id: this.Products[i].product_id,
            product_name: this.Products[i].product_name,
            category_id: this.Products[i].category_id,
            category_name: this.Products[i].category_name,
            product_title: this.Products[i].product_title,
            product_intro: this.Products[i].product_intro,
            product_picture: this.Products[i].product_picture,
            product_price: this.Products[i].product_price,
            product_selling_price: this.Products[i].product_selling_price,
            product_num: this.Products[i].product_num,
            product_sales: this.Products[i].product_sales,
          };
          break;
        }
      }

      this.editProductForm = buf;
      this.editProductDialog = true;
    },

    editProduct(){
      let fd = new FormData();
      fd.append("product_id", this.editProductForm.product_id);
      fd.append("product_name", this.editProductForm.product_name);
      fd.append("product_title", this.editProductForm.product_title);
      fd.append("product_intro", this.editProductForm.product_intro);
      fd.append("product_picture", this.editProductForm.product_picture);
      fd.append("product_price", this.editProductForm.product_price);
      fd.append("product_selling_price", this.editProductForm.product_selling_price);
      fd.append("product_num", this.editProductForm.product_num);
      fd.append("product_sales", this.editProductForm.product_sales);

      // is category exist?
      let category_id = this.findCategoryByName(this.editProductForm.category_name);
      if(category_id === -1){

        // category does not exist
        let f = new FormData();
        f.append("category_name", this.editProductForm.category_name)

        // Add category
        this.$axios({
          method: "POST",
          url: "/api/back-end/category.php?action=addCategory",
          data: f
        })
            .then((r) => {
              console.log("addCategory: ", r.data);
              if(r.data.error){
                this.notifyError("Add category failed");
                return;
              }

              // Re-load category
              this.$axios({
                method: "POST",
                url: "/api/back-end/category.php?action=getCategories",
              })
                  .then((re) => {
                    console.log("reloadCategories: ", re.data);
                    this.Categories = re.data.categories;
                    category_id = this.findCategoryByName(this.addProductForm.category_name)
                    fd.append("category_id", category_id);

                    // Add product
                    this.$axios({
                      method: "POST",
                      url: "/api/back-end/product.php?action=editProduct",
                      data: fd,
                    })
                        .then((res) => {
                          console.log("editProduct: ", res.data);
                          if(res.data.error){
                            this.notifyError("Edit product failed");
                            return;
                          }
                          this.notifySucceed("Edit project succeed")
                          location.reload();
                        })
                  })
            })

        return;
      }

      // category exist, add product
      fd.append("category_id", category_id);
      this.$axios({
        method: "POST",
        url: "/api/back-end/product.php?action=editProduct",
        data: fd,
      })
          .then((r) => {
            console.log("editProduct: ", r.data);
            if(r.data.error){
              this.notifyError("Edit product failed");
              return;
            }
            this.notifySucceed("Edit project succeed")
            location.reload();
          })
    },

    goToDetail(index) {
      // 前往详情页
      alert(index);
      this.$router.push({
        path: "/goods/details",
        query: { productID: index },
      });
    },

    editProductCancel(){
      this.editProductForm = {
        product_id: "",
        product_name: "",
        category_id: "",
        product_title: "",
        product_intro: "",
        product_picture: null,
        product_price: "9999",
        product_selling_price: "9999",
        product_num: "0",
        product_sales: "0",
      }

      this.editProductDialog = false;
    },

    deleteProduct(){
      let fd = new FormData();
      fd.append("product_id", this.editProductForm.product_id);

      this.$axios({
        method: "POST",
        url: "/api/back-end/product.php?action=deleteProduct",
        data: fd,
      })
          .then((r) => {
            console.log("deleteProduct: ", r.data);
            if(r.data.error === true){
              this.notifyError("Delete product failed");
            }
            else{
              this.notifySucceed("Succeed!");
              location.reload();
            }
          })
    },

    editOrderDialogShow(order_id){
      let buf = {};

      for(let i=0; i<this.Orders.length; i++){
        if(this.Orders[i].order_id === order_id){
          buf = {
            order_id: this.Orders[i].order_id,
            user_id: this.Orders[i].user_id,
            user_name: this.Orders[i].user_name,
            product_id: this.Orders[i].product_id,
            product_name: this.Orders[i].product_name,
            product_num: this.Orders[i].product_num,
            product_price: this.Orders[i].product_price,
            order_time: this.Orders[i].order_time,
            order_time_readable: this.Orders[i].order_time_readable,
            shipping_info: this.Orders[i].shipping_info,
            payment_info: this.Orders[i].payment_info
          }
          break;
        }
      }

      this.editOrderForm = buf;
      this.editOrderDialog = true;
    },

    editOrder(){
      let fd = new FormData();
      fd.append("order_id", this.editOrderForm.order_id);
      fd.append("product_num", this.editOrderForm.product_num);
      fd.append("product_price", this.editOrderForm.product_price);
      fd.append("shipping_info", this.editOrderForm.shipping_info);
      fd.append("payment_info", this.editOrderForm.payment_info);

      this.$axios({
        method: "POST",
        url: "/api/back-end/order.php?action=editOrder",
        data: fd,
      })
          .then((r) =>{
            console.log("editOrder: ", r.data);
            if(r.data.error === true){
              this.notifyError("Update order failed");
            }
            else{
              this.notifySucceed("Succeed!");
              location.reload();
            }
          })
    },

    editOrderCancel(){
      this.editOrderForm = {
        order_id: "",
        user_id: "",
        user_name: "",
        product_id: "",
        product_name: "",
        product_num: "",
        product_price: "",
        order_time: "",
        order_time_readable :"",
        shipping_info: "Waiting for update",
        payment_info: "Payed"
      }

      this.editOrderDialog = false;
    },

    deleteOrder(){
      let fd = new FormData();
      fd.append("order_id", this.editOrderForm.order_id);

      this.$axios({
        method: "POST",
        url: "/api/back-end/order.php?action=deleteOrder",
        data: fd,
      })
          .then((r) =>{
            console.log("deleteOrder: ", r.data);
            if(r.data.error === true){
              this.notifyError("Delete order failed");
            }
            else{
              this.notifySucceed("Succeed!");
              location.reload();
            }
          })
    },

    timetrans(order_time){
      let date = new Date(order_time *1000);//如果date为13位不需要乘1000
      let Y = date.getFullYear() + '-';
      let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
      let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
      let m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
      let s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
      return Y+M+D+h+m+s;
    },

    userOrderDialogShow(user_id){
      let buf = {};
      for(let i=0; i<this.Users.length; i++){
        if(this.Users[i].user_id === user_id){
          buf = {
            user_id: user_id,
            userName: this.Users[i].userName,
            userEmail: this.Users[i].userEmail,
            user_address: this.Users[i].user_address,
            orders: []
          }
          break;
        }
      }

      for(let i=0; i<this.Orders.length; i++){
        if(this.Orders[i].user_id === user_id){
          buf.orders[buf.orders.length] = this.Orders[i]
        }
      }

      this.userOrderForm = buf;
      this.userOrderDialog = true;
    }
  }
}
</script>

<style scoped>
h1{
  font-size: 36px;
}

h2{
  font-size: 28px;
  font-family: "Calibri Light";
  margin-right: 32px;
}
</style>