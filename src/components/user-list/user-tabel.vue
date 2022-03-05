<template>
  <div>
    <!-- 添加 -->
    <el-col :span="9">
                <el-input placeholder="请输入内容" v-model="inputvalue" class="inputmargin" clearable @clear="clearmessage()">
                 <el-select v-model="field" slot="prepend">
                    <el-option label="Id" value="id"></el-option>
                    <el-option label="姓名" value="realname"></el-option>
                    <el-option label="用户名" value="username"></el-option>
                  </el-select>
                <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
                </el-input>
            </el-col>
    <el-col :span="7"><el-button type="primary" @click="addUsers()">添加用户</el-button></el-col>
    <!-- 用户列表 -->
    <el-table :data="users" stripe border style="width: 100%">
      <el-table-column type="index" label="#"> </el-table-column>
      <el-table-column prop="username" label="用户名" width="130">
      </el-table-column>
      <el-table-column prop="nick" label="昵称" width="130"> </el-table-column>
      <el-table-column prop="realname" label="姓名" width="80">
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="60"> </el-table-column>
      <el-table-column prop="ac_count" label="正确数" width="80">
      </el-table-column>
      <el-table-column prop="submit_count" label="提交数" width="80">
      </el-table-column>
      <el-table-column prop="exp" label="比赛数" width="100"> </el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="role.name" label="权限" width="100">
      </el-table-column>
      <el-table-column prop="created_at" label="创建时间">
        <template v-slot="scope">
          {{ scope.row.created_at | dataFormat }}
        </template>
      </el-table-column>
      <el-table-column prop="is_disabled" label="是否禁用" width="80">
        <template v-slot="scope">
          <el-tag type="success" v-if="scope.row.is_disabled === 0">否</el-tag>
          <el-tag type="info" v-else>是</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template v-slot="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="edit(scope.row.id)"
          ></el-button>
          <el-tooltip
            class="item"
            effect="dark"
            content="分配权限"
            placement="top"
          >
            <el-button
              type="warning"
              icon="el-icon-thumb"
              size="mini"
              @click="authority(scope.row)"
            ></el-button>
          </el-tooltip>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="delect(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="num"
      :page-sizes="[5, 10, 15, 30]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 对话框 -->
    <adduserDialog :adduserVisible.sync="adduserVisible" :obtainUserList="obtainUserList"></adduserDialog>
    <editDialog :edituser="edituser" :id="id" :obtainUserList="obtainUserList"></editDialog>
    <authorityDialog :edituser="edituser" :id="id" :obtainUserList="obtainUserList" :realname="realname"></authorityDialog>
  </div>
</template>

<script>
import editDialog from './edit-dialog.vue'
import authorityDialog from './authority-dialog'
import { getUserList } from '_Api/user/getUserList.js'
import { delectUser } from '_Api/user/delectUser.js'
import adduserDialog from '_Component/user-list/adduser-dialog'
export default {
  components: {
    editDialog,
    authorityDialog,
    adduserDialog
  },
  data () {
    return {
      // 搜索区域数据
      inputvalue: '',
      // 根据什么来搜索
      field: 'username',
      // 添加用户对话框是否显示
      adduserVisible: false,
      // 用户数据
      users: [
      ],
      // 页码
      num: 1,
      // 每页的条数
      size: 5,
      // 总条数
      total: 0,
      // 总条数
      count: 0,
      // 操作对象
      edituser: {
        // 编辑对话框是否显示
        editdialogVisible: false,
        // 分配权限对话框是否显示
        authoritydialogVisible: false
      },
      id: null,
      realname: ''
    }
  },
  created () {
    this.obtainUserList()
  },
  methods: {
    // 清除重新获取列表
    clearmessage () {
      this.obtainUserList()
    },
    // 搜索
    async search () {
      if (this.inputvalue === '') {
        this.obtainUserList()
        return 0
      }
      const result = await getUserList({
        params: {
          pageNum: this.num,
          pageSize: this.size,
          filter: this.field + '@like:' + this.inputvalue
        }
      })
      if (result.errcode !== 0) return this.$message.error(result.errmsg)
      this.users = result.data.users
    },
    // 添加用户
    addUsers () {
      this.adduserVisible = true
    },
    // 获取用户列表
    async obtainUserList () {
      const result = await getUserList({
        params: {
          pageNum: this.num,
          pageSize: this.size
        }
      })
      // console.log(result)
      if (result.errcode !== 0) return this.$message.error(result.errmsg)
      this.users = result.data.users
      this.total = result.page.count
    },
    //   改变每页页数函数
    handleSizeChange (newsize) {
      this.size = newsize
      this.obtainUserList()
    },
    // 改变页码函数
    handleCurrentChange (newpagesize) {
      this.num = newpagesize
      this.obtainUserList()
    },
    // 点击编辑按钮打开对话框
    async edit (id) {
      this.id = id
      this.edituser.editdialogVisible = true
    },
    // 点击分配权限按钮打开对话框
    authority (row) {
      this.id = row.id
      this.realname = row.realname
      this.edituser.authoritydialogVisible = true
    },
    // 删除按钮
    delect (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const result = await delectUser(id)
        if (result.errcode !== 0) return this.$message.erro(result.errmsg)
        this.num = 1
        this.obtainUserList()
      }).catch(() => {
        this.$message.info()
      })
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
