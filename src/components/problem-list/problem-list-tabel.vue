<template>
  <div>
    <el-col :span="9">
               <el-input placeholder="请输入内容" v-model="inputvalue" class="inputmargin" clearable @clear="clearmessage()">
                 <el-select v-model="field" slot="prepend">
                    <el-option label="Id" value="id"></el-option>
                    <el-option label="姓名" value="title"></el-option>
                    <el-option label="类型" value="type"></el-option>
                  </el-select>
                <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
                </el-input>
            </el-col>
            <el-col :span="7"><el-button type="primary" @click="addProblemList" > 添加题库</el-button></el-col>
    <el-table :data="problemList" style="width: 100%" border>
      <el-table-column prop="id" label="题号" width="100"> </el-table-column>
      <el-table-column prop="title" label="名字"> </el-table-column>
      <el-table-column prop="ac_num" label="正确数" width="100"> </el-table-column>
      <el-table-column prop="submit_num" label="提交数" width="100"> </el-table-column>
      <el-table-column prop="hard" label="难度" width="100"> </el-table-column>
         <el-table-column prop="is_disabled" label="是否禁用" width="100">
          <template v-slot="scope">
               <el-tag v-if="scope.row.is_disabled" type="danger">是</el-tag>
              <el-tag v-else type="success"> 否</el-tag>
          </template>
      </el-table-column>
      <el-table-column prop="type" label="类型" width="100"> </el-table-column>
            <el-table-column prop="tags" label="标签">
          <template v-slot="scope">
              <el-tag>{{scope.row.tags[0]}}</el-tag>
              <el-tag>{{scope.row.tags[1]}}</el-tag>
          </template>
      </el-table-column>
      <el-table-column prop="created_at" label="创建时间" width="180">
          <template v-slot="scope">
              {{scope.row.created_at | dataFormat}}
          </template>
      </el-table-column>
    <el-table-column prop="source" label="来源"></el-table-column>
      <el-table-column label="操作" width="150">
          <template v-slot="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="problemListEdit(scope.row.id)"></el-button>
          <el-button type="danger" icon="el-icon-delete"  size="mini" @click="problemListDelete(scope.row.id)"></el-button>
          </template>
      </el-table-column>
    </el-table>
        <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[5, 10, 20, 30]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <editProblemListDialong :probelmListVisible.sync="probelmListVisible" :probelmId.sync="probelmId" :getproblem="getproblem"></editProblemListDialong>
  </div>
</template>

<script>
import editProblemListDialong from '_Component/problem-list/edit-problem-list-dialong'
import { getProblemList } from '_Api/problem/getProblemList'
import { deleteProblem } from '_Api/problem/deleteProblem'
export default {
  components: {
    editProblemListDialong
  },
  data () {
    return {
      // 页码
      pagenum: 1,
      // 每页显示条数
      pagesize: 5,
      // 总条数
      total: 0,
      // 题目列表
      problemList: [
      ],
      // 题目类型
      type: '',
      // 题目id
      probelmId: null,
      // 是否打开编辑对话框
      probelmListVisible: false,
      // 按什么搜索
      field: 'title',
      // 输入框的值
      inputvalue: ''
    }
  },
  created () {
    this.getproblem()
  },
  methods: {
    // 搜索
    async search () {
      if (this.inputvalue === '') {
        this.getproblem()
        return 0
      }
      const result = await getProblemList({
        params: {
          pageNum: this.num,
          pageSize: this.size,
          filter: this.field + '@like:' + this.inputvalue
        }
      })
      if (result.errcode !== 0) return this.$message.error(result.errmsg)
      this.problemList = result.data
      this.total = result.page.count
    },
    // 添加题
    addProblemList () {
      this.$router.push('/problemlist/addproblemlist')
    },
    clearmessage () {
      this.getproblem()
    },
    // 获取题库
    async getproblem () {
      const result = await getProblemList({
        params: {
          pageNum: this.pagenum,
          pageSize: this.pagesize
        }
      })
      if (result.errcode !== 0) return this.$messagea.error(result.errmsg)
      this.problemList = result.data
      this.total = result.page.count
    },
    // 修改题库
    problemListEdit (id) {
      this.probelmId = id
      this.probelmListVisible = true
    },
    // 页面总条数改变事件
    handleSizeChange (newsize) {
      this.pagesize = newsize
      this.getproblem()
    },
    // 页码改变事件
    handleCurrentChange (newpage) {
      this.pagenum = newpage
      this.getproblem()
    },
    // 删除
    problemListDelete (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const result = await deleteProblem(id)
        if (result.errcode !== 0) return this.$message.error(result.errmsg)
        this.$message.success('删除题库成功')
        this.pagenum = 1
        this.getproblem()
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-col{
    margin:20px 0;
}
.el-tag{
    margin-right: 10px;
}
.el-button{
  margin-left: 20px;
}
.el-select{
  width: 130px;
}
.el-tag{
    margin-left: 10px;
}
.input-new-tag{
    margin-left: 10px;
    width: 98%;
}
.button-new-tag{
    margin-left: 10px;
}
</style>
