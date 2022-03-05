<template>
    <div>
       <!-- 搜索框 -->
          <el-col :span="9">
                <el-input placeholder="请输入内容" v-model="inputvalue" class="inputmargin"  clearable @clear="clearmessage()">
                 <el-select v-model="field" slot="prepend" placeholder="请选择">
                    <el-option label="Id" value="id"></el-option>
                    <el-option label="昵称" value="name"></el-option>
                    <el-option label="介绍" value="info"></el-option>
                  </el-select>
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
            </el-col>
            <el-col :span="7"><el-button type="primary" @click="addUsersGroup()">添加用户组</el-button></el-col>
        <el-col v-loading="isloading" element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
          <ZkTable v-if="groups.length"  :tree-type="true" :data="groups" :columns="Configuration"
        stripe
        border
        :selection-type="false"
          :expand-type="false"
          show-index
         index-text="#"
         :is-fold ="false"
          @tree-icon-click="folding"
        >
            <template slot="createdTime"  slot-scope="scope">
                {{scope.row.created_at | dataFormat}}
            </template>
            <template slot="isDisabled" slot-scope="scope">
                <el-tag type="success" v-if="scope.row.is_disabled">是</el-tag>
                <el-tag type="danger" v-else>否</el-tag>
            </template>
            <template slot="operating" slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" v-if="scope.row._level===1" @click="userGroupEdit(scope.row.id)"></el-button>
                <el-button type="success" icon="el-icon-plus" size="mini"  v-if="scope.row._level===1" @click="userGroupAdd(scope.row.id)"></el-button>
                <el-tooltip content="更新用户组成员" placement="top">
                  <el-button type="warning" icon="el-icon-refresh-right" size="mini"  v-if="scope.row._level===1" @click="referGroup(scope.row.id)"></el-button>
                  </el-tooltip>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="delectUsers(scope.row)"></el-button>
            </template>
        </ZkTable>
        <!-- 分页 -->
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageNum"
              :page-sizes="[5, 10, 20, 30]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
          </el-pagination>
        </el-col>
        <editUserGroupDialog :groupId="groupId" :editUserGroupVisible.sync="editUserGroupVisible" :getGroupList="getGroupList"></editUserGroupDialog>
        <addUserDialong :addUserVisible.sync="addUserVisible" :groupId="groupId" :getGroupList="getGroupList"></addUserDialong>
        <addUsersGroupDialog :addUsersGroupVisible.sync="addUsersGroupVisible" :getGroupList="getGroupList"></addUsersGroupDialog>
    </div>
</template>

<script>
import addUsersGroupDialog from '_Component/user-group-list/add-users-group-dialog'
import editUserGroupDialog from '_Component/user-group-list/edit-user-group-dialog.vue'
import addUserDialong from '_Component/user-group-list/add-user-dialong.vue'
import { getUserGroupList } from '_Api/userGroup/getUserGroupList.js'
import { deleteUserGroup } from '_Api/userGroup/deleteUserGroup.js'
import { delectUserToGroup } from '_Api/userGroup/delectUserToGroup.js'
import { getGroupUser } from '_Api/userGroup/getGroupUser.js'
import { singleUser } from '_Api/user/singleUser.js'
export default {
  components: {
    editUserGroupDialog,
    addUserDialong,
    addUsersGroupDialog
  },
  data () {
    return {
      // 加载
      isloading: true,
      // 添加用户对话框是否显示
      addUsersGroupVisible: false,
      // 搜索框
      inputvalue: '',
      // 按什么搜索
      field: 'name',
      // 每页的页数
      pageSize: 5,
      // 每页的页码
      pageNum: 1,
      // 总条数
      total: 0,
      // 用户组数据
      groups: [
      ],
      //   表单配置对象
      Configuration: [
        {
          label: '名称',
          prop: 'name',
          width: '180px'
        },
        {
          label: '介绍',
          prop: 'info'
        },
        {
          label: '正确数',
          prop: 'ac_count',
          width: '80px'
        },
        {
          label: '提交数',
          prop: 'submit_count',
          width: '80px'
        },
        {
          label: '比赛数',
          prop: 'game_count',
          width: '80px'
        },
        {
          label: '是否禁用',
          prop: 'is_disabled',
          type: 'template',
          template: 'isDisabled',
          width: '80px'
        },
        {
          label: '创建时间',
          prop: 'created_at',
          // 添加定义模板
          type: 'template',
          // 定义模板名称
          template: 'createdTime'
        },
        {
          label: '操作',
          type: 'template',
          template: 'operating',
          align: 'left'
        }
      ],
      // 用户id
      groupId: null,
      // 是否开启编辑用户组对话框
      editUserGroupVisible: false,
      // 是否开启添加用户对话框
      addUserVisible: false
    }
  },
  created () {
    this.getGroupList()
  },
  methods: {
    // 搜索
    async search () {
      if (this.inputvalue === '') {
        this.getGroupList()
        return 0
      }
      const result = await getUserGroupList({
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          filter: this.field + '@like:' + this.inputvalue
        }
      })
      if (result.errcode !== 0) return this.$message.error(result.errmsg)
      for (let i = 0; i < result.data.groups.length; i++) {
        const item = result.data.groups[i]
        const result1 = await singleUser(item.create_user_id)
        result1.data.user.name = result1.data.user.realname
        result1.data.user.info = result1.data.user.sex
        result1.data.user.group_id = item.id
        item.children = [result1.data.user]
      }
      this.groups = result.data.groups
      this.total = result.page.count
    },
    // 获取用户组列表
    async getGroupList () {
      const result = await getUserGroupList({
        params: {
          pageSize: this.pageSize,
          pageNum: this.pageNum
        }
      })
      if (result.errcode !== 0) return this.$message.error(result.errmsg)
      for (let i = 0; i < result.data.groups.length; i++) {
        const item = result.data.groups[i]
        const result1 = await singleUser(item.create_user_id)
        result1.data.user.name = result1.data.user.realname
        result1.data.user.info = result1.data.user.sex
        result1.data.user.group_id = item.id
        item.children = [result1.data.user]
      }
      this.groups = result.data.groups
      this.total = result.page.count
      setTimeout(() => {
        this.isloading = false
      }, 20)
    },
    // 清空
    clearmessage () {
      this.getGroupList()
    },
    // 添加用户组按钮
    addUsersGroup () {
      this.addUsersGroupVisible = true
    },
    // 点击加号触发事件
    folding (row, rowIndex, e) {
      console.log({ row, rowIndex, e })
    },
    // 修改用户对话框
    userGroupEdit (id) {
      this.groupId = id
      this.editUserGroupVisible = true
    },
    // 添加用户对话框
    userGroupAdd (id) {
      this.groupId = id
      // console.log(id)
      this.addUserVisible = true
    },
    // 页码每条页数改变时
    handleSizeChange (newSize) {
      this.pageSize = newSize
      this.getGroupList()
    },
    // 页码发生变化时
    handleCurrentChange (newpage) {
      this.pageNum = newpage
      this.getGroupList()
    },
    // 删除用户或用户组
    delectUsers (scope) {
      if (scope._level === 1) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const result = await deleteUserGroup(scope.id)
          if (result.errcode !== 0) return this.$message.error(result.errmsg)
          this.$message.success('删除用户组成功')
          this.pageNum = 1
          this.getGroupList()
        }).catch(() => {
          this.$message.info('已取消删除')
        })
      } else {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const result = await delectUserToGroup({
            group_id: scope.group_id,
            user_id: scope.user_id
          })
          if (result.errcode !== 0) return this.$message.error(result.errmsg)
          this.$message.success('删除用户成功')
          this.pageNum = 1
          this.getGroupList()
        }).catch(() => {
          this.$message.info('已取消删除')
        })
      }
    },
    // 刷新
    async referGroup (scope) {
      console.log(scope)
      const result = await getGroupUser(scope)
      console.log(result)
    }
  }
}
</script>

<style lang="less" scoped>
.el-col{
  margin: 20px 0;
}
.el-pagination{
  margin-bottom: 20px;
}
.el-select{
  width: 130px;
}
.el-button{
  margin-left: 20px;
}
</style>
