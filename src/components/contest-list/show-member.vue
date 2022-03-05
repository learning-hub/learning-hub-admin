<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>比赛管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path:'/contestList'}">比赛列表</el-breadcrumb-item>
      <el-breadcrumb-item>成员列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格 -->
    <el-card>
         <el-alert :title="show" type="warning">
        </el-alert>
        <el-col>
        <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="date" label="日期"> </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column label="操作">
            <template>
            <el-button type="primary" icon="el-icon-plus" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            </template>
        </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="PageNum"
        :page-sizes="[5, 10, 15, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
        </el-pagination>
        </el-col>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 当前所在的哪个团队下的成员
      show: '团队赛',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      // 页面总条数
      pageSize: 5,
      // 哪一页
      PageNum: 1,
      totil: 0
    }
  },
  watch: {
    $route: 'getmember'
  },
  methods: {
    // 获取路由页面传参
    getmember () {
      this.show = this.$route.query.value + this.$router.query.nameId
    },
    // 页面总数改变时
    handleSizeChange (pageSize) {
      this.pageSize = pageSize
    },
    // 哪一页改变时
    handleCurrentChange (PageNum) {
      this.PageNum = PageNum
    }
  }
}
</script>

<style lang="less" scoped>
.el-col{
    margin-top: 20px;
}
</style>
