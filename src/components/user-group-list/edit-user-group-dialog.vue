<template>
    <el-dialog
        title="编辑用户组信息"
        :visible="editUserGroupVisible"
        @update:visible="$emit('update:editUserGroupVisible',!editUserGroupVisible)"
        width="50%"
        @close="editUserGroupClose"
        >
        <el-form :model="editUserGroup" :rules="editUserGroupRules"  label-width="100px" ref="editUserGroupFrom">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="editUserGroup.name"></el-input>
            </el-form-item>
            <el-form-item label="介绍" prop="info">
                <el-input v-model="editUserGroup.info"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="$emit('update:editUserGroupVisible', false)">取 消</el-button>
            <el-button type="primary" @click="editUserGroupSure">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { editUserGroup } from '_Api/userGroup/editUserGroup.js'
import { getGroup } from '_Api/userGroup/getGroup.js'
export default {
  props: [
    'groupId',
    'editUserGroupVisible',
    'getGroupList'
  ],
  data () {
    return {
    // 用户组信息
      editUserGroup: {
      },
      // 设置用户组规则
      editUserGroupRules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        info: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    groupId: async function (v) {
      if (!v) {
        return
      }
      const result = await getGroup(this.groupId)
      if (result.errcode !== 0) return this.$message.error(result.errmsg)
      this.editUserGroup = result.data.group
    }
  },
  methods: {
    // 点击确定按钮
    editUserGroupSure () {
      this.$refs.editUserGroupFrom.validate(async (valid) => {
        if (!valid) return this.$message.error('请输入正确的信息')
        const result = await editUserGroup(this.groupId, this.editUserGroup)
        if (result.errcode !== 0) return this.$message.error(result.errmsg)
        this.getGroupList()
        this.$emit('update:editUserGroupVisible', false)
      })
    },
    editUserGroupClose () {
      this.$refs.editUserGroupFrom.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>

</style>
