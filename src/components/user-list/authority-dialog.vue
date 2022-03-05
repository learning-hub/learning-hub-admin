<template>
<!-- 分配权限对话框 -->
    <el-dialog
        title="分配权限"
        :visible.sync="edituser.authoritydialogVisible"
        width="50%" @close="authorityuserClose">
         <div style="margin-bottom:20px">姓名：{{realname}}</div>
         <el-select v-model="role_id" placeholder="请选择">
            <el-option
            v-for="item in authorityUser"
            :key="item.value"
            :label="item.name"
            :value="item.id">
            </el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">
            <el-button @click="edituser.authoritydialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="authorityuserSuer()">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { getRolesList } from '_Api/roles/getRolesList.js'
import { distributionUserRoles } from '_Api/roles/distributionUserRoles.js'
export default {
  props: [
    'edituser',
    'realname',
    'id',
    'obtainUserList'
  ],
  data () {
    return {
      // 角色列表
      authorityUser: [
      ],
      // 选中角色的下标
      role_id: null
    }
  },
  watch: {
    id: async function () {
      const result = await getRolesList()
      if (result.errcode !== 0) return this.$message.error(result.errmsg)
      this.authorityUser = result.data.roles
    }
  },
  methods: {
    // 点击确定按钮
    async authorityuserSuer () {
      if (this.role_id) {
        const result = await distributionUserRoles(this.id, this.role_id)
        if (result.errcode !== 0) return this.$message.error(result.errmsg)
        this.$message.success('分配权限成功')
        this.obtainUserList()
        this.edituser.authoritydialogVisible = false
      } else {
        return this.$message.error('请选择角色')
      }
    },
    // 对话框关闭事件
    authorityuserClose () {
      this.roleId = null
    }
  }
}
</script>
