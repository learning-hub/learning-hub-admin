<template>
<!-- 添加用户 -->
    <el-dialog
        title="添加用户"
        :visible="adduserVisible"
        @updata:visible="$emit('update:adduserVisible', !adduserVisible)"
        width="50%"
        @close="adduserClose"
        >
        <el-form :model="addUser" :rules="adduserRules" ref="adduserForm" label-width="80px" class="demo-ruleForm" >
                <el-form-item label="用户名:" prop="username">
                    <el-input v-model="addUser.username" ></el-input>
                </el-form-item>
                 <el-form-item label="姓名:" prop="realname">
                    <el-input v-model="addUser.realname"  width="150"></el-input>
                </el-form-item>
                <el-form-item label="昵称:" prop="nick">
                    <el-input v-model="addUser.nick"></el-input>
                </el-form-item>
                <el-form-item label="密码:" prop="password">
                    <el-input v-model="addUser.password"  show-password></el-input>
                </el-form-item>
                 <el-form-item label="性别:" prop="sex">
                    <el-radio-group v-model="addUser.sex" size="medium">
                         <el-radio-button label="男"></el-radio-button>
                         <el-radio-button label="女"></el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="角色" prop="role_id">
                    <el-select v-model="addUser.role_id" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="邮箱:" prop="email">
                    <el-input v-model="addUser.email"></el-input>
                </el-form-item>
                <el-form-item label="头像:" prop="avatar">
                      <div class="block">
                        <div class="circle" v-for="(fit) in Imagelist" :key="fit.id">
                              <el-image
                                :class="fit.isdot?'imagelist1':'imagelist'"
                                :src="fit.src"
                                fit="cover"
                                @click="isdot(fit.id)"
                              >
                              </el-image>
                        </div>
                      </div>
                </el-form-item>
                <el-form-item label="个性签名:" prop="note">
                    <el-input type="textarea" v-model="addUser.note" maxlength="50" show-word-limit></el-input>
                </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="$emit('update:adduserVisible', false),Imagelist.forEach(item => {
        item.isdot = false
      })">取 消</el-button>
            <el-button type="primary" @click="adduserSure()">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { getRolesList } from '_Api/roles/getRolesList.js'
import { addUser } from '_Api/user/addUser.js'
export default {
  props: [
    'adduserVisible',
    'obtainUserList'
  ],
  data () {
    var checkemail = (rule, value, callback) => {
      // 验证邮箱的正则
      const regEmail = /^([a-zA-Z0-9])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        return callback()
      }
      callback(new Error('请输入合法的邮箱'))
    }
    return {
      // 选择框数据
      options: [
      ],
      // 表单用户数据
      addUser: {
        nick: '',
        realname: '',
        sex: '',
        email: '',
        avatar: '',
        note: '',
        username: '',
        password: '',
        role_id: null
      },
      // 图片链接
      avatar: '',
      // 图片列表
      Imagelist: [
        {
          id: 0,
          src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          isdot: false
        },
        {
          id: 1,
          src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          isdot: false
        },
        {
          id: 2,
          src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          isdot: false
        },
        {
          id: 3,
          src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          isdot: false
        },
        {
          id: 4,
          src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          isdot: false
        },
        {
          id: 5,
          src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          isdot: false
        },
        {
          id: 6,
          src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          isdot: false
        },
        {
          id: 7,
          src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          isdot: false
        },
        {
          id: 8,
          src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          isdot: false
        },
        {
          id: 9,
          src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          isdot: false
        },
        {
          id: 10,
          src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          isdot: false
        },
        {
          id: 11,
          src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          isdot: false
        },
        {
          id: 12,
          src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          isdot: false
        },
        {
          id: 13,
          src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          isdot: false
        },
        {
          id: 14,
          src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          isdot: false
        },
        {
          id: 15,
          src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          isdot: false
        },
        {
          id: 16,
          src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          isdot: false
        },
        {
          id: 17,
          src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          isdot: false
        },
        {
          id: 18,
          src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          isdot: false
        },
        {
          id: 19,
          src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          isdot: false
        }
      ],
      // 表单验证规则
      adduserRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur' }
        ],
        role_id: [
          { required: true, message: '请选择角色', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        realname: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
        ],
        nick: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 2, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', tirgger: 'blur' },
          { validator: checkemail, tirgger: 'blur' }
        ],
        avatar: [
          { required: true, message: '请选择头像', tirgger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.obtainRolesList()
  },
  methods: {
    // 获取角色列表
    async obtainRolesList () {
      const result = await getRolesList()
      if (result.errcode !== 0) return this.$message.error(result.errmsg)
      this.options = result.data.roles
    },
    //  关闭对话框事件
    adduserClose () {
      this.Imagelist.forEach(item => {
        item.isdot = false
      })
      this.$refs.adduserForm.resetFields()
      this.$emit('update:adduserVisible', false)
    },
    // 确定按钮
    adduserSure () {
      this.$refs.adduserForm.validate(async valid => {
        if (!valid) return this.$message.error('请输入合理信息')
        const result = await addUser(this.addUser)
        if (result.errcode !== 0) return this.$message.error(result.errmsg)
        this.Imagelist.forEach(item => {
          item.isdot = false
        })
        this.$message.success('添加用户成功')
        this.obtainUserList()
        this.$emit('update:adduserVisible', false)
      })
    },
    // 判断小圆点是否显示
    isdot (id) {
      this.Imagelist.forEach(item => {
        item.isdot = false
      })
      this.Imagelist[id].isdot = true
      this.addUser.avatar = this.Imagelist[id].src
    }
  }
}
</script>

<style lang="less" scoped>

</style>
