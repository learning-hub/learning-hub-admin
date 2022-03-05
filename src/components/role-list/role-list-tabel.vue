<template>
  <div>
     <el-col :span="9">
                <el-input placeholder="请输入内容" v-model="inputvalue" class="inputmargin" clearable @clear="clearmessage()">
                 <el-select v-model="field" slot="prepend" placeholder="请选择">
                    <el-option label="Id" value="id"></el-option>
                    <el-option label="名字" value="name"></el-option>
                    <el-option label="等级" value="parent_id"></el-option>
                  </el-select>
                <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
                </el-input>
            </el-col>
    <el-col :span="7"><el-button type="primary" @click="addRoleList">添加角色</el-button></el-col>
    <el-table :data="roleList" style="width: 100%" border stripe>
      <el-table-column type="expand">
        <el-tag
          :key="tag"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)">
          {{tag}}
          </el-tag>
        <el-input
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
      </el-table-column>
      <el-table-column type="index" label="#" width="50"> </el-table-column>
      <el-table-column prop="name" label="名字" width="180"> </el-table-column>
      <el-table-column prop="info" label="等级" width="180">
          <template v-slot="scope">
              <el-tag v-if="scope.row.parent_id===0">一级</el-tag>
                <el-tag type="success" v-else-if="scope.row.parent_id===1">二级</el-tag>
                <el-tag type="warning" v-else>三级</el-tag>
          </template>
      </el-table-column>
      <el-table-column prop="created_at" label="创建时间">
          <template v-slot="scope">
              {{scope.row.created_at | dataFormat}}
          </template>
      </el-table-column>
      <el-table-column prop="is_disabled" label="是否禁用" width="180">
          <template v-slot="scope">
              <el-tag type="warning" v-if="scope.row.is_disabled">是</el-tag>
              <el-tag type="success" v-else>否</el-tag>
          </template>
      </el-table-column>
      <el-table-column label="介绍" prop="info">
      </el-table-column>
      <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editRoleList(scope.row.id)"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteRoleList(scope.row.id)"></el-button>
          </template>
      </el-table-column>
    </el-table>
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
    <!-- 对话框 -->
    <editRoleListDialong :roleId="roleId" :editRoleVisible.sync ="editRoleVisible" :getRoleslist="getRoleslist"></editRoleListDialong>
    <addRoleListDialong  :addRoleVisible.sync ="addRoleVisible" :getRoleslist="getRoleslist"></addRoleListDialong>
  </div>
</template>

<script>
import editRoleListDialong from '_Component/role-list/edit-role-list-dialong.vue'
import addRoleListDialong from '_Component/role-list/add-role-list-dialong.vue'
import { getRolesList } from '_Api/roles/getRolesList.js'
import { delectRole } from '_Api/roles/delectRole.js'
export default {
  components: {
    editRoleListDialong,
    addRoleListDialong
  },
  data () {
    return {
      dynamicTags: ['标签一', '标签二', '标签三'],
      // 输入框是否显示
      inputVisible: false,
      // tags标签的输入框
      inputValue: '',
      // 每页多少条
      pageSize: 5,
      // 哪一页
      pageNum: 1,
      // 总条数
      total: null,
      // 按什么搜索
      field: 'name',
      // 输入框的值
      inputvalue: '',
      // 角色列表
      roleList: [
      ],
      // 用户id
      roleId: null,
      // 是否编辑角色的对话框是否开启
      editRoleVisible: false,
      addRoleVisible: false
    }
  },
  created () {
    this.getRoleslist()
  },
  methods: {
    // 搜索
    async search () {
      if (this.inputvalue === '') {
        this.getRoleslist()
        return 0
      }
      const result = await getRolesList({
        params: {
          pageNum: this.num,
          pageSize: this.size,
          filter: this.field + '@like:' + this.inputvalue
        }
      })
      if (result.errcode !== 0) return this.$message.error(result.errmsg)
      this.roleList = result.data.roles
      this.total = result.page.count
    },
    // 清除
    clearmessage () {
      this.getRoleslist()
    },
    // 关闭tag标签
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    // 是否显示输入框
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 关闭输入框
    handleInputConfirm () {
      const inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    // 获取角色列表
    async getRoleslist () {
      const result = await getRolesList({
        params: {
          pageSize: this.pageSize,
          pageNum: this.pageNum
        }
      })
      if (result.errcode !== 0) return this.$message.error(result.errmsg)
      // console.log(result)
      result.data.roles.forEach(item => {
        // console.log(item.id)
      })
      this.roleList = result.data.roles
    },
    // 改变页码
    handleSizeChange (newSize) {
      this.pageSize = newSize
    },
    handleCurrentChange (newNum) {
      this.pageNum = newNum
    },
    // 添加角色
    addRoleList () {
      this.addRoleVisible = true
    },
    // 编辑
    editRoleList (id) {
      this.roleId = id
      this.editRoleVisible = true
    },
    // 删除
    deleteRoleList (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const result = await delectRole(id)
        if (result.errcode !== 0) return this.$message.error(result.errmsg)
        this.$message.success('删除角色成功')
        this.pageNum = 1
        this.getRoleslist()
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
.el-button{
  margin-left: 20px;
}
.el-select{
  width: 130px;
}
</style>
