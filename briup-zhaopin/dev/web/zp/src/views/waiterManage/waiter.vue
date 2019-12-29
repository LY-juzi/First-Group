/*
 * @Author: liuyr 
 * 客服列表页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: lijunkun
 * @Last Modified time: 2019-12-29 20:14:23
 */
<template>
  <div id="businessList">
    <!-- {{waiterData}}
    {{statusData}} -->
    <!-- 搜索框 -->
    <div class="searchDiv">
      <el-select @change="statusChange" size="small" v-model="status" clearable placeholder="状态">
        <el-option
          v-for="item in statusData"
          :key="item"
          :label="item"
          :value="item">
          </el-option>
      </el-select>
      <el-select @change="genderChange" size="small" v-model="gender" clearable placeholder="性别">
        <el-option v-for="item in genderData"
         :key="item"
         :label="item"
         :value="item">
         </el-option>
      </el-select>
    </div>
    <div class="btn">
        <!-- 按钮 -->
        <el-button @click="addWaiter" class="butt" size="small" type="primary" icon="el-icon-info" style="background:rgb(235, 108, 50)">添加客服</el-button>
        <el-button @click="Import" class="butt" size="small" type="primary" icon="el-icon-info">导入客服</el-button>
      </div>
      <!-- 按关键字搜索 -->
     <div class="search">
          <el-input clearable @change="inputChange" placeholder="请输入" v-model="inputvalue" size="small">
            <el-select style="width:100px" v-model="searchType" slot="prepend" placeholder="关键字" size="small">
              <el-option label="用户ID" value="id"></el-option >
              <el-option label="用户名" value="username"></el-option>
            </el-select>
            <el-button @click="tofind(inputvalue)" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
    <!-- 列表框-->
    <div class="tableDiv">
      <el-table
        ref="multipleTable"
        :data="customerList"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{background:'#87CEEB',color:'#FFFFFF'}"
        @selection-change ="selectionChange" >
        <el-table-column align="center" type="selection" width="55"></el-table-column>
        <el-table-column align="center" prop="username" label="用户名"></el-table-column>
        <el-table-column align="center" prop="realname" label="姓名"></el-table-column>
        <el-table-column align="center" prop="gender" label="性别"></el-table-column>
        <el-table-column align="center" prop="status" label="状态"></el-table-column>
        <el-table-column align="center" label="分配工作">
          <template slot-scope="scope">
            <el-button @click="toSee(scope.row)" type="text" size="small">分配</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="toDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="footerDiv">
      <div class="btnDiv">
        <el-button @click="toBatchDelete" size="mini" type="danger" plain>批量删除</el-button>
      </div>
      <div class="pageDiv">
        <el-pagination
          :page-size="pageSize"
          :current-page.sync="currentPage"
          background
          @current-change="pageChange"
          layout="prev, pager, next"
          :total="customerData.length"
        ></el-pagination>
      </div>
    </div>
<!-- 修改模态框 -->
     <el-dialog title="添加客服信息" :visible.sync="addWai">
      <el-form :model="addform" :rules="rules" ref="ruleForm">
        <el-form-item prop="username" label="用户名" :label-width="formLabelWidth" >
          <el-input v-model="addform.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="realname" label="姓名" :label-width="formLabelWidth">
          <el-input v-model="addform.realname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="gender" label="性别" :label-width="formLabelWidth">
          <el-select clearable v-model="addform.gender" placeholder="请选择性别">
           <el-option v-for="item in genderData" :key="item"  :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="status" label="状态" :label-width="formLabelWidth">
           <el-select clearable v-model="addform.status" placeholder="请选择状态">
             <el-option v-for="item in statusData" :key="item"  :label="item" :value="item"></el-option>
           </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="toCancel('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="toSave('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
  
</template>

<script>
import { findAllCustomer,deleteById,findByStatus,findByGender,findById,findByUsername,saveOrUpdate} from "@/api/customer-service.js";
import config from "@/utils/config.js";
export default {
  data() {
    return {
      rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          realname:[
            { required: true, message: '请输入真实姓名', trigger: 'blur' },
          ],
          gender:[
            { required: true, message: '请输入性别', trigger: 'blur' },
          ],
          status:[
            { required: true, message: '请输入状态', trigger: 'blur' },
          ],
         
        },
     addWai: false,
        addform: {
          username: '',
          realname: '',
          gender: '',
          status: '',  
        },
         addWai:false,
      //状态
      status: "",
      //性别
      gender: "",
      //状态数组
      statusData: [],
      //性别数组
      genderData: [],
      //客服数组
      customerData:[],
      //当前页
      currentPage: 1,
      //每页条数
      pageSize: config.pageSize,
      //批量删除ids
      ids: [],
      //当前查看或修改的对象
      currentBus: {},
      //查看模态框显示与否
      seeVisible: false,
      //修改模态框显示与否
      editVisible: false,
      //修改模态框标题名称所占宽度
      formLabelWidth: "80px",
      searchType:'',
      inputvalue:''
    };
  },
  computed: {
    //分页数据
    customerList() {
      let temp = [...this.customerData];
      let page = this.currentPage;
      let pageSize = config.pageSize;
      return temp.slice((page - 1) * pageSize, page * pageSize);
    }
  },
  methods: {
        //改变关键字选项
    inputChange(inputvalue){
      this.findAllCustomer();
    },
    //搜索功能
    async tofind(inputvalue){
      this.gender = "";
      this.status = "";
      if(this.searchType === "username"){
        if(inputvalue){
          
          try {
            let res = await findByUsername({username:inputvalue});
            this.customerData = res.data;
            this.currentPage = 1;
          } catch (error) {
            config.errorMsg(this,'没有相关信息');
          }
        }
        else{
          this.findAllCustomer();
        }
      }
      else{
        if(inputvalue){
          try {
            let res = await findById({id:inputvalue});
            this.customerData = res.data;
            this.currentPage = 1;
          } catch (error) {
            config.errorMsg(this,'没有相关信息');
          }
        }
        else{
          this.findAllCustomer();
        }
      }
      
    },
    
    // 页数发生改变
    pageChange(page) {
      this.currentPage = page;
    },

    //状态发生改变
    async statusChange(val) {
      this.gender = "";
      //val 是option的value值
      console.log('-----',val);
      if (val) {
        try {
          let res = await findByStatus({ status: val });
          this.customerData = res.data;
          this.currentPage = 1;
        } catch (error) {
          config.errorMsg(this, "通过状态查找客服信息错误");
        }
      } else {
        this.findAllCus();
      }
    },
    //性别发生改变
    async genderChange(val) {
      this.status = "";
      //val 是option的value值
      if (val) {
        try {
          let res = await findByGender({ gender: val });
          this.customerData = res.data;
          this.currentPage = 1;
        } catch (error) {
          config.errorMsg(this, "通过性别查找客服信息错误");
        }
      } else {
        this.findAllCus();
      }
    },
    //右上角，模态框关闭之前
    beforeClose(){
      //重置表单验证，关闭模态框
      this.$refs["ruleForm"].resetFields();
      this.addWai = false;
    },
    //关闭模态框
    toCancel(formName) {
      //重置表单验证，关闭模态框
      this.$refs[formName].resetFields();
      this.addWai = false;
    },
    //保存
      toSave(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          //保存
          try {
            let res = await saveOrUpdate(this.addform);
            if (res.status === 200) {
              this.findAllCus();
              this.addWai = false;
              config.successMsg(this, "添加成功");
            } else {
              config.errorMsg(this, "添加失败");
            }
          } catch (error) {
            console.log(error);
            config.errorMsg(this, "添加失败");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //添加客服
    addWaiter(){
      this.addWai =true;
      this.addform={}
    },
  
   Import(){
  //  alert("暂未开发");
  config.tanchuangMsg(this, "暂未开发");
   },
    //删除
    toDelete(id) {
      // alert("删除");
      this.$confirm("是否删除该记录?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          //访问后台接口
          try {
            let res = await deleteById({ id: id });
            if (res.status === 200) {
              config.successMsg(this, "删除成功");
              this.findAllCus();
            } else {
              config.errorMsg(this, "删除失败");
            }
          } catch (error) {
            config.errorMsg(this, "删除失败");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //批量删除
    toBatchDelete() {
      //获取要批量删除的id  this.ids
      let ids = this.ids;
      if (ids.length > 0) {
        this.$alert("是否删除？", "提示", {
          confirmButtonText: "删除",
          callback: action => {
            if (action === "confirm") {
              let result = [];
              ids.forEach(async id => {
                try {
                  let res = await deleteById({ id: id });
                  result.push(res.status);
                } catch (error) {
                  result.push(500);
                }
              });
              setTimeout(() => {
                // console.log(result);
                //判断是否都是200
                let resu = result.every(item => {
                  return item === 200;
                });
                if (resu) {
                  config.successMsg(this, "批量删除成功");
                  this.findAllCus();
                } else {
                  config.errorMsg(this, "批量删除失败");
                }
                this.findAllCus();
              }, 2000);
            }
          }
        });
      } else {
        this.$message({
          message: "请选中要删除的数据",
          type: "warning"
        });
      }
    },
    //复选框选中切换
    selectionChange(val) {
      //val 就是选中的对象组成的数组
      // console.log(val);
      let ids = val.map(item => {
        return item.id;
      });
      this.ids = ids;
    },
    //查找所有的客服信息
    async findAllCus() {
      try {
        let res = await findAllCustomer();
        this.customerData = res.data;
        this.currentPage = 1;
        //状态数组
        let statusArr = res.data.map(item => {
          return item.status;
        });
        //去重
        this.statusData = [...new Set(statusArr)];
        //性别数组
        let genderArr = res.data.map(item => {
          return item.gender;
        });
        //去重
        this.genderData = [...new Set(genderArr)];
      } catch (error) {
        config.errorMsg(this, "查找错误");
      }
    }
  },
  created() {
    this.findAllCus();

  },
  mounted() {}

  };
</script>
<style lang="scss" scoped>
.tableDiv {
  clear: both;
  margin-top: 10px;
}
.footerDiv {
  overflow: hidden;
  margin-top: 10px;
}
  .btnDiv {
    float: left;
  }
  .pageDiv {
    float: right;
  }
.seeDiv {
  border-bottom: 1px solid #ccc;
  line-height: 30px;
  font-weight: bold;
  span {
    color: #777;
  }
}
.descDiv {
  font-weight: bold;
  color: #777;
  font-size: 12px;
  line-height: 30px;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}
.imgDiv {
  text-align: center;
}
.dialog-footer {
  text-align: center;
  margin-top: -30px;
}
.searchDiv{
  float:left;
  margin-top: 8px;
  margin-bottom: 14px;
}
.btn{
  float: right;
  margin-top:8px;
  margin-right: 10px;
}
.search{
  float:right;
  margin-top: 8px;
  margin-right: 15px;
}
.butt{
  margin-right: -7px;
}
</style>