<template>
        <!-- 编辑用户对话框 -->
        <el-dialog
            title="编辑用户信息"
            :visible.sync="edituser.editdialogVisible"
            width="50%"
            @close="singleuserClose"
            >
            <el-form :model="singleUser" :rules="singleuserRules" ref="singleuserForm" label-width="80px" class="demo-ruleForm" >
                <el-form-item label="用户名:" prop="username">
                    <el-input v-model="singleUser.username" ></el-input>
                </el-form-item>
                 <el-form-item label="姓名:" prop="realname">
                    <el-input v-model="singleUser.realname"  width="150"></el-input>
                </el-form-item>
                <el-form-item label="昵称:" prop="nick">
                    <el-input v-model="singleUser.nick"></el-input>
                </el-form-item>
                 <el-form-item label="性别:" prop="sex">
                    <el-radio-group v-model="singleUser.sex" size="medium">
                         <el-radio-button label="男"></el-radio-button>
                         <el-radio-button label="女"></el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="密码:" prop="password">
                    <el-input v-model="singleUser.password"  show-password></el-input>
                </el-form-item>
                <el-form-item label="邮箱:" prop="email">
                    <el-input v-model="singleUser.email"></el-input>
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
                    <el-input type="textarea" v-model="singleUser.note" maxlength="50" show-word-limit></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="edituser.editdialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="singleUserSure">确 定</el-button>
            </span>
        </el-dialog>
</template>

<script>
import { editUser } from '_Api/user/editUser.js'
import { singleUser } from '_Api/user/singleUser.js'
export default {
  props: [
    'edituser',
    'id',
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
      // 表单用户数据
      singleUser: {
        id: '',
        realname: '',
        sex: '',
        email: '',
        avatar: '',
        note: '',
        username: '',
        password: ''
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
      singleuserRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, message: '长度最少为3', trigger: 'blur' }
        ],
        realname: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
        ],
        nick: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 6 个字符', trigger: 'blur' }
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
  watch: {
    // 用户指定用户信息
    id: async function () {
      // console.log(this.edituser.id)
      const result = await singleUser(this.id)
      if (result.errcode !== 0) return this.$message.error(result.errmsg)
      this.singleUser = result.data.user
    }
  },
  methods: {
    // 关闭对话框事件
    singleuserClose () {
      this.$refs.singleuserForm.resetFields()
      this.Imagelist.forEach(item => {
        item.isdot = false
      })
    },
    // 确定按钮
    singleUserSure () {
      this.$refs.singleuserForm.validate(async (valid) => {
        if (!valid) return this.$message.error('请输入合法信息')
        const result = await editUser(this.singleUser)
        if (result.errcode !== 0) return this.$message.error(result.errmsg)
        this.$message.success('修改用户成功')
        this.obtainUserList()
        this.edituser.editdialogVisible = false
      })
    },
    // 判断小圆点是否显示
    isdot (id) {
      this.Imagelist.forEach(item => {
        item.isdot = false
      })
      this.Imagelist[id].isdot = true
      this.singleUser.avatar = this.Imagelist[id].src
    }
  }
}
</script>
<style lang="less">
.imagelist{
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 10px 5px;
  border: 1px solid #fff;
}
.imagelist1{
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 10px 5px;
  border: 10px solid rgb(189, 187, 187);
  box-shadow: 0 0 10px #ddd;
  box-sizing: border-box;
}
.circle{
  display: inline-block;
}
</style>
