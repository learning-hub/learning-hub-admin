<template>
<!-- 登陆页面 -->
  <div class="login">
    <!-- 登陆区域 -->
    <div class="loginBox">
      <!-- 头像区域 -->
        <div class="imgBox">
          <img alt="Vue logo" src="../assets/logo.png">
        </div>
        <!-- 表单区域  -->
        <el-form :model="userDate" :rules="userDateRules" ref="userdataFrom" class="userform">
          <el-form-item prop="username">
            <el-input v-model="userDate.username" placeholder="请输入用户名" prefix-icon="el-icon-s-custom"></el-input>
          </el-form-item>
          <el-form-item  prop="password" >
            <el-input v-model="userDate.password" show-password placeholder="请输入密码" prefix-icon="el-icon-lock"></el-input>
          </el-form-item>
          <el-form-item  prop="verification">
            <div style="display:flex">
               <el-image
            style="width: 100px; height: 40px;margin-right:10px"
            :src="src"
            fit="cover" @click="getUUid">
            </el-image>
            <el-input v-model="userDate.verification" placeholder="请输入验证码"></el-input>
            </div>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="primary" @click="surelanding()">确定</el-button>
            <el-button type="info" @click="cleara()">重置</el-button>
          </el-form-item>
        </el-form>
    </div>
  </div>
</template>
<script>
import { v4 as uuidv4 } from 'uuid'
import { login } from '_Api/login.js'
export default {
  name: 'login',
  data () {
    return {
      // 表单数据
      userDate: {
        username: '',
        password: '',
        verification: ''
      },
      // 表单验证规则
      userDateRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 6, message: '用户名称在 3 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '密码在 6 到 15 个字符', trigger: 'blur' }
        ],
        verification: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      // 图片路径
      uuid: '',
      src: ''
    }
  },
  created () {
    this.getUUid()
  },
  methods: {
    surelanding () {
      this.$refs.userdataFrom.validate(async vaild => {
        if (!vaild) return this.$message.error('请您正确输入信息')
        const result = await login(window.sessionStorage.getItem('uuid'), this.userDate)
        if (result.errcode !== 0) {
          this.getUUid()
          return this.$message.error(result.errmsg)
        }
        window.sessionStorage.setItem('token', result.token)
        this.$router.push('/home')
      })
    },
    // 拿uuid获取验证码
    async getUUid () {
      const uuid = uuidv4()
      this.uuid = uuid
      this.src = `/auth/api/v1/getVerification?uuid=${uuid}`
      window.sessionStorage.setItem('uuid', uuid)
    },
    // 重置
    cleara () {
      this.$refs.userdataFrom.resetFields()
    }
  }
}
</script>
<style lang="less" scoped>
.el-form-item__content{
  display: flex;
}
.login{
  height: 100%;
  background: #1caf8d;
}
.loginBox{
  width: 450px;
  height: 344px;
  position: absolute;
  border-radius: 3px;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  background: #fff;
  .imgBox{
    width: 130px;
    height: 130px;
    padding: 10px ;
    border: 1px solid #eee;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    box-shadow: 0 0 10px #ddd;
    transform: translate(-50%,-50%);
    background: #fff;
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: #eeeeee;
    }
  }
  .userform{
    position: absolute;
    width: 100%;
    bottom: 0;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .btns{
    display: flex;
    justify-content: flex-end;
  }
}
</style>
