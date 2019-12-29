/*
 * @Author: yanzh 
 * 求职列表页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: lijunkun
 * @Last Modified time: 2019-12-29 20:18:55
 */
<template>
  <div id="jobList">
    <!-- {{findAllWithJobhAndEmplData}} -->
    <el-button type="success" plain size="small" @click="seeAll()" name="one">全部</el-button>
    <el-button type="success" plain size="small" @click="seeContact()" name="one">待联系</el-button>
    <el-table :data="findAllWithJobhAndEmplDataList" class="tb" :header-cell-style="{background:'#87CEEB',color:'#FFFFFF'}">
      <el-table-column
        align="center"
        prop="jobhunter.realname"
        label="求职人">
      </el-table-column>
      <el-table-column
        align="center"
        prop="jobhunter.telephone"
        label="联系方式">
      </el-table-column>
      <el-table-column
        align="center"
        prop="employment.job"
        label="求职岗位">
      </el-table-column>
      <el-table-column
        align="center"
        label="简历">
        <template slot-scope="scope">
            <!-- scope作用域 -->
            <el-button @click="toSee(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="askTime"
        label="申请时间">
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagi">
      <el-pagination
        @current-change="currentChange"
        :current-page.sync="currentPage"
        size="mini"
        background
        layout="prev, pager, next"
        :total="findAllWithJobhAndEmplData.length"
      ></el-pagination>
    </div>

    <!-- 查看简历 -->
    <el-dialog title = ""  :visible.sync="dialogTableVisible" width="35%">
    <el-tag color="skyblue" size="mini">个人信息</el-tag>
                <div>
                    <table class="tb">
                        <tr>
                          <td class="td_content" width="250px">性别：{{JobhAndEmplData.jobhunter.gender}}</td>
                          <td class="td_content" width="250px">最高学历：{{JobhAndEmplData.jobhunter.education}}</td>
                        </tr>
                        <br>
                        <tr>
                          <td class="td_content" width="250px">出生年月：{{JobhAndEmplData.jobhunter.birth}}</td>
                          <td class="td_content" width="250px">工作经历：{{JobhAndEmplData.jobhunter.workTime}}</td>
                        </tr>
                    </table>
                </div>
                <!-- 动态修改标题 -->
                <div slot="title">
                  <span class="title-name"> {{ JobhAndEmplData.jobhunter.realname }}</span>
                </div>
    </el-dialog>

  </div>
</template>
<script>
//employment-jobhunter引入方法
import { findAllWithJobhAndEmpl } from "@/api/employment-jobhunter.js";

export default {
  data() {
    return {
      //默认分页为第一页
      currentPage:1,
      //简历的对话框，默认为不显示
      dialogTableVisible:false,
      //通过findAllWithJobhAndEmpl方法所检索到的所有数据
      findAllWithJobhAndEmplData:[], 
      //求职人信息
      JobhAndEmplData:{jobhunter:{}},
    };
  },
  computed: {
    findAllWithJobhAndEmplDataList() {
      //  1   2   3
      let temp = [...this.findAllWithJobhAndEmplData];
      let pageSize = 10;
      let page = this.currentPage;
      return temp.slice((page - 1) * pageSize, page * pageSize);
      //截取数组
      /* temp.slice(0, pageSize);
      temp.slice((page - 1) * pageSize, pageSize * page);
      temp.slice(10, pageSize * 2);
      temp.slice((page - 1) * pageSize, pageSize * page);
      temp.slice(20, pageSize * 3);
      temp.slice((page - 1) * pageSize, pageSize * page); */
      //arr.slice(2, 5); //开始位置，结束位置，不包括结束位置的元素  [6,9,3]
    }
  },
  methods: {

    //查询所有求职信息(拓展)
    //异步函数
    async findAllWithJobhAndEmpl() {
      try {
        // 等待findAllWithJobhAndEmpl方法的调用
        let res = await findAllWithJobhAndEmpl();
        this.findAllWithJobhAndEmplData = res.data; 
      } catch (error) {
        config.errorMsg(this, "查找错误");
      }
    },

    //查询并过滤所有已联系的求职信息
    async findAllWithJobhAndEmpl2() {
      try {
        let res = await findAllWithJobhAndEmpl();
        this.findAllWithJobhAndEmplData = res.data.filter((item)=>{
          return item.remark !== "已联系";
        });
      //catch捕获错误操作
      } catch (error) {
        config.errorMsg(this, "查找错误");
      }
    },

    //查看全部
    seeAll(){
      this.findAllWithJobhAndEmpl();
    },
    //查看待联系
    seeContact(){
      this.findAllWithJobhAndEmpl2();
    },
    
    //查看简历
    toSee(row) {
      this.dialogTableVisible=true;
      this.JobhAndEmplData = {...row};
    },
    
  },
  created() {
    this.findAllWithJobhAndEmpl();
  },
  mounted() {}
};
</script>
<style scoped>
.tb{
  width:"100%";
  margin-top: 15px;
  /* font-weight: bold; */
}
.td_content{
  margin-left: 40px;
}
.pagi {
  text-align: right;
  margin-top: 10px;
}
</style>