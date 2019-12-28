/*
 * @Author: liuyr 
 * 首页
 * @Date: 2019-12-23 15:26:54 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-12-23 15:27:27
 */
<template>
  <div id="index">
    <el-row :gutter="20" class="index-num">
      <el-col :span="6">
        <div class="index-num-one">
          <div>
            今日活动用户：
            <span>220</span>个
          </div>
          <div>
            今日注册用户：
            <span>288</span>人
          </div>
          <div>
            总注册用户：
            <span>1999</span>人
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="index-num-two">
          <div>
            今日活动企业：
            <span>120</span>家
          </div>
          <div>
            今日注册企业：
            <span>28</span>家
          </div>
          <div>
            总注册企业：
            <span>320</span>家
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="index-num-three">
          <div>
            今日岗位投放：
            <span>220</span>个
          </div>
          <div>
            浏览个数：
            <span>289</span>个
          </div>
          <div>
            今日简历上传：
            <span>290</span>个
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="index-num-four">
          <div>
            今日企业联系：
            <span>220</span>个
          </div>
          <div>
            等待面试人数：
            <span>156</span>个
          </div>
          <div>
            今日撤岗个数：
            <span>32</span>个
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="index-curve">
      <el-row>
        <el-col :span="18">
          <div class="index-curve-chart">
            <div id="indexOrder" style="min-width:400px;height:300px"></div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="index-curve-chart">
            <div id="indexBusiness" style="min-width:200px;height:150px"></div>
          </div>
          <div class="index-curve-chart">
            <div id="indexBrush" style="min-width:200px;height:150px"></div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="index-news">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="news">
            <div class="index-title">
              <div>最新招聘</div>
              <div @click="toVouncher" class="linkSpan">更多>></div>
            </div>
            <div class="index-content">
              <el-table :data="rechargeData" style="width:100%;font-size:12px;">
                <el-table-column align="center" prop="id" label="编号" width="50"></el-table-column>
                <el-table-column align="center" prop="position" label="岗位" width="130"></el-table-column>
                <el-table-column align="right" prop="name" label="企业"></el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="posts">
            <div class="index-title">
              <div>最新就业</div>
              <div @click="toVouncher" class="linkSpan">更多>></div>
            </div>
            <div class="index-content">
              <el-table :data="advanceData" style="width:100%;font-size:12px;">
                <el-table-column align="left" prop="id" label="编号"></el-table-column>
                <el-table-column align="center" prop="position" label="岗位"></el-table-column>
                <el-table-column align="right" prop="name" label="用户"></el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="servers">
            <div class="index-title">
              <div>最新简历</div>
              <div @click="toLogs" class="linkSpan">更多>></div>
            </div>
            <div class="index-content">
              <el-table :data="resumeData" style="width:100%;font-size:12px;">
                <el-table-column align="left" prop="id" label="编号"></el-table-column>
                <el-table-column align="center" prop="content" label="内容"></el-table-column>
                <el-table-column align="right" prop="name" label="上传者"></el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Highcharts from "highcharts";
import conf from "@/utils/config";
export default {
  name: "Index",
  computed: {},
  data() {
    return {
      rechargeData: [
        {
          id: 1001,
          position: "前端工程师",
          name: "上海亚信科技有限公司"
        },
        {
          id: 1002,
          position: "Web前端工程师",
          name: "哔哩哔哩电竞公司"
        },
        {
          id: 1003,
          position: "Python工程师",
          name: "上海凯捷咨询有限公司"
        },
        {
          id: 1004,
          position: 1000,
          name: "上海群硕软件开发公司"
        },
        {
          id: 1004,
          position: 1000,
          name: "上海爱用宝科技有限公司"
        }
      ],
      advanceData: [
        {
          id: 1001,
          position: "Web前端工程师",
          name: "宋瑶"
        },
        {
          id: 1002,
          position: "Web前端工程师",
          name: "吴鹏"
        },
        {
          id: 1003,
          position: "Java工程师",
          name: "张数霞"
        },
        {
          id: 1004,
          position: "Python工程师",
          name: "唐磊"
        },
        {
          id: 1004,
          position: "Java工程师",
          name: "唐阳阳"
        }
      ],
      resumeData: [
        {
          id: 1001,
          content: "上传简历",
          name: "刘甜甜"
        },
        {
          id: 1002,
          content: "上传简历",
          name: "李晓奕"
        },
        {
          id: 1003,
          content: "上传简历",
          name: "王凯"
        },
        {
          id: 1005,
          content: "上传简历",
          name: "范烨"
        },
        {
          id: 1005,
          content: "上传简历",
          name: "郑戎"
        }
      ]
    };
  },
  mounted() {
    this.toDraw();
    this.toDrawBusiness();
    this.toDrawBrush();
  },
  methods: {
    //跳转到充值中心页面
    toVouncher() {
      this.$router.push("/voucherCenter/index");
    },
    //跳转到服务器页面
    toLogs() {
      this.$router.push("/logs/index");
    },
    //绘制堆叠柱状图
    toDraw() {
      var chart = Highcharts.chart("indexOrder", {
        credits: {
          enabled: false
        },
        colors: ["#27A9E3", "#28B779"],
        chart: {
          type: "column",
          spacing: [0, 0, 0, 0]
        },
        title: {
          text: "待就业和已就业",
          y: 20,
          style: {
            fontSize: "14px"
          }
        },
        xAxis: {
          categories: [
            "11月13日",
            "11月14日",
            "11月15日",
            "11月16日",
            "11月17日",
            "11月18日",
            "11月19日"
          ]
        },
        yAxis: {
          min: 0,
          title: {
            text: ""
          },
          stackLabels: {
            // 堆叠数据标签
            enabled: true,
            style: {
              fontWeight: "bold",
              color: (Highcharts.theme && Highcharts.theme.textColor) || "gray"
            }
          }
        },
        legend: {
          align: "right",
          x: -30,
          verticalAlign: "top",
          y: 25,
          floating: true,
          backgroundColor:
            (Highcharts.theme && Highcharts.theme.background2) || "white",
          borderColor: "#CCC",
          borderWidth: 1,
          shadow: false
        },
        tooltip: {
          pointFormat:
            '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}单</b>' +
            "<br/>",
          shared: true
        },
        plotOptions: {
          column: {
            stacking: "normal",
            dataLabels: {
              enabled: true,
              color:
                (Highcharts.theme && Highcharts.theme.dataLabelsColor) ||
                "white",
              style: {
                // 如果不需要数据标签阴影，可以将 textOutline 设置为 'none'
                textOutline: "1px 1px black"
              }
            }
          }
        },
        series: [
          {
            name: "待就业",
            data: [234, 545, 373, 454, 363, 243, 101]
          },
          {
            name: "已就业",
            data: [234, 545, 373, 454, 363, 243, 101]
          }
        ]
      });
    },
    /* 绘制企业饼状图 */
    toDrawBusiness() {
      let chart = Highcharts.chart(
        "indexBusiness",
        {
          colors: ["#0A7BCB", "#0899FD", "#4CB8FE", "#8ED1FE"],
          credits: {
            enabled: false
          },
          chart: {
            type: "pie",
            spacing: [0, 0, 0, 0],
            margin: [0, 0, 0, -70]
          },
          title: {
            floating: true,
            x: -35,
            text: "企业总计<br/>999009",
            style: { color: "#333333", fontSize: "10px" }
          },
          tooltip: {
            pointFormat: "{series.name}占比:<b>{point.y}%</b>"
          },
          legend: {
            align: "right",
            verticalAlign: "middle",
            floating: true,
            layout: "vertical"
          },
          plotOptions: {
            pie: {
              innerSize: 100,
              depth: 25,
              dataLabels: {
                enabled: true,
                distance: -15,
                format: "<b>{point.y}%</b>",
                style: {
                  color: "white",
                  fontSize: "12px"
                }
              },
              showInLegend: true,
              allowPointSelect: true,
              cursor: "pointer"
            }
          },
          series: [
            {
              type: "pie",
              innerSize: "50%",
              name: "企业数量",
              /* 百分比 */
              data: [["高级企业", 30], ["普通企业", 30], ["新手上路", 40]]
            }
          ]
        },
        function(c) {
          // 图表初始化完毕后的会掉函数
          // 环形图圆心
          let centerY = c.series[0].center[1],
            titleHeight = parseInt(c.title.styles.fontSize);
          // 动态设置标题位置
          c.setTitle({
            y: centerY + titleHeight / 2 - 6
          });
        }
      );
    },
    /* 绘制用户饼状图 */
    toDrawBrush() {
      let chart = Highcharts.chart(
        "indexBrush",
        {
          colors: ["#0A7BCB", "#0899FD", "#4CB8FE", "#8ED1FE"],
          credits: {
            enabled: false
          },
          chart: {
            type: "pie",
            spacing: [0, 0, 0, 0],
            margin: [0, 0, 0, -70]
          },
          title: {
            floating: true,
            x: -35,
            text: "用户总计<br/>999009",
            style: { color: "#333333", fontSize: "10px" }
          },
          tooltip: {
            pointFormat: "{series.name}占比:<b>{point.y}%</b>"
          },
          legend: {
            align: "right",
            verticalAlign: "middle",
            /* floating: true, */
            itemStyle: {
              color: "#333333",
              cursor: "pointer",
              fontSize: "12px",
              weight: "100px"
            },
            layout: "vertical"
          },
          plotOptions: {
            pie: {
              innerSize: 100,
              depth: 25,
              dataLabels: {
                enabled: true,
                distance: -15,
                format: "<b>{point.y}%</b>",
                style: {
                  color: "white",
                  fontSize: "12px"
                }
              },
              showInLegend: true,
              allowPointSelect: true,
              cursor: "pointer"
            }
          },
          series: [
            {
              type: "pie",
              innerSize: "50%",
              name: "用户数量",
              /* 百分比 */
              data: [["高级用户", 40], ["普通用户", 50], ["新手上路", 10]]
            }
          ]
        },
        function(c) {
          // 环形图圆心
          let centerY = c.series[0].center[1],
            titleHeight = parseInt(c.title.styles.fontSize);
          // 动态设置标题位置
          c.setTitle({
            y: centerY + titleHeight / 2 - 6
          });
        }
      );
    }
  }
};
</script>
<style>
/* 设置表格的头部背景 */
#index .el-table__header thead tr th {
  background: none;
}
</style>
<style lang="scss" scoped>
#index {
  font-size: 14px;
  /* 设置外边距 */
  .index-num {
    margin: 5px 0 15px 0;
    /* 设置4块div统一的样式 */
    .index-num-one,
    .index-num-two,
    .index-num-three,
    .index-num-four {
      color: white;
      background: rgb(39, 169, 227);
      border-radius: 5px;
      padding: 20px 30px;
      & > div {
        margin-bottom: 10px;
      }
      & > div:last-child {
        margin-bottom: 0px;
      }
    }
    .index-num-two {
      background: rgb(40, 183, 121);
    }
    .index-num-three {
      background: rgb(255, 183, 72);
    }
    .index-num-four {
      background: rgb(34, 85, 164);
    }
    .index-curve-option {
      margin-bottom: 5px;
    }
  }
  .index-news {
    margin-top: 20px;
    .news,
    .posts,
    .servers {
      padding: 5px;
    }
    .news {
      border-top: 2px solid rgb(34, 85, 164);
    }
    .posts {
      border-top: 2px solid rgb(40, 183, 121);
    }
    .servers {
      border-top: 2px solid #f56c6c;
    }
    .index-title {
      overflow: hidden;
      & > div:first-child {
        float: left;
      }
      & > div:last-child {
        float: right;
        margin-right: 10px;
        font-size: 12px;
      }
    }
  }
}
</style>
