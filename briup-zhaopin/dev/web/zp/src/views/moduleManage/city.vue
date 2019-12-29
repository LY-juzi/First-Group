/*
 * @Author: liuyr 
 * 城市管理页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: luy
 * @Last Modified time: 2019-12-29 15:31:54
 */
<template>
  <div id="moduleCity">
    <el-row>
      <el-button @click="toAdd()" type="success" size="small" id="add" round>添加省份</el-button>
    </el-row>

    <div class="wrapDiv" v-for="item in provinceData" :key="item.id">
      {{item.name}}
      <div class="cityDiv">
        <span v-for="cityitem in item.city" :key="cityitem.id">{{cityitem.name}}&nbsp;&nbsp;&nbsp;&nbsp;</span>

        <div class="cityDataList addButDiv" v-if="item.butStatu">
          <el-button type="text" @click="addCity(item)">添加</el-button>
        </div>
        <div class="cityDataList inputDiv" v-else>
          <input v-model="cityName" placeholder="请输入城市名字" type="text" >
          <button @click="cityDataAdd(item)">添加</button>
        </div>
        
      </div>
    </div>

    <el-dialog title="创建新的省份" :visible.sync="addProVisible" width="40%" :before-close="beforeClose">
      <el-form :model="currentPro" :rules="rules" ref="ruleForm">
        <el-row :gutter="20">
          <!-- prop链接的是下面data中的rules校验规则 -->
          <el-form-item prop="name" label="省份名字：" :label-width="formLabelWidth">
            <el-input v-model="currentPro.name"></el-input>
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
import {  findAllProvince,  findProvinceById,  saveOrUpdateProvince} from "@/api/province.js";
import { findAllCity,  findCityByProvinceId,  findCityById,  saveOrUpdateCity} from "@/api/city.js";
import config from "@/utils/config.js";

export default {
  data() {
    return {
      provinceData: [],
      cityData: [],
      cityName: "",

      // 模态框的显示与否
      addProVisible: false,
      formLabelWidth: "100px",
      currentPro: {},

      ruleForm: {
        provinceName: "",
      },
      rules: {
        provinceName: [
          { required: true, message: "请输入省份名字", trigger: "blur" }
        ]
      }
    };
  },
  computed: {},
  methods: {

    //添加城市按钮
    async addCity(val){
      val.butStatu = false;
    },
    //添加城市
    async cityDataAdd(val){
      //需要省份pId和城市名称this.cityName
      let provinceId = val.id;
      let name = this.cityName;
      try {
        let res = await saveOrUpdateCity({provinceId:provinceId,name:name});
        this.findAllPro();
        val.butStatu = true;
        config.successMsg(this,"添加成功");
        this.cityName = '请输入城市名称';
      } catch (error) {
        console.log(error);
      }
    },

    //右上角，模态框关闭之前
    beforeClose() {
      this.$refs["ruleForm"].resetFields();
      this.addProVisible = false;
    },
    //关闭模态框
    toCancel(formName) {
      //重置表单验证，关闭模态框
      this.$refs[formName].resetFields();
      this.addProVisible = false;
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
            let result = this.provinceData.filter(item => {
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
              this.findAllPro();
              this.addProVisible = false;
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
      this.addProVisible = true;
      this.currentPro = {};
    },

    // 查找所有省份
    async findAllPro() {
      let res = await findAllProvince();
      let temp = [...res.data];
      temp.forEach(async item => {
        //item是对象
        let provinceId = item.id;
        try {
          let res = await findCityByProvinceId({ provinceId: provinceId });
          item.butStatu = true;
          //tStatu为true则显示添加按钮，false显示输入框
          item.city = res.data;
        } catch (error) {
          config.errorMsg(this, "查找错误");
        }
      });
      // 超时调用
      setTimeout(() => {
        this.provinceData = temp;
      }, 1000);
    },

  },
  created() {
    this.findAllPro();
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
#moduleCity {
  #add {
    position: relative;
    left: 600px;
    margin: 10px;
  }
}
.wrapDiv {
  border: 1px solid #ccc;
  margin: 10px;
  padding: 10px;
  width: 60%;
}
.cityDiv {
  border-top: 1px solid #ccc;
  margin: 10px;
  padding: 10px;
}
.cityDataList{
  display: inline;
  margin-right: 10px;
}
</style>
