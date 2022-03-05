<template>
<!-- 网页的主页 -->
    <!-- 外层容器 -->
    <el-container class="home-container">
      <!-- 顶部栏 -->
      <el-header width="100%">
          <div>
          <img src="../assets/crown.png" alt>
          <span>learnhub后台管理系统</span>
          </div>
          <el-button type="warning" @click="exit" class="buttona">退出</el-button>
        </el-header>
        <el-container>
        <el-aside :width="boolean ? '64px':'250px'">
           <div class="topButton" @click="Fold">|||</div>
           <el-menu
              :default-active="activepath"
              class="el-menu-vertical-demo"
              router
              :collapse="boolean"
              :collapse-transition="false"
              unique-opened
              background-color="#000"
              text-color="#fff"
              active-text-color="#000">
               <el-submenu :index="item.id" v-for="(item) in menu" :key="item.id">
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span>{{item.name}}</span>
                </template>
                <el-menu-item v-for="(item1) in item.children" :key="item1.id" :index="'/'+item1.path" @click="submenu('/'+item1.path)">
                  <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{item1.name}}</span>
                  </template>
                </el-menu-item>
               </el-submenu>
            </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
        </el-container>
      </el-container>
</template>
<script>
export default {
  data () {
    return {
      // 是否折叠
      boolean: false,
      // 菜单数据
      menu: [
        {
          id: '1',
          name: '用户管理',
          icon: 'el-icon-s-custom',
          children: [
            {
              id: '1-1',
              name: '用户列表',
              path: 'userlist'
            },
            {
              id: '1-2',
              name: '用户组列表',
              path: 'userGroupList'
            }
          ]
        },
        {
          id: '2',
          name: '角色管理',
          icon: 'el-icon-user-solid',
          children: [
            {
              id: '2-1',
              name: '角色列表',
              path: 'rolelist'
            }
          ]
        },
        {
          id: '3',
          name: '题库管理',
          icon: 'el-icon-question',
          children: [
            {
              id: '3-1',
              name: '题库列表',
              path: 'problemlist'
            }
          ]
        },
        {
          id: '4',
          name: '比赛管理',
          icon: 'el-icon-s-flag',
          children: [
            {
              id: '4-1',
              name: '比赛列表',
              path: 'contestList'
            }
          ]
        }
        // {
        //   id: '5',
        //   name: '消息管理',
        //   icon: 'el-icon-s-comment',
        //   children: [
        //     {
        //       id: '5-1',
        //       name: '消息列表',
        //       path: ''
        //     }
        //   ]
        // }
      ],
      // 获动的页面
      activepath: '',
      // 判断是否是背景色
      isbackground: false
    }
  },
  created () {
    this.activepath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    // 是否折叠
    Fold () {
      this.boolean = !this.boolean
    },
    // 退出
    exit () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 点击哪个菜单
    submenu (path) {
      window.sessionStorage.setItem('activePath', path)
      this.activepath = path
      this.isbackground = true
    }
  }
}
</script>
<style lang="less" scoped>
.el-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #131e1e;
  img{
    height: 100%;
    background: #fff;
  }
    > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
      color:#fff;
    }
  }
}
.el-aside {
  background: #000;
  .el-menu{
    border-right: none;
  }
}
.el-main {
  background: #eaedf1;
}
.topButton{
  font-size:10px;
  line-height: 24px;
  text-align: center;
  cursor: pointer;
  background:#000;
  color: #fff;
}
.buttona{
  width: 90px;
  height: 45px;
}
.home-container{
  height: 100%;
}
.is-active{
  background: #fff !important;
}
</style>
