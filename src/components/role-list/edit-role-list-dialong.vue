<template>
    <el-dialog
        title="编辑角色"
        :visible="editRoleVisible"
        @update:visible="$emit('update:editRoleVisible',!editRoleVisible)"
        width="50%">
        <el-form :model="editroleList" :rules="editroleListRules" ref="editroleListForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="名称" prop="name">
                <el-input v-model="editroleList.name"></el-input>
            </el-form-item>
            <el-form-item label="介绍" prop="info">
                <el-input v-model="editroleList.info"></el-input>
            </el-form-item>
            <!-- <el-form-item label="角色列表" prop="parent_id">
                 <el-select v-model="editroleList.parent_id" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                </el-select>
            </el-form-item> -->
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="$emit('update:editRoleVisible',false)">取 消</el-button>
            <el-button type="primary" @click="editroleListSure()">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { getRole } from '_Api/roles/getRole'
// import { getRolesList } from '_Api/roles/getRolesList'
import { editRole } from '_Api/roles/editRole'
export default {
  props: [
    'editRoleVisible',
    'roleId',
    'getRoleslist'
  ],
  data () {
    return {
      // 下拉选择数据
      // options: [
      // ],
      //   表单数据
      editroleList: {
        name: '',
        info: '',
        parent_id: null
      },
      editroleListRules: {
        name: [
          { required: true, message: '请输入名字', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        info: [
          { required: true, message: '请输入介绍', trigger: 'blur' }
        ],
        parent_id: [
          { required: true, message: '请选择等级', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    roleId: async function (v) {
      if (!v) {
        return
      }
      const result = await getRole(this.roleId)
      if (result.errcode !== 0) return this.$message.error(result.errmsg)
      this.editroleList = result.data.role
      // this.editroleList.parent_id = null
      // const result1 = await getRolesList()
      // if (result1.errcode !== 0) return this.$message.error(result1.errmsg)
      // this.options = result1.data.roles
    }
  },
  methods: {
    //   点击确定按钮
    editroleListSure () {
      this.$refs.editroleListForm.validate(async valid => {
        if (!valid) return this.$message.error('请输入合理的信息')
        const result = await editRole(this.roleId, this.editroleList)
        if (result.errcode !== 0) return this.$message.error(result.errmsg)
        this.$message.success('修改角色成功')
        this.getRoleslist()
        this.$emit('update:editRoleVisible', false)
      })
    },
    editroleListClose () {
      this.$refs.editroleListForm.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
