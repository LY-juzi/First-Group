/*
 * @Author: liuyr 
 * 客服列表页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-12-29 08:38:57
 */
<template>
  <div id="waiterList">
    <!-- {{waiterData}}
    {{statusData}} -->
    <!-- 搜索框 -->
    <div class="searchDiv">
      <el-select @change="statusChange" size="mini" v-model="status" clearable placeholder="状态">
        <el-option
          v-for="item in statusData"
          :key="item"
          :label="item"
          :value="item">
          </el-option>
      </el-select>
      <el-select @change="genderChange" size="mini" v-model="gender" clearable placeholder="性别">
        <el-option v-for="item in genderData"
         :key="item"
         :label="item"
         :value="item">
         </el-option>
      </el-select>
      <el-select
       v-model="value"
       multiple
       filterable
       remote
       reserve-keyword
       placeholder="请输入关键词"
       :remote-method="remoteMethod"
       :loading="loading" size="mini">
      <el-option
       v-for="item in customerData"
       :key="item.value"
       :label="item.label"
       :value="item.value">
      </el-option>
  </el-select>
    </div>
    <!-- 列表框-->
    <div class="tableDiv">
      <el-table
        ref="multipleTable"
        :data="customerData"
        tooltip-effect="dark"
        style="width: 100%"
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

  </div>
</template>

<script>
import { findAllCustomer,deleteById,findByStatus,findByGender} from "@/api/customer-service.js";
import config from "@/utils/config.js";
export default {
  data() {
    return {
      
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
    };
  },
  computed: {
    //分页数据
    businessList() {
      let temp = [...this.businessData];
      let page = this.currentPage;
      let pageSize = config.pageSize;
      return temp.slice((page - 1) * pageSize, page * pageSize);
    }
  },
  methods: {
    //右上角，模态框关闭之前
    beforeClose() {
      this.$refs["ruleForm"].resetFields();
      this.editVisible = false;
    },
    //关闭模态框
    toCancel(formName) {
      //重置表单验证，关闭模态框
      this.$refs[formName].resetFields();
      this.editVisible = false;
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

    fenlei2 () {
        const search =this.input;
        if (search) {
           // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
           // 注意： filter() 不会对空数组进行检测。
           // 注意： filter() 不会改变原始数组。
           return this.customerData.filter(data => {
           // some() 方法用于检测数组中的元素是否满足指定条件;
             // some() 方法会依次执行数组的每个元素：
            // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
             // 如果没有满足条件的元素，则返回false。
             // 注意： some() 不会对空数组进行检测。
             // 注意： some() 不会改变原始数组。
             return Object.keys(data).some(key => {
               // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
               // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
               return String(data[key]).toLowerCase().indexOf(search) > -1
             })
           })
        }
         return this.customerData;
       },
    
    //查看
    toSee(row) {
      this.currentBus = { ...row };
      this.seeVisible = true;
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
                this.findAllBus();
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
</style>