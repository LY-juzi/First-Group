/*
 * @Author: liuyr 
 * 招聘完结页面
 * @Date: 2019-12-23 17:03:30 
 * @Last Modified by: wuhuilan
 * @Last Modified time: 2019-12-29 18:44:11
 */
<template>
  <div id="recruitFinish">
    <el-select v-model="job" placeholder="职位类型" class="select" @change="changeJob">
      <el-option label="职位类型" value></el-option>
      <el-option v-for="(item,index) in jobsData" :key="index" :label="item" :value="item"></el-option>
    </el-select>
    <el-row class="btns">
      <el-button size="small" type="primary" @click="toNew" class="el-icon-info btn1">发布职位</el-button>
      <el-button size="small" type="primary" class="el-icon-info btn2">导入职位</el-button>
    </el-row>
    <template>
      <el-table :data="finishDataList" style="width: 100%" class="table" @selection-change="handleSelectionChange">
        <el-table-column align="center" type="selection" width="55"></el-table-column>
        <el-table-column align="center" prop="title" label="招聘标题" width="220"></el-table-column>
        <el-table-column align="center" prop="contactName" label="发布人" width="150"></el-table-column>
        <el-table-column align="center" prop="contactPhone" label="联系方式"></el-table-column>
        <el-table-column align="center" prop="job" label="职位"></el-table-column>
        <el-table-column align="center" prop="publishTime" label="发布时间" :formatter="formatDate"></el-table-column>
        <el-table-column align="center" label="详情">
          <template slot-scope="scope">
            <el-button @click.native.prevent="toSee(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态" width="120" prop="status">
          <template>
            <el-button type="text" size="small" disabled>{{status}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <div class="footDiv">
      <div class="btnDiv">
        <el-button size="mini" class="delete-btn"  @click="toBatchDelete">删除</el-button>
      </div>
      <div class="pagiDiv">
        <el-pagination
          class="pagi"
          @current-change="currentChange"
          :current-page.sync="currentPage"
          background
          layout="prev, pager, next"
          :total="finishData.length"
        ></el-pagination>
      </div>
    </div>

    <!-- 查看模态框 -->
    <div>
      <el-dialog title="查看详情" :visible.sync="seeVisible" class="seeDialog">
        <div class="seeDiv">
          <span class="title">{{showData.title}}</span>
          <span class="salary">{{showData.salary}}元/月</span>
        </div>
        <div class="seeDiv">
          <span>招{{showData.num}}人</span>
        </div>
        <div class="seeDiv">
          <i class="el-icon-map-location"></i>
          <span>{{showData.province}}-{{showData.city}}-{{showData.location}}</span>
        </div>
        <div class="seeDiv">
          <button disabled="disabled" v-for="(item,index) in welfareList" :key="index">{{item}}</button>
          <span class="businessName">{{showData.businessName}}</span>
        </div>
        <hr />
        <div>
          <h3>职位描述</h3>
          <p>{{showData.description}}</p>
        </div>
      </el-dialog>
    </div>

    <!-- 编辑对话框 -->
    <el-dialog
      title="发布职位"
      class="editDialog"
      :visible.sync="dialogFormVisible"
      width="60%"
      :before-close="beforeClose"
    >
      <el-form :model="showData" :rules="rules" ref="ruleForm">
        <el-form-item label="兼职名称" :label-width="formLabelWidth" prop="title">
          <el-input v-model="showData.title"></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="选择工种" :label-width="formLabelWidth" prop="job">
              <el-select v-model="showData.job" placeholder="请选择工种信息" clearable>
                <el-option
                  v-for="(item,index) in jobsData"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="招聘人数" :label-width="formLabelWidth" prop="num">
              <el-input v-model="showData.num" placeholder="请输入您要招聘的人数"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- {{businessData}} -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="招聘公司" :label-width="formLabelWidth" prop="businessId">
              <el-select v-model="showData.businessId" placeholder="该招聘所属公司" clearable>
                <el-option
                  v-for="item in businessData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="薪资水平" :label-width="formLabelWidth" prop="salary">
              <el-input v-model="showData.salary" placeholder="请输入薪资"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="联系姓名" :label-width="formLabelWidth" prop="contactName">
              <el-input v-model="showData.contactName" placeholder="请输入联系人姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系方式" :label-width="formLabelWidth" prop="contactPhone">
              <el-input v-model="showData.contactPhone" placeholder="请输入联系人电话"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="职业标签" :label-width="formLabelWidth">
          <el-select
          @change="a"
           style="width:100%"
            v-model="showData.welfareDialog"
            multiple
            filterable
            allow-create
            placeholder="请选择职业标签"
          >
            <el-option v-for="item in allWelfare" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="工作时间" :label-width="formLabelWidth" prop="workingHours">
          <el-input v-model="showData.workingHours" placeholder="请输入工作时间"></el-input>
        </el-form-item>

        <el-form-item label="职位描述" :label-width="formLabelWidth" prop="description">
          <el-input type="textarea" :rows="5" placeholder="请输入职位描述" v-model="showData.description"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="toSave">发布招聘</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  findAllEmployment,
  findEmploymentByJob,
  saveOrUpdateEmployment,
  deleteEmploymentById
} from "@/api/employment.js";
import { findAllJob } from "@/api/job.js";
import { findBusinessById, findAllBusiness } from "@/api/business.js";
import config from "@/utils/config.js";
import { findAllWelfare } from "@/api/welfare";
export default {
  data() {
    return {
      ids:[],
      status:"",
      seeVisible: false,
      finishData: [],
      value: "",
      jobsData: [],
      job: "",
      dialogTableVisible: false,
      dialogFormVisible: false,
      newData: {},
      formLabelWidth: "120px",
      currentPage: 1,
      showData: [],
      businessData: [],
      rules: {
        contactPhone: [
          { required: true, message: "请输入联系人电话", trigger: "blur" }
        ],
        contactName: [
          { required: true, message: "请输入联系人姓名", trigger: "blur" }
        ],
        title: [{ required: true, message: "请输入兼职名称", trigger: "blur" }],
        job: [{ required: true, message: "请输入工种信息", trigger: "change" }],
        num: [{ required: true, message: "请输入招聘人数", trigger: "blur" }],
        businessId: [
          { required: true, message: "请输入招聘公司", trigger: "change" }
        ],
        salary: [
          { required: true, message: "请输入薪资水平", trigger: "blur" }
        ],
        welfare: [
          { required: true, message: "请输入职业标签", trigger: "blur" }
        ],
        startAndEnd: [
          { required: true, message: "请输入招聘时长", trigger: "blur" }
        ],
        workingHours: [
          { required: true, message: "请输入工作时间", trigger: "blur" }
        ],
        description: [
          { required: true, message: "请输入职位描述", trigger: "blur" }
        ]
      },
      welfareList: [],
      allWelfare: []
    };
  },
  computed: {
    finishDataList() {
      let temp = [...this.finishData];
      let page = this.currentPage;
      let arr = temp.slice((page - 1) * 10, 10 * page);
      return arr;
    }
  },
  methods: {
    a(x){
      this.$forceUpdate();
    },

    handleSelectionChange(val) {
      this.ids = val.map(item => {
        return item.id;
      });
    },
    

     toBatchDelete() {
      if (this.ids.length > 0) {
        this.$alert("是否确认删除", "提示", {
          confirmButtonText: "删除",
          callback: action => {
            if (action === "confirm") {
              let results = [];
              this.ids.forEach(async id => {
                try {
                  let res = await deleteEmploymentById({ id: id });
                  results.push(res.status);
                } catch (error) {
                  results.push(500);
                }
              });
              setTimeout(() => {
                // 判断是否都是200
                let result = results.every(item => {
                  return item === 200;
                });
                if (result) {
                  config.successMsg(this, "批量删除成功");
                } else {
                  config.errorMsg(this, "批量删除失败");
                }
                this.findEmploymentData();
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
    async findAllWelfare() {
      try {
        let welfares = await findAllWelfare();
        welfares = welfares.data.filter(item => {
          return item.status === "使用中";
        });
        this.allWelfare = welfares.map(item => {
          return item.name;
        });
      } catch (error) {
        config.errorMsg(this, "查找数据库中的福利失败");
      }
    },
    beforeClose(done) {
      this.$refs["ruleForm"].resetFields();
      done();
    },
    async findBusinessData() {
      try {
        let res = await findAllBusiness();
        this.businessData = res.data;
      } catch (error) {
        alert(error);
      }
    },

   toSave() {
      this.dialogFormVisible = false;
      this.$refs["ruleForm"].validate(async valid => {
        if (valid) {
          delete this.showData.startTime;
          delete this.showData.endTime;
          delete this.showData.publishTime;
          this.showData.status = "审核通过";
          if(this.showData.welfareDialog){
             this.showData.welfare = this.showData.welfareDialog.toString();
             this.showData.welfareDialog=[];
          }
          delete this.showData.welfareDialog;
          try {
            await saveOrUpdateEmployment(this.showData);
            config.successMsg(this, "操作成功");
          } catch (error) {
            config.errorMsg(this, "发布招聘信息失败");
          }
          this.findEmploymentData();
          this.$refs["ruleForm"].resetFields();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

   
    toNew() {
      this.dialogFormVisible = true;
      this.showData = {};
      this.showData.welfareDialog=[];
    },
    async toSee(row) {
      this.showData = row;
      this.welfareList = row.welfare.split(",");
      try {
        let business = await findBusinessById({ id: this.showData.businessId });
        this.showData.businessName = business.data.name;
      } catch (error) {
        config.errorMsg(this, "通过id查找公司名失败");
      }
      this.seeVisible = true;
    },
    formatDate(row, column, cellValue) {
      return cellValue.slice(0, 10);
    },
    async changeJob(val) {
      if (val) {
        try {
          let res = await findEmploymentByJob({ job: val });
          this.finishData = res.data.filter(item => {
            return item.status === "已完结";
          });
        } catch (error) {
          // config.errorMsg(this, "通过职位类型查找招聘信息失败");
          config.errorMsg(this, error);
        }
      } else {
        this.findEmploymentData();
      }
    },
    currentChange(val) {
      this.currentPage = val;
    },
    async findJobsData() {
      try {
        let res = await findAllJob();
        this.jobsData = res.data.map(item => {
          return item.name;
        });
      } catch (err) {
        alert(err);
      }
    },

    async findEmploymentData() {
      try {
        let res = await findAllEmployment();
        this.finishData = res.data.filter(item => {
          return item.status === "已完结";
        });
      } catch (err) {
        alert(err);
      }
    }
  },
  created() {
    this.findEmploymentData();
    this.findJobsData();
    this.findBusinessData();
    this.findAllWelfare();
  },
  mounted() {}
};
</script>
<style scoped lang="scss">
.seeDiv {
  margin-bottom: 20px;
  .businessName {
    float: right;
  }
  .title {
    font-size: 25px;
    font-weight: bolder;
  }
  .salary {
    color: red;
    font-size: 25px;
    font-weight: bolder;
    float: right;
  }
}
.table {
  margin-top: 20px;
}
.select {
  margin-left: 10px;
  width: 130px;
}
.btns {
  float: right;
  margin-top: -50px;
}
.btn1 {
  background-color: rgb(255, 102, 0);
  border-color: rgb(255, 102, 0);
}
.btn2 {
  background-color: rgb(51, 102, 255);
  border-color: rgb(51, 102, 255);
}
.delete-btn {
  background-color: red;
  color: white;
  margin-top: 10px;
  margin-left: 10px;
}
.footDiv {
  margin-top: 10px;
  overflow: hidden;
  .btnDiv {
    float: left;
  }
  .pagiDiv {
    float: right;
  }
}
</style>