<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片区域 -->
        <el-card>
            <el-col><userTable></userTable></el-col>
        </el-card>

    </div>
</template>
<script>
import userTable from '_Component/user-list/user-tabel'
export default {
  components: {
    userTable
  }
}
</script>
<style lang="less" scoped>

</style>
