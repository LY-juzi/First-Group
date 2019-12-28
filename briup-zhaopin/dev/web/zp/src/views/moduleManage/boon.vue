/*
 * @Author: liuyr 
 * 福利管理页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: luy
 * @Last Modified time: 2019-12-27 19:35:28
 */
<template>
  <div id="moduleBoon">
    <div class="searchDiv">
      <el-select @change="selectChange" v-model="option" placeholder="全部">
        <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
      </el-select>
    </div>

    <div class="tableDiv">
      <el-table
        ref="multipleTable"
        :data="welfareList"
        tooltip-effect="dark"
        style="width: 80%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column align="center" type="selection" width="40"></el-table-column>
        <el-table-column align="center" prop="name" label="福利名称"></el-table-column>
        <el-table-column align="center" prop="status" label="状态"></el-table-column>
        <el-table-column align="center" label="操作" width="100">
          <template slot-scope="scope">
            <div v-if="a(scope.row)">
              <el-button @click="changeStatus(scope.row)" type="text" size="medium">冻结</el-button>
            </div>
            <div v-else>
              <el-button @click="changeStatus(scope.row)" type="text" size="medium">恢复</el-button>
            </div>
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
          :total="welfareTemp.length"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import config from "@/utils/config.js"; //import的config是一个对象
import {  findAllWelfare,  saveOrUpdateWelfare,  findWelfareById,  deleteById} from "@/api/welfare.js";

export default {
  data() {
    return {
      options: ["全部", "使用中", "被冻结"],
      option: "",
      // 福利数组
      welfareData: [],
      // 副本福利数组
      welfareTemp: [],
      // 当前页
      currentPage: 1,
      // 每页条数
      pageSize: config.pageSize,
      //批量删除ids
      ids: [],
    };
  },
  computed: {
    // 分页数据
    welfareList() {
      let temp = [...this.welfareTemp];
      let page = this.currentPage;
      let pageSize = config.pageSize;
      return temp.slice((page - 1) * pageSize, page * pageSize);
    }
  },
  methods: {
    // 页数发生改变
    pageChange(page) {
      this.currentPage = page;
    },

    // 下拉框发生改变
    selectChange(val) {
      this.currentPage = 1;
      if (val === "全部") {
        this.welfareTemp = [...this.welfareData];
        return;
      }
      // 将welfareData中的数据过滤，item为welfareData里的每条数据，如果选中的状态和item的状态一致则返回
      this.welfareTemp = this.welfareData.filter(item => {
        return item.status === val;
      });
    },

    // 状态改变后筛选数据
    findStatusChange(){
      if(option!=""){
          this.welfareData = this.findAllWel();
          console.log(option);
          this.welfareTemp = this.welfareData.filter( item => {
            return item.status === option;
          });
      }
    },

    // 操作使用的方法，切换状态，只有点击才使用，故created() {}中不写入
    async changeStatus(row) {
      try {
        // {...temp}将row复制给temp，若是let temp = row为赋值，两个将指向同一块地址，一个改了另一个也会跟着变。
        // 复制是将复制出来的副本进行更改操作，传入后台，后台刷新上row
        let { ...temp } = row;
        temp.status = row["status"] === "使用中" ? "被冻结" : "使用中";
        // 将更改后的数据传入后台
        await saveOrUpdateWelfare(temp);
        // 刷新列表
        this.findStatusChange(temp);
        // 提示框
        config.successMsg(this, "操作成功");
      } catch (error) {
        // 在config.js中封装了方法，并且在script最前面引用进来
        config.erbusinessDatarorMsg(this, "操作错误");
      }
    },

    // 判断传入的参数是否为使用中
    a(x) {
      return x.status === "使用中" ? true : false;
    },

    // 复选框选中切换
    handleSelectionChange(val) {
      // val就是选中对象组成的数组
      // console.log(val);
      let ids = val.map(item => {
        return item.id;
      });
      this.ids = ids;
    },

    // 找出所有福利
    async findAllWel() {
      try {
        let res = await findAllWelfare();
        this.welfareData = res.data;
        this.welfareTemp = [...res.data];
      } catch (error) {
        // 在config.js中封装了方法，并且在script最前面引用进来
        config.erbusinessDatarorMsg(this, "查找错误");
      }
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
  },
  created() {
    // 打开页面就调用的方法
    this.findAllWel();
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.tableDiv {
  margin: 10px;
}
.footerDiv {
  // 清除父元素的浮动
  overflow: hidden;
  margin: 10px;
  .btnDiv {
    float: left;
  }
  .pageDiv {
    float: right;
    margin-right: 250px;
  }
}
</style>