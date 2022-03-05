<template>
  <div>
    <el-col :span="9">
                <el-input placeholder="请输入内容" v-model="inputValue" class="inputmargin" clearable @clear="clearmessage()">
                <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
                </el-input>
            </el-col>
    <el-col :span="7"><el-button type="primary" @click="addContest()">添加比赛</el-button></el-col>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="date" label="日期"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column label="操作">
           <template v-slot="scope">
        <el-tooltip class="item" effect="dark" content="查看当前比赛的成员" placement="top">
          <el-button type="warning" icon="el-icon-view" size="mini" @click="showStudent(scope.row.name)"></el-button>
        </el-tooltip>
          <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 搜索输入框的值
      inputValue: '',
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
  methods: {
    // 清除搜索框的值
    clearmessage () {

    },
    // 搜索点击按钮
    search () {

    },
    // 页面总数改变时
    handleSizeChange (pageSize) {
      this.pageSize = pageSize
    },
    // 哪一页改变时
    handleCurrentChange (PageNum) {
      this.PageNum = PageNum
    },
    // 查看成员
    showStudent (id) {
      console.log(id)
      this.$router.push({
        path: '/contestlist/showmember',
        query: {
          nameId: id,
          value: '团队赛'
        }
      }
      )
    }
  }
}
</script>

<style lang="less" scoped>
.el-col{
    margin:20px 0;
}
.el-select{
  width: 130px;
}
.el-button{
  margin-left: 20px;
}
</style>
