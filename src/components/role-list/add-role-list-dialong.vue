<template>
    <el-dialog
        title="添加角色"
        :visible="addRoleVisible"
        @update:visible="$emit('update:addRoleVisible',!addRoleVisible)"
        width="50%">
        <el-form :model="addroleList" :rules="editroleListRules" ref="addroleListForm" label-width="100px" >
            <el-form-item label="名称" prop="name">
                <el-input v-model="addroleList.name"></el-input>
            </el-form-item>
            <el-form-item label="介绍" prop="info">
                <el-input v-model="addroleList.info"></el-input>
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
            <el-button @click="$emit('update:addRoleVisible',false)">取 消</el-button>
            <el-button type="primary" @click="editroleListSure()">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { addRole } from '_Api/roles/addRole'
export default {
  props: [
    'addRoleVisible',
    'getRoleslist'
  ],
  data () {
    return {
      // 下拉选择数据
      // options: [
      // ],
      //   表单数据
      addroleList: {
        name: '',
        info: '',
        parent_id: 0
      },
      editroleListRules: {
        name: [
          { required: true, message: '请输入名字', trigger: 'blur' },
          { min: 2, max: 12, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        info: [
          { required: true, message: '请输入介绍', trigger: 'blur' }
        ]
        // parent_id: [
        //   { required: true, message: '请选择等级', trigger: 'blur' }
        // ]
      }
    }
  },
  methods: {
    //   点击确定按钮
    editroleListSure () {
      this.$refs.addroleListForm.validate(async valid => {
        if (!valid) return this.$message.error('请输入合理的信息')
        console.log(this.addroleList.parent_id)
        const result = await addRole(this.addroleList)
        if (result.errcode !== 0) return this.$message.error(result.errmsg)
        this.$message.success('添加角色成功')
        this.getRoleslist()
        this.$emit('update:addRoleVisible', false)
      })
    },
    editroleListClose () {
      this.$refs.addroleListForm.resetFields()
    }
  }
}
</script>
