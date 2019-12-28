/*
 * @Author: liuyr 
 * 商家列表页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: luy
 * @Last Modified time: 2019-12-27 19:54:27
 */
<template>
  <div id="businessList">
    {{currentBus}}
    <div class="searchDiv">
      <el-select @change="provinceChange" size="mini" v-model="province" clearable placeholder="省份">
        <el-option  v-for="item in provinceData"  :key="item.id"  :label="item.name"  :value="item.name">
          <!-- 上面显示的值由value决定 -->
        </el-option>
      </el-select>
      <el-select @change="cityChange" size="mini" v-model="city" clearable placeholder="城市">
        <el-option v-for="item in cityData" :key="item.id" :label="item.name" :value="item.name"></el-option>
      </el-select>
      <el-select @change="industryChange" size="mini" v-model="industry" clearable placeholder="行业">
        <el-option v-for="item in industryData" :key="item" :label="item" :value="item"></el-option>
        <!-- 直接用item，因为这里是字符串 -->
      </el-select>
      <el-select @change="scaleChange" size="mini" v-model="scale" clearable placeholder="规模">
        <el-option v-for="item in scaleData" :key="item" :label="item" :value="item"></el-option>
        <!-- 直接用item，因为这里是字符串 -->
      </el-select>
    </div>

    <div class="tableDiv">
      <el-table ref="multipleTable" :data="businessList" tooltip-effect="dark" style="width: 100%" @selection-change="selectionChange">
        <el-table-column align="center" type="selection" width="55"></el-table-column>
        <el-table-column align="center" prop="name" label="企业名称"></el-table-column>
        <el-table-column align="center" prop="contactName" label="联系人"></el-table-column>
        <el-table-column align="center" prop="industry" label="行业"></el-table-column>
        <!-- scope.row拿到当前对象 -->
        <el-table-column align="center" label="所在地">
          <template slot-scope="scope">{{ scope.row.province }}-{{ scope.row.city }}</template>
        </el-table-column>
        <el-table-column align="center" prop="scale" label="公司规模"></el-table-column>
        <el-table-column align="center" label="详情">
          <template slot-scope="scope">
            <el-button @click="toSee(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="toEdit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="toDelete(scope.row.id)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="footerDiv">
        <div class="btnDiv">
            <el-button @click="toBatchDelete" size="mini" type="danger" plain>批量删除</el-button>
        </div>
        <div class="pageDiv">
            <el-pagination  :page-size="pageSize" :current-page.sync="currentPage" background @current-change="pageChange" layout="prev, pager, next"  :total="businessData.length"></el-pagination>
        </div>
    </div>

    <!-- 查看模态框 -->
    <el-dialog  :title="currentBus.name"  :visible.sync="seeVisible">
        <div class="seeDiv">
            <span>行业类型：</span>
            {{currentBus.industry}}
        </div>
        <div class="seeDiv">
            <span>成立时间：</span>
            {{currentBus.establishedTime}}
        </div>
        <div class="seeDiv">
            <span>注册资本：</span>
            {{currentBus.registeredCapital}}
        </div>
        <div class="seeDiv">
            <span>公司规模：</span>
            {{currentBus.scale}}
        </div>
        <div class="descDiv">
            &nbsp;&nbsp;&nbsp;&nbsp;{{currentBus.description}}
        </div>
        <div class="imgDiv">
          <a :href="currentBus.businessLicense" target="_blank">
            <img :src="currentBus.businessLicense" alt="" width="300" height="200"> 
          </a>
        </div>
    </el-dialog>

    <!-- 修改模态框 -->
    <el-dialog title="修改商家信息" :visible.sync="editVisible" width="60%" :before-close="beforeClose"> 
        <el-form :model="currentBus" :rules="rules" ref="ruleForm">
              <el-row :gutter="20">
                <el-col :span="12">
                  <!-- prop链接的是下面data中的rules校验规则 -->
                  <el-form-item prop="name" label="公司名称" :label-width="formLabelWidth">
                      <el-input v-model="currentBus.name"></el-input>
                  </el-form-item>
                </el-col>          
                <el-col :span="12">
                  <el-form-item prop="industry" label="所属行业" :label-width="formLabelWidth">
                      <el-input v-model="currentBus.industry"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item prop="scale" label="公司规模" :label-width="formLabelWidth">
                      <el-input v-model="currentBus.scale"></el-input>
                  </el-form-item>
                </el-col>          
                <el-col :span="12">
                  <el-form-item label="所在城市" :label-width="formLabelWidth" required>
                      <el-row>
                        <el-col :span="12">
                            <el-from-item prop="province">
                                <el-select @change="dialogProvinChange" clearable="true" v-model="currentBus.province" placeholder="请选择省份">
                                  <el-option v-for="item in provinceData" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </el-from-item>
                        </el-col>
                        <el-col :span="12">
                          <el-from-item prop="city">
                              <el-select v-model="currentBus.city" clearable="true"  placeholder="请选择城市">
                                <el-option v-for="item in provinceCityData" :key="item.id" :label="item.name" :value="item.name"></el-option>
                              </el-select>
                          </el-from-item> 
                        </el-col>
                      </el-row>  
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item prop="contactName" label="联系人" :label-width="formLabelWidth">
                      <el-input v-model="currentBus.contactName"></el-input>
                  </el-form-item>
                </el-col>          
                <el-col :span="12">
                  <el-form-item prop="contactPhone" label="联系电话" :label-width="formLabelWidth">
                      <el-input v-model="currentBus.contactPhone"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item prop="location" label="详细地址" :label-width="formLabelWidth">
                      <el-input v-model="currentBus.location" type="textarea" :rows="4"></el-input>
                  </el-form-item>
                </el-col>          
                <el-col :span="12">
                  <el-form-item prop="description" label="公司简介" :label-width="formLabelWidth">
                      <el-input v-model="currentBus.description" type="textarea" :rows="4"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="toCancel('ruleForm')">取 消</el-button>
          <el-button size="mini" type="primary" @click="toSave('ruleForm')" >确 定</el-button>
        </div>
    </el-dialog>

  </div>
</template>

<script>
import { findAllProvince } from "@/api/province.js";
import { findAllCity, findCityByProvinceId } from "@/api/city.js";
import { findAllBusiness,findBusinessByProvince, findBusinessByCity, findBusinessByIndustry, findBusinessByScale, deleteById ,saveOrUpdateBusiness} from "@/api/business.js";
import config from "@/utils/config.js"; //import的config是一个对象
import { async } from 'q';

export default {
  data() {
    return {
      // 省份
      province: "",
      // 城市
      city: "",
      // 行业
      industry: "",
      // 规模
      scale: "",
      // 省份数组
      provinceData: [],
      // 城市数组
      cityData: [],
      // 行业数组
      industryData: [],
      // 规模数组
      scaleData: [],
      // 商家数组
      businessData: [],
      // 商家列表,表格中显示的数据
      // businessList: []
      // 当前页
      currentPage:1,
      // 每页条数
      pageSize:config.pageSize,
      // 批量删除的ids
      ids:[],

      // 当前查看或修改的对象
      currentBus: {},
      // 查看模态框的显示与否
      seeVisible:false,
      // 编辑模态框标题名称所占宽度
      formLabelWidth:'80px',
      // 编辑模态框的显示与否
      editVisible:false,
      // 省份对应的城市信息
      provinceCityData:[],

      // 校验规则，对应prop属性
      rules: {
          name: [
            { required: true, message: '请输入公司名称', trigger: 'blur' }
          ],
          industry:[
            { required: true, message: '请输入行业类型', trigger: 'blur' }
          ],
          scale:[
            { required: true, message: '请输入公司规模', trigger: 'blur' }
          ],
          province:[
            { required: true, message: '请选择省份', trigger: 'change' }
          ],
          city:[
            { required: true, message: '请选择城市', trigger: 'change' }
          ],
          contactName:[
            { required: true, message: '请输入联系人', trigger: 'blur' }
          ],
          contactPhone:[
            { required: true, message: '请输入联系电话', trigger: 'blur' }
          ],
          location:[
            { required: true, message: '请输入详细地址', trigger: 'blur' }
          ],
          description:[
            { required: true, message: '请输入公司简介', trigger: 'blur' }
          ],
        }
    };
  },
  computed: {
    // 分页数据
    businessList(){
        let temp = [...this.businessData];
        let page = this.currentPage;
        let pageSize = config.pageSize;
        return temp.slice((page-1)*pageSize,page*pageSize);
    }
  },
  methods: {
    /**声明方法 */

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

    // 编辑模态框省份发生改变
    async dialogProvinChange(val){
      // 重置城市下拉列表
      this.currentBus.city = "";
      // 通过省份id获取城市
      try {
        // provinceId是swagger中需要的数据名
        let res = await findCityByProvinceId({provinceId:val});
        this.provinceCityData = res.data;
      } catch (error) {
        console.log(error);
        config.errorMsg(this,"通过省份查找城市失败");
      }
    },

    // 页数发生改变
    pageChange(page){
      this.currentPage = page;
    },

    // 省份发生改变
    async provinceChange(val) {
      this.city = "";
      this.scale = "";
      this.industry = "";
      // val,是option的value值
      // 如果有值，即选中了某城市，就筛选
      if (val) {
        try {
          let res = await findBusinessByProvince({ province: val });
          this.businessData = res.data;
          this.currentPage = 1;
          // 如想把id=1001,传递这个数据到后台，要findBusinessByProvince({id:1001}), 把数据作为对象传递进去
          // 不然只写findBusinessByProvince(id)是把id的值1001传递了，但后台不知道这个1001是id值
        } catch (error) {
          config.errorMsg(this,"通过省份查找商家信息错误");
        }
      } else {
        this.findAllBus();
      }
    },
    // 城市发生改变
    async cityChange(val) {
      this.province = "";
      this.scale = "";
      this.industry = "";
      // val,是option的value值
      // 如果有值，即选中了某城市，就筛选
      if (val) {
        try {
          let res = await findBusinessByCity({ city: val });
          this.businessData = res.data;
          this.currentPage = 1;
        } catch (error) {
          config.errorMsg(this, "通过城市查找商家信息错误");
        }
      } else {
        this.findAllBus();
      }
    },
    // 行业发生改变
    async industryChange(val) {
      this.province = "";
      this.scale = "";
      this.city = "";
      // val,是option的value值
      // 如果有值，即选中了某行业，就筛选
      if (val) {
        try {
          let res = await findBusinessByIndustry({ industry: val });
          this.businessData = res.data;
          this.currentPage = 1;
        } catch (error) {
          config.errorMsg(this, "通过行业查找商家信息错误");
        }
      } else {
        this.findAllBus();
      }
    },
    // 规模发生改变
    async scaleChange(val) {
      this.province = "";
      this.industry = "";
      this.city = "";
      // val,是option的value值
      // 如果有值，即选中了某规模，就筛选
      if (val) {
        try {
          let res = await findBusinessByScale({ scale: val });
          this.businessData = res.data;
          this.currentPage = 1;
        } catch (error) {
          config.errorMsg(this, "通过规模查找商家信息错误");
        }
      } else {
        this.findAllBus();
      }
    },

    // 查看
    toSee(row) {
      // {...row}是将对象展开      [...row]是将数组展开
      this.currentBus = {...row};
      this.seeVisible = true;
    },
    // 编辑
    toEdit(row) {
      this.currentBus = {...row};
      this.editVisible = true;
    },
    // 编辑中的保存确定
    toSave(formName){
       this.$refs[formName].validate(async (valid) => {
          if (valid) {
            // 通过验证
            // 将省份id处理成省份名字再保存
            let province =this.currentBus.province;
            // 如果省份发生更改（不改变省份的话，它的类型本来就是字符串）
            // 汉字转是NAN，数字类型是number
            if(+province){
              // 将省份id通过过滤省份数组处理为省份名字再保存
              // [0]拿省份对象
              let result = this.provinceData.filter((item)=>{
                return item.id === +province;
              })[0];
              // result是省份对象 
              // 修改的对象是数据模型里的，会触发页面重新渲染。但这里修改的是对象中的属性，所以不会重新渲染。若是重新修改了对象，则会触发
              this.currentBus.province = result.name;
            }
            // 保存
            try {
              let res = await saveOrUpdateBusiness(this.currentBus);
              if(res.status===200){
                  this.findAllBus();
                  this.editVisible = false;
                  config.successMsg(this,"修改成功");
              }else{
                  config.errorMsg(this,"修改失败");
              }
            } catch (error) {
                console.log(error);
                config.errorMsg(this,"修改失败");
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });

    },
    // 删除
    toDelete(id) {
      // alert("删除");
      this.$confirm('是否删除该记录?', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          // 访问后台接口
          try {
              let res = await deleteById({id:id});
              if(res.status===200){
                config.successMsg(this,"删除成功");
                this.findAllBus();
              }else{
                config.errorMsg(this,"删除失败");
              }
          } catch (error) {
              config.errorMsg(this,"删除失败");
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
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
                } else {
                  config.errorMsg(this, "批量删除失败");
                }
                this.findAllWel();
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

    // 复选框选中切换
    selectionChange(val) {
      // val就是选中对象组成的数组
      // console.log(val);
      let ids = val.map((item) => {
        return item.id;
      });
      this.ids = ids;
    },

    // 查找所有省份信息,在script最前面引用API里的接口
    // await要用在async修饰的方法里
    async findAllPro() {
      try {
        let res = await findAllProvince();
        this.provinceData = res.data;
      } catch (error) {
        // 在config.js中封装了方法，并且在script最前面引用进来
        config.erbusinessDatarorMsg(this, "查找错误");
      }
    },
    // 查找所有城市信息
    async findAllCi() {
      try {
        let res = await findAllCity();
        this.cityData = res.data;
      } catch (error) {
        // 在config.js中封装了方法，并且在script最前面引用进来
        config.errorMsg(this, "查找错误");
      }
    },
    // 查找所有行业信息
    async findAllBus() {
      try {
        let res = await findAllBusiness();
        this.businessData = res.data;
        this.currentPage = 1;
        
        // 行业数组,映射res.data
        let industryArr = res.data.map(item => {
          return item.industry;
        });
        // 原本的  this.scaleData = industryArr;
        // 去重复，因为Set集合没有重复的。  ...将所有展开然后用Set集合装到industryArr里
        this.industryData = [...new Set(industryArr)];

        // 规模数组
        let scaleArr = res.data.map(item => {
          return item.scale;
        });
        // this.scaleData = scaleArr;
        this.scaleData = [...new Set(scaleArr)];
      } catch (error) {
        // 在config.js中封装了方法，并且在script最前面引用进来
        config.errorMsg(this, "查找错误");
      }
    }
  },
  created() {
    /**调用js里的方法，要用this */
    this.findAllPro();
    this.findAllCi();
    this.findAllBus();
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.tableDiv{
  margin: 10px;
}
.footerDiv{
  // 清除父元素的浮动
  overflow: hidden;
  margin: 10px;
  .btnDiv{
    float: left;
  }
  .pageDiv{
    float:right;
  }
}
.seeDiv{
  border-bottom: 1px solid #ccc;
  line-height: 30px;
  span{
    color: #999;
    font-weight: bold;
  }
}
.descDiv{
  font-weight: bold;
  color: #777;
  font-size:12px;
  line-height: 30px;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}
.imgDiv{
  text-align: center;
}
.dialog-footer{
  margin-top: -30px;
  text-align: center;
}
</style>