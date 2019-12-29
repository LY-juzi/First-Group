/*
 * @Author: liuyr 
 * 用户列表页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: wuhuilan
 * @Last Modified time: 2019-12-29 10:56:46
 */
<template>
  <div id="userList">
     
     
     <div  class="btn">
        <!-- 按钮 -->
        <el-button @click="Add" size="mini" type="primary" style="background:rgb(235, 108, 50)">添加用户</el-button>
        <el-button @click="Import" size="mini" type="primary" icon="el-icon-info">导入用户</el-button>
      </div>
      <!-- 按关键字搜索 -->
     <div class="searchDiv">
          <el-input clearable @change="inputChange" placeholder="请输入" v-model="inputvalue" size="mini">
            <el-select style="width:100px" v-model="searchType" slot="prepend" placeholder="关键字" size="mini">
              <el-option label="用户id" value="id"></el-option >
              <el-option label="用户名" value="username"></el-option>
            </el-select>
            <el-button @click="tofind(inputvalue)" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      <div class="select">
        <el-select @change="educationChange" size="mini" v-model="education"  clearable placeholder="学历">
          <el-option
            v-for="item in educationData"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <el-select @change="genderChange" size="mini" v-model="gender" clearable placeholder="性别">
          <el-option
            v-for="item in genderData"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </div>
      
     <div class="table">
 
        <el-table
            ref="multipleTable"
            :data="jobhunterList"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="selectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="username" label="用户名"  align="center"> </el-table-column>
            <el-table-column prop="realname" label="姓名"  align="center"> </el-table-column>
            <el-table-column prop="telephone" label="手机号"  align="center"> </el-table-column>
            <el-table-column prop="gender" label="性别"  align="center"> </el-table-column>
            <el-table-column prop="birth" label="出生年月"  align="center"> </el-table-column>
            <el-table-column prop="education" label="最高学历"  align="center"> </el-table-column>
            <el-table-column  align="center"  label="操作"  width="100">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="toDelete(scope.row.id)">删除</el-button>
                <el-button type="text" size="small" @click="toEdit(scope.row)">编辑</el-button>
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
          :total="jobhunterData.length"
        ></el-pagination>
      </div>
    </div>
      <!-- 添加用户模态框 -->
      <el-dialog title="添加求职者信息" :visible.sync="addVisible" :before-close="beforeClose"> 
         <el-form :model="addJober"  :rules="rules" ref="ruleForm">
           <!-- {{addJober}}--- -->
           <el-row>
            <el-col :span="12">
              <el-form-item prop="username" label="用户名" :label-width="formLabelWidth" placeholder="请输入用户名">
                <el-input v-model="addJober.username" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12"> 
              <el-form-item prop="telephone"  label="联系方式" :label-width="formLabelWidth">
                <el-input v-model="addJober.telephone" ></el-input>
              </el-form-item>
            </el-col>
            </el-row>
            <el-row>
            <el-col :span="12"> 
              <el-form-item  prop="realname" label="真实姓名" :label-width="formLabelWidth">
                <el-input v-model="addJober.realname" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item  prop="gender" label="性别" :label-width="formLabelWidth">
                <el-input v-model="addJober.gender" ></el-input>
              </el-form-item> 
            </el-col>
            </el-row>
            <el-row>
            <el-col :span="12"> 
              <el-form-item prop="education"  label="学历" :label-width="formLabelWidth">
                <el-input v-model="addJober.education" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">  
              <el-form-item  prop="currentStatus" label="求职状态" :label-width="formLabelWidth">
                <el-input v-model="addJober.currentStatus" ></el-input>
              </el-form-item>
            </el-col>
            </el-row>
          <el-row>
            <el-col :span="12"> 
              <el-form-item prop="birth"  label="出生日期" :label-width="formLabelWidth">
                <el-input v-model="addJober.birth" ></el-input>
              </el-form-item>
          </el-col>
            <el-col :span="12">
              <el-form-item  prop="workTime" label="工作时间" :label-width="formLabelWidth">
                <el-input v-model="addJober.workTime" ></el-input>
              </el-form-item>
          </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item  prop="resume" label="简历" :label-width="formLabelWidth">
                <el-input v-model="addJober.resume" ></el-input>
              </el-form-item>
          </el-col>
            <el-col :span="12">
              <el-form-item  prop="password" label="密码"  :label-width="formLabelWidth">
                <el-input v-model="addJober.password" type="passward" ></el-input>
              </el-form-item>
          </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="toCancel('ruleForm')">取 消</el-button>
          <el-button type="primary" @click="toAdd">导入</el-button>
        </div>
      </el-dialog>
      <!-- 导入模态框 -->
      <div class="importDiv">
      <el-dialog
        title="导入说明"
        :visible.sync="importVisible"
        width="60%"
        :before-close="beforeClose">
        <span style="color:red">使用导入功能时，请按照模板表格规定的字段去填写对应信息，</span><br>
        <span style="color:red">您可以点击按钮下载模板表格，填写完后在下面提交 ：</span>
       
          <div class="borderDiv" border="2px solid block ">
            <span class="span1">点击选择文件或将表格移动到框内</span>
          </div>
          <el-button class="button1">下载模板</el-button>
        <span slot="footer" class="dialog-footer">
           <el-button @click="importVisible = false">取消导入</el-button>
          <el-button  type="primary" @click="importVisible = false">开始导入</el-button>
        </span>
        </el-dialog>
      </div>
      <!-- 修改模态框 -->
      <el-dialog title="修改求职者信息" :visible.sync="editVisible" :before-close="beforeClose">
         <!-- {{currentJober}} -->
        <el-form :model="currentJober"  :rules="rules" ref="ruleForm">
          <el-row :gutter="20">
            <el-col :span="12"> 
              <el-form-item  prop="username" label="用户名" :label-width="formLabelWidth">
            <el-input v-model="currentJober.username" ></el-input>
          </el-form-item></el-col>
            <el-col :span="12"> 
              <el-form-item  prop="realname" label="姓名" :label-width="formLabelWidth">
            <el-input v-model="currentJober.realname" ></el-input>
          </el-form-item></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item prop="telephone"  label="手机号" :label-width="formLabelWidth">
            <el-input v-model="currentJober.telephone" ></el-input>
          </el-form-item></el-col>
            <el-col :span="12">
              <el-form-item  prop="gender" label="性别" :label-width="formLabelWidth">
            <el-input v-model="currentJober.gender" ></el-input>
          </el-form-item></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12"> 
              <el-form-item prop="birth"  label="出生年月" :label-width="formLabelWidth">
            <el-input v-model="currentJober.birth" ></el-input>
          </el-form-item></el-col>
            <el-col :span="12">
              <el-form-item  prop="education" label="最高学历" :label-width="formLabelWidth">
            <el-input v-model="currentJober.education" ></el-input>
          </el-form-item></el-col>
          </el-row>
          <!-- <el-form-item label="活动区域" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="toCancel('ruleForm')">取 消</el-button>
          <el-button type="primary" @click="toSave('ruleForm')">保存</el-button>
        </div>
      </el-dialog>
  </div>
  
  
</template>

<script>
import axios from '@/utils/axios'
import {findAllJobhunter,
        findJobhunterByGender,
        findJobhunterByEducation,
        deleteJobhunterById,
        saveOrUpdateJobhunter,
        findJobhunterByUsername,
        findJobhunterByfindById,
        } from '@/api/jobhunter.js'
import config from '@/utils/config.js'
import qs from "qs";
//设置基础路径
axios.defaults.baseURL = "http://127.0.0.1:8899";
export default {
  data() {
    return {
      //学历
      education:"",
      //性别
      gender:"",
       //学历数组
      educationData:[],
      //性别数组
      genderData:[],
      //真实姓名数组
      realnameData:[],
      //求职者数组
      jobhunterData:[],
      //求职者列表，数据
      //jobhunterList:[],
    //新增模态框显示与隐藏
      addVisible: false,
      //导入模态框显示与隐藏
      importVisible:false,
      //当前页
      currentPage: 1,
      //表单左侧的文字宽度
      formLabelWidth:"100px",
      //表单中的数据对象
      jobhunter:{
        id:"",
        username:"",
        telephone:"",
        realname:"",
        password:"",
        gender:"",
        education:"",
        currentStatus:"",
        birth:"",
        workTime:"",
      },
       //批量删除ids
      ids:[],
      //当前修改的对象
      currentJober:{},
      //当前导入的对象
      addJober:{},
      //修改模态框显示与否
      editVisible:false,
      //校验规则
       rules: {
        username: [{ required: true, message: "用户名", trigger: "blur" }],
        realname: [
          { required: true, message: "真实姓名", trigger: "blur" }
        ],
        gender: [{ required: true, message: "性别", trigger: "blur" }],
        education: [
          { required: true, message: "学历", trigger: "blur" }
        ],
        telephone: [
          { required: true, message: "联系方式", trigger: "blur" }
        ],
        birth: [
          { required: true, message: "出生日期", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码", trigger: "blur" }
        ],
        resume: [
          { required: true, message: "简历", trigger: "blur" }
        ],
        workTime: [
          { required: true, message: "工作时间", trigger: "blur" }
        ],
        currentStatus: [
          { required: true, message: "求职状态", trigger: "blur" }
        ],
      },
      searchType:'',
      inputvalue:''
      
      
    };
  },
  computed: {
    //分页数据
    jobhunterList() {
      let temp = [...this.jobhunterData];
      let page = this.currentPage;
      let pageSize = config.pageSize;
      return temp.slice((page - 1) * pageSize, page * pageSize);
    },
  },
  methods: {
    //改变关键字选项
    inputChange(inputvalue){
      this.findAllJober();
    },

    //搜索功能
    async tofind(inputvalue){
      if(this.searchType === "username"){
        if(inputvalue){
          
          try {
            let res = await findJobhunterByUsername({username:inputvalue});
            this.jobhunterData = res.data;
            this.currentPage = 1;
          } catch (error) {
            config.errorMsg(this,'没有相关信息');
          }
        }
        else{
          this.findAllJober();
        }
      }
      else{
        if(inputvalue){
          try {
            let res = await findJobhunterByfindById({id:inputvalue});
            this.jobhunterData = res.data;
            this.currentPage = 1;
          } catch (error) {
            config.errorMsg(this,'没有相关信息');
          }
        }
        else{
          this.findAllJober();
        }
      }
      
    },
    
    //关闭
    beforeClose(){
       this.$refs["ruleForm"].resetFields();
      this.editVisible=false;
      this.addVisible=false;
       this.importVisible=false;
    },
    //关闭模态框
    toCancel(formName){
      //重置表单验证，关闭模态框
      this.$refs[formName].resetFields();
      this.editVisible=false;
      this.addVisible=false;
      this.importVisible=false;
    },
    
    
    //学历发生改变
    async educationChange(val){
      this.gender="",
      console.log(val);
      if (val) {
        try {
           let res=await findJobhunterByEducation({education:val});
            this.jobhunterData=res.data;
            this.currentPage=1;
        } catch (error) {
          console.log(error);
          config.errorMsg(this,"通过学历查找求职者信息错误");
        }
      } else {
        this.findAllJober();
      }
    },

    //性别发生改变
    async genderChange(val){
      this.education="",
      console.log(val);
      if (val) {
        try {
           let res=await findJobhunterByGender({gender:val});
            this.jobhunterData=res.data;
            this.currentPage=1;
        } catch (error) {
          config.errorMsg(this,"通过性别查找求职者信息错误");
        }
      } else {
        this.findAllJober();
      }
    },

    //保存
    async toSave(){
      //保存
      try {
        let res=await saveOrUpdateJobhunter(this.currentJober);
        if(res.status===200){
          this.findAllJober();
          this.editVisible=false;
          config.successMsg(this,'修改成功');
        }else{
          config.errorMsg(this,'修改失败')
        }
      } catch (error) {
        console.log(error);
         config.errorMsg(this,'修改失败');
      }
    },

    //导入按钮
    Import(){
      this.dialogTitle = "导入说明";
      this.importVisible=true;
    },

    //新增按钮
    Add(){
       this.dialogTitle = "新增求职者";
      //  this.jobhunter = {};
       this.addVisible=true;
    },

    //增加功能
    async toAdd(){
      // this.dialogTitle = "新增求职者";
      //  this.jobhunter = {};
      // this.dialogFormVisible=true;
      try {
          let res =await saveOrUpdateJobhunter(this.addJober);
        if(res.status===200){
          this.findAllJober();
          this.addVisible=false;
          config.successMsg(this,'导入成功');
          this.findAllJober();
        }else{
          config.errorMsg(this,'导入失败')
        }
      } catch (error) {
         config.errorMsg(this,'导入失败');
      }
    },

    //编辑
    toEdit(row) {
     this.currentJober = { ...row };
      this.editVisible = true;
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
            let res = await deleteJobhunterById({ id: id });
            if (res.status === 200) {
              config.successMsg(this, "删除成功");
              this.findAllJober();
            } else { 
              config.errorMsg(this, "删除失败");
            }
          } catch (error) {
            console.log(error);
            config.errorMsg(this, "有关联信息存在，删除失败");
          }
        })
        .catch(() => {
          // console.log(error);
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
                  let res = await deleteJobhunterById({ id: id });
                  result.push(res.status);
                } catch (error) {
                  result.push(500);
                }
              })
              setTimeout(() => {
                // console.log(result);
                //判断是否都是200
                let resu = result.every((item) => {
                  return item === 200;
                });
                if (resu) {
                  config.successMsg(this, "批量删除成功");
                } else {
                  config.errorMsg(this, "批量删除失败");
                }
                this.findAllJober();
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

    //查找所有的求职者信息
    async findAllJober(){
      try {
        let res=await findAllJobhunter();
        this.jobhunterData=res.data;
         this.currentPage = 1;
        //学历数组
        let educationArr=res.data.map(item=>{
          return item.education;
        });
        //去重
        this.educationData=[...new Set(educationArr)]
        //性别数组
        let genderArr=res.data.map(item=>{
          return item.gender;
        });
        //去重
        this.genderData=[...new Set(genderArr)]
        //真实姓名数组
        // let realnameArr=res.data.map(item=>{
        //   return item.realname;
        // });
        // this.realnameData={...realnameData}
       
        
      } catch (error) {
        config.errorMsg(this,'查找错误')
      }
    }
  
  },
   //生命周期钩子函数，组件创建完毕
  created() {
   
    this.findAllJober();
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.select{
  padding: 10px;
};
.pageDiv{
  float: right;
 
};
.borderDiv{
  .span1{
    margin-top: 20px;
  };
  
  width: 300px;
  height: 150px;
  border: 2px dashed rgb(136, 144, 145);
  margin: 10px auto;
  padding: 10px;
};
.btn{
  float: right;
  margin-top:-15px;
};
.searchDiv{
        float: right;
        width: 350px;
        margin-top: 30px;
      } 

</style>