<template>
    <el-dialog
        title="添加用户组成员"
        :visible="addUserVisible"
        @update:visible="$emit('update:addUserVisible',!addUserVisible)"
        width="50%"
        >
        <span>添加用户:  </span>
            <el-cascader
                v-model="user_id"
                :options="userlist"
                :props="props"
                clearable
                >
            </el-cascader>
        <span slot="footer" class="dialog-footer">
            <el-button @click="$emit('update:addUserVisible', false)">取 消</el-button>
            <el-button type="primary" @click="addUserSure">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { getUserList } from '_Api/user/getUserList.js'
import { addUserToGroup } from '_Api/userGroup/addUserToGroup.js'
export default {
  props: [
    'addUserVisible',
    'groupId',
    'getGroupList'
  ],
  data () {
    return {
      // 添加用户表单信息
      user_id: [],
      // 显示用户列表
      userlist: [
      ],
      // 级联选择器的配置
      props: {
        label: 'realname',
        value: 'id',
        multiple: true
      }
    }
  },
  watch: {
    groupId: async function (v) {
      if (!v) {
        return
      }
      const result = await getUserList()
      if (result.errcode !== 0) return this.$message.error(result.errmsg)
      // console.log(result)
      this.userlist = result.data.users
    }

  },
  methods: {
    // 确定按钮
    addUserSure () {
      if (this.user_id.length === 0) return this.$message.error('请选择添加用户')
      this.user_id.forEach(async item => {
        item = item.join()
        const result = await addUserToGroup(
          {
            group_id: this.groupId,
            user_id: item
          }
        )
        if (result.errcode !== 0) this.$message.error(result.errmsg)
        else this.$message.success('添加用户成功')
        this.user_id = []
        this.getGroupList()
      })
      this.$emit('update:addUserVisible', false)
    }
  }
}
</script>
