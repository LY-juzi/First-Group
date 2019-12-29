/*
 * @Author: liuyr 
 * 招聘审核页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: lijunkun
 * @Last Modified time: 2019-12-29 12:25:59
 */
<template>
  <div id="recruitCheck">
    <!-- {{recruitCheck}}npm -->
    <!-- 定义一个关键字下拉列表，输入框还有按钮，在关键字范围内进行查询 -->
    <div class="searchDiv">
      <!-- 搜索按钮 -->
      <el-button icon="el-icon-search" style="width:5px" class="box" size="mini" @click="tochaxun(input)"></el-button >
      <!-- 关键字输入框 -->
      <el-input style="width:12%"
            placeholder="请输入内容"
            v-model="input"
            clearable class="box" size="mini">
          </el-input>
      <!-- 关键字下拉列表 -->
      <el-select v-model="value" clearable style="width:9%" @change="valueChange" placeholder="关键字" class="box" size="mini"    >
          <el-option
            v-for="item in boxData"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
          </el-select>
    </div>
    <!-- {{jobData}}============ -->
      
    <!-- {{recruitData}} -->
    <div class="serchDiv">
      <el-select v-model="job" clearable placeholder="职位类型" @change="jobChange">
    <el-option
      v-for="item in jobData"
      :key="item.id"
      :label="item.name"
      :value="item.name">
    </el-option>
  </el-select>
    </div>
    <div class="tableDiv">
       <el-table
    ref="multipleTable"
    :data="recruitCheck"
    tooltip-effect="dark"
    style="width: 100%"
    :header-cell-style="{background:'#98FB98',color:'#FFFFFF'}"
    >
    <el-table-column
      label="招聘标题"
      
      prop="title">
    </el-table-column>
    <el-table-column
      label="发布人"
      
      prop="contactName">
    </el-table-column>
    <el-table-column
      prop="contactPhone"
      label="联系方式"
      show-overflow-tooltip>
    </el-table-column>
     <el-table-column
      prop="job"
      label="职位"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="publishTime"
      label="发布时间"
      show-overflow-tooltip
      >
    </el-table-column>
    <el-table-column align="center" label="详细信息">
          <template slot-scope="scope">
            <el-button @click="toSee(scope.row)" size="small" type="text" round >查看</el-button>
          </template>
        </el-table-column>
    
    <el-table-column align="center" label="状态" width="100"  prop="status">
          
        </el-table-column>


        
  </el-table>

  <div class="pageDiv">
        <el-pagination
          :page-size="pageSize"
          :current-page.sync="currentPage"
          background
          @current-change="pageChange"
          layout="prev, pager, next"
          :total="recruitData.length"
        ></el-pagination>
      </div>

  <!-- 查看模态框 -->
   <el-dialog :title="currentBus.title" :visible.sync="seeVisible" >
      <div class="seeDiv">
        <span>标题：</span>
        {{currentBus.title}}
      </div>
      <div class="seeDiv">
        <span>省份：</span>
        {{currentBus.province}}
        </div>
      <div class="seeDiv">
        <span>发布时间：</span>
        {{currentBus.publishTime}}
      </div>
      <div class="seeDiv">
        <span>工作时长：</span>
        {{currentBus.workingHours}}
        </div>
      <div class="seeDiv">
        <span>联系人：</span>
        {{currentBus.contactName}}
      </div>
      <div class="seeDiv">
        <span>联系方式：</span>
        {{currentBus.scale}}
      </div>
      <div class="seeDiv">
        <span>薪资：</span>
        {{currentBus.salary}}
        </div>

      <div class="seeDiv">
        <span>福利：</span>
        {{currentBus.welfare}}
        </div>
      <div class="descDiv">
        <span>详情：</span>
        {{currentBus.description}}
        </div>

    </el-dialog>
    </div>
  </div>
</template>

<script>
import config from "@/utils/config.js";
import {findAllEmployment,findEmploymentByJob,} from '@/api/recruit.js';
import {findAllJobs} from '@/api/job.js';

export default {
  data() {
    return {
      job:'',
      jobData:[],
      currentBus: {},
      recruitL:"",
      recruitData:[],
      // recruitCheck:[],
      seeVisible: false,
      //当前页
      currentPage: 1,
      //每页条数
      pageSize: config.pageSize,
    };
  },
  computed: {
    recruitCheck() {
      let temp = [...this.recruitData];
      let page = this.currentPage;
      let pageSize = config.pageSize;
      console.log(temp);
      console.log(page);
      console.log(pageSize);
      return temp.slice((page - 1) * pageSize, page * pageSize);
    }
  },
  
  methods: {
     // 页数发生改变
    pageChange(page) {
      this.currentPage = page;
    },
    async jobChange(val) {
      this.title = "";
      //val 是option的value值
      if (val) {
        try {
          let res = await findEmploymentByJob({ job: val });
          this.recruitData = res.data;
          this.currentPage = 1;

          
        } catch (error) {
          config.errorMsg(this, "通过职位查找招聘信息错误");
        }
      } else {
        this.findAllEmp();
      }
    },
    beforeClose(){
      this.$refs['fuleForm'].resertFields();
      this.editVisible = false;
    },
    
    async findAllEmp(){
      try {
        let res = await findAllEmployment();
        this.recruitData = res.data;
        this.currentPage = 1;
      } catch (error) {
        config.errorMsg(this, "查找错误");
      }
    },
     toSee(row) {
      this.currentBus = { ...row };
      this.seeVisible = true;
    },
    
    async findAllJob(){
      try {
        let res = await findAllJobs();
        let temp = res.data;
        this.currentPage = 1;
        //去重
        this.jobData =temp;
      } catch (error) {
        config.errorMsg(this, "查找错误");
      }
    },
    async findEmploymentByJ(){
      try {
        let res = await findEmploymentByJob();

        this.recruitData = res.data;
        this.currentPage = 1;
      } catch (error) {
        config.errorMsg(this, "查找错误");
      }
    }

  },
  created() {
    this.findAllEmp();
    this.findEmploymentByJ();
    this.findAllJob();
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
  .btnDiv {
    float: left;
  }
  .pageDiv {
    float: right;
  }
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
}.tableDiv {
  margin-top: 10px;
}
.box{
  float: right
}
.footerDiv{
  overflow: hidden;
  margin-top: 10px;
}
.btnDiv{
  float: left;
}
.pageDiv{
  float: right;
}
.Reset{
  float: right;
}
.seeDiv {
  border-bottom: 1px solid #ccc;
  line-height: 30px;
  font-weight: bold;
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
.dialog-footer{
  text-align: center;
  margin-top: -40px;
}
</style>