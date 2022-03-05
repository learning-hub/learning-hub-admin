<template>
<!-- 用户组页面 -->
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户组列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片区域 -->
        <el-card>
            <el-col><userGroupTabel></userGroupTabel></el-col>
        </el-card>
    </div>
</template>
<script>
import userGroupTabel from '_Component/user-group-list/user-group-tabel'
export default {
  components: {
    userGroupTabel
  }
}
</script>
