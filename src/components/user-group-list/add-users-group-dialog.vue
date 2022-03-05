<template>
    <el-dialog
    title="添加用户组"
    :visible="addUsersGroupVisible"
    @update:visible="$emit('update:addUsersGroupVisible', !addUsersGroupVisible)"
    width="50%"
    @close="addUsersGroupClose"
    >
    <el-form :model="addUserGroup" :rules="addUserGroupRules" ref="addUserGroupFrom" label-width="100px">
        <el-form-item label="名称" prop="name">
            <el-input v-model="addUserGroup.name"></el-input>
        </el-form-item>
        <el-form-item label="介绍" prop="info">
            <el-input v-model="addUserGroup.info"></el-input>
        </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:addUsersGroupVisible', false)">取 消</el-button>
        <el-button type="primary" @click="addUserGroupSure">确 定</el-button>
    </span>
    </el-dialog>
</template>

<script>
import { addUserGroup } from '_Api/userGroup/addUserGroup'
export default {
  props: [
    'addUsersGroupVisible',
    'getGroupList'
  ],
  data () {
    return {
      a: false,
      addUserGroup: {
        name: '',
        info: ''
      },
      addUserGroupRules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        info: [
          { required: true, message: '请输入介绍', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 确定
    addUserGroupSure () {
      this.$refs.addUserGroupFrom.validate(async (valid) => {
        if (!valid) return this.$message.error('请输入正确信息')
        const result = await addUserGroup(this.addUserGroup)
        if (result.errcode !== 0) return this.$message.error(result.errmsg)
        this.$message.success('添加用户组成功')
        this.getGroupList()
        this.$emit('update:addUsersGroupVisible', false)
      })
    },
    addUsersGroupClose () {
      this.$refs.addUserGroupFrom.resetFields()
    }
  }
}
</script>
