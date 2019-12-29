/*
 * @Author: liuyr 
 * 职位管理页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: luy
 * @Last Modified time: 2019-12-29 11:26:41
 */
<template>
  <div id="modulePosition">

    <!-- <el-row>
        <el-button type="danger" size="small" id="add" round>添加职位</el-button>
    </el-row>

    <div class="wrapDiv" v-for="item in statusData" :key="item.id">
      {{item.name}}
      <div class="jobDiv">
        <span v-for="cityitem in item.city" :key="cityitem.id">{{cityitem.name}}</span>
      </div>

      <div class="cityDataList addButDiv" v-if="item.butStatu">
          <el-button type="text" @click="addCity(item)">添加</el-button>
      </div>
      <div class="cityDataList inputDiv" v-else>
        <input v-model="cityName" type="text" >
        <button @click="cityDataAdd(item)">添加<tton>
      </div>
    </div>

    <el-dialog title="创建新的行业类型" :visible.sync="addJobVisible" width="40%" :before-close="beforeClose">
      <el-form :model="currentPro" :rules="rules" ref="ruleForm">
        <el-row :gutter="20">
          < prop链接的是下面data中的rules校验规则 -->
          <!-- <el-form-item prop="name" label="行业类型：" :label-width="formLabelWidth">
            <el-input v-model="currentPro.name"></el-input>
          </el-form-item>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="toCancel('ruleForm')">取 消</el-button>
        <el-button size="mini" type="primary" @click="toSave('ruleForm')">确 定</el-button>
      </div>
    </el-dialog> --> -->

  </div>
</template>

<script>
import {
  saveOrUpdateJobType,
  findAllJobType,
  findJobTypeById
} from "@/api/job-type-controller.js";
import {
  findAllJobs,
  findJobsById,
  findJobsByStatus,
  saveOrUpdateJobs
} from "@/api/job-controller.js";
import config from "@/utils/config.js";

export default {
  data() {
    return {
      statusData: [],
      jobData: [],
      cityName: "请输入行业名称",

      // 模态框的显示与否
      addJobVisible: false,
      formLabelWidth: "100px",
      currentPro: {},

      ruleForm: {
        provinceName: "",
        cityName: ""
      },
      rules: {
        provinceName: [
          { required: true, message: "请输入省份名字", trigger: "blur" }
        ],
        cityName: [
          { required: true, message: "请输入城市名字", trigger: "blur" }
        ]
      }
    };
  },
  computed: {},
  methods: {
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

    // 新增省份的保存确定
    toSave(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // 通过验证
          // 将省份id处理成省份名字再保存
          let province = this.currentPro.name;
          // 如果省份发生更改（不改变省份的话，它的类型本来就是字符串）
          // 汉字转是NAN，数字类型是number
          if (+province) {
            // 将省份id通过过滤省份数组处理为省份名字再保存
            // [0]拿省份对象
            let result = this.statusData.filter(item => {
              return item.id === +province;
            })[0];
            // result是省份对象
            // 修改的对象是数据模型里的，会触发页面重新渲染。但这里修改的是对象中的属性，所以不会重新渲染。若是重新修改了对象，则会触发
            this.currentPro.name = result.name;
          }
          // 保存
          try {
            let res = await saveOrUpdateProvince(this.currentPro);
            if (res.status === 200) {
              console.log(1);
              this.findAllPro();
              console.log(2);

              this.addJobVisible = false;
              console.log(2);

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

    // 新增省份
    toAdd() {
      this.addJobVisible = true;
      this.currentPro = {};
    },

    // 查找所有省份
    async findAllPro() {
      let res = await findAllProvince();
      this.statusData = [...res.data];
    },

    // 查找所有城市
    async findCity() {
      let val = await findAllJobs();
      this.jobData = val.data;
      let temp = [...this.statusData];
      temp.forEach(async item => {
        //item是对象
        let provinceId = item.id;
        try {
          let res = await findJobTypeById({ provinceId: provinceId });
          // item.butStatu = 'true';
          //tStatu为true则显示添加按钮，false显示输入框
          item.city = res.data;
        } catch (error) {
          config.errorMsg(this, "查找错误");
        }
      });
      // 超时调用
      setTimeout(() => {
        this.statusData = temp;
      }, 2000);
    }
  },
  created() {
    this.findAllPro();
    this.findCity();
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
#modulePosition{
  #add{
    position: relative;
    left: 700px;
    margin: 10px
  }
}
.wrapDiv {
  border: 1px solid #ccc;
  margin: 10px;
  padding: 10px;
  width: 60%;
}
.jobDiv {
  border-top: 1px solid #ccc;
  margin: 10px;
  padding: 10px;
}
.cityDataList{
  display: inline;
  margin-right: 10px;
}
</style>