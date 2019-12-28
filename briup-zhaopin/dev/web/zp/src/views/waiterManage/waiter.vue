/*
 * @Author: liuyr 
 * 客服列表页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-12-28 15:20:05
 */
<template>
  <div id="waiterList">
    <!-- {{waiterData}}
    {{statusData}} -->
    <!-- 搜索框 -->
    <div class="searchDiv">
      <el-select @change="statusChange" size="mini" v-model="status" clearable placeholder="在线">
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
import { findAllCustomer,deleteById } from "@/api/customer-service.js";
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
      waiterData:[],
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
    //保存
    toSave(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          //通过验证
          let province = this.currentBus.province;
          // console.log(province);
          // console.log(typeof province);
          // console.log(+province);    NaN  8
          //如果省份发生更改
          if (+province) {
            //将省份id处理为省份名字，过滤省份数组
            let result = this.provinceData.filter(item => {
              return item.id === +province;
            })[0];
            // result 是省份对象
            this.currentBus.province = result.name;
          }
          //保存
          try {
            let res = await saveOrUpdateBusiness(this.currentBus);
            if (res.status === 200) {
              this.findAllBus();
              this.editVisible = false;
              config.successMsg(this, "修改成功");
            } else {
              config.errorMsg(this, "修改失败");
            }
          } catch (error) {
            console.log(error);
            config.errorMsg(this, "修改失败");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //模态框  省份发生改变
    async dialogProChange(val) {
      // console.log(val);
      //重置城市下拉列表
      this.currentBus.city = "";
      //通过省份id获取城市
      try {
        let res = await findCityByProvinceId({ provinceId: val });
        this.provinceCityData = res.data;
      } catch (error) {
        console.log(error);
        config.errorMsg(this, "通过省份查找城市失败");
      }
    },
    // 页数发生改变
    pageChange(page) {
      this.currentPage = page;
    },

    //城市发生改变
    async cityChange(val) {
      this.province = "";
      this.industry = "";
      this.scale = "";
      //val 是option的value值
      if (val) {
        try {
          let res = await findByStatus({ city: val });
          this.customerData = res.data;
          this.currentPage = 1;
        } catch (error) {
          config.errorMsg(this, "通过状态查找商家信息错误");
        }
      } else {
        this.findAllCus();
      }
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