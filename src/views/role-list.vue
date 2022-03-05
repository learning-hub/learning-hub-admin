<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片区域 -->
        <el-card>
            <el-col><roleListTabel></roleListTabel></el-col>
        </el-card>
    </div>
</template>

<script>
import roleListTabel from '_Component/role-list/role-list-tabel.vue'
export default {
  components: {
    roleListTabel
  }
}
</script>
