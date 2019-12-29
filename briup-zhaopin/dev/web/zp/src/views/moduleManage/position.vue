/*
 * @Author: liuyr 
 * 职位管理页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: lijunkun
 * @Last Modified time: 2019-12-29 20:06:32
 */
<template>
  <div id="modulePosition">
    <el-row>
        <el-button @click="toAdd()" type="danger" size="small" id="add" icon="el-icon-info">添加职位</el-button>
    </el-row>

    <div class="wrapDiv" v-for="item in statusData" :key="item.id">
      {{item.name}}
      <div class="jobDiv">
        <span v-for="jobitem in item.job" :key="jobitem.id">{{jobitem.name}}&nbsp;&nbsp;&nbsp;&nbsp;</span>

        <div class="jobDataList addButDiv" v-if="item.butStatu">
          <el-button type="text" @click="addjob(item)">添加</el-button>
        </div>
        <div class="jobDataList inputDiv" v-else>
          <input v-model="jobName" type="text" placeholder="请输入职位名称" >
          <button @click="jobDataAdd(item)">添加</button>
        </div>

      </div>
    </div> 

    <el-dialog title="创建新的行业类型" :visible.sync="addJobVisible" width="40%" :before-close="beforeClose">
      <el-form :model="currentJob" :rules="rules" ref="ruleForm">
        <el-row :gutter="20">
          <!-- prop链接的是下面data中的rules校验规则 -->
          <el-form-item prop="name" label="行业类型：" :label-width="formLabelWidth">
            <el-input v-model="currentJob.name"></el-input>
          </el-form-item>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="toCancel('ruleForm')">取 消</el-button>
        <el-button size="mini" type="primary" @click="toSave('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {  saveOrUpdateJobType,  findAllJobType,  findJobTypeById} from "@/api/job-type-controller.js";
import {  findAllJobs,  findJobsById,  findJobsByStatus,  saveOrUpdateJobs} from "@/api/job-controller.js";
import config from "@/utils/config.js";

export default {
  data() {
    return {
      statusData: [],
      jobData: [],
      jobName: "",

      // 模态框的显示与否
      addJobVisible: false,
      formLabelWidth: "100px",
      currentJob: {},

      ruleForm: {
        jobType: "",
      },
      rules: {
        jobType: [
          { required: true, message: "请输入行业类型", trigger: "blur" }
        ]
      }
    };
  },
  computed: {},
  methods: {

    //添加城市按钮
    async addjob(val){
      val.butStatu = false;
    },
    //添加职业名称
    async jobDataAdd(val){
      try {
        let res = await saveOrUpdateJobs({jobTypeId:val.id,name:this.jobName,status:val.name});
        this.findAllType();
        val.butStatu = true;
        config.successMsg(this,"添加成功");
        this.jobName = '请输入城市名称';
      } catch (error) {
        console.log(error);
      }
    },

    //右上角，模态框关闭之前
    beforeClose() {
      this.$refs["ruleForm"].resetFields();
      this.addJobVisible = false;
    },
    //关闭模态框
    toCancel(formName) {
      //重置表单验证，关闭模态框
      this.$refs[formName].resetFields();
      this.addJobVisible = false;
    },

    // 新增行业类型的保存确定
    toSave(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let job = this.currentJob.name;
          if (+job) {
            let result = this.statusData.filter(item => {
              return item.id === +job;
            })[0];
            this.currentJob.name = result.name;
          }
          // 保存
          try {
            let res = await saveOrUpdateJobType(this.currentJob);
            if (res.status === 200) {
              this.findAllType();
              this.addJobVisible = false;
              config.successMsg(this, "保存成功");
            } else {
              config.errorMsg(this, "保存失败");
            }
          } catch (error) {
            console.log(error);
            config.errorMsg(this, "保存失败");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 新增行业类型
    toAdd() {
      this.addJobVisible = true;
      this.currentJob = {};
    },

    // 查找所有行业类型
    async findAllType() {
      let res = await findAllJobType();
      let temp = [...res.data];
      temp.forEach(async item => {
        //item是对象
        let jobName = item.name;
        try {
          let res = await findJobsByStatus({ staus: jobName });
          item.butStatu = true;
          //tStatu为true则显示添加按钮，false显示输入框
          item.job = res.data;
        } catch (error) {
          config.errorMsg(this, "查找错误");
        }
      });
      // 超时调用
      setTimeout(() => {
        this.statusData = temp;
      }, 1000);
    }
  },
  created() {
    this.findAllType();
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
#modulePosition{
  #add{
    position: relative;
    left: 630px;
    margin: 10px;
  }
}
.wrapDiv {
  border: 1px solid #ccc;
  margin: 10px;
  padding: 10px;
  width: 55%;
  margin-left: 35px;
}
.jobDiv {
  border-top: 1px solid #ccc;
  margin: 10px;
  padding: 10px;
}
.jobDataList{
  display: inline;
  margin-right: 10px;
}
</style>