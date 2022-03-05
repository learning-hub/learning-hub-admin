<template>
    <div>
         <!-- 面包屑 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>题库管理</el-breadcrumb-item>
            <el-breadcrumb-item>题库列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片区域 -->
        <el-card>
            <problemListTabel></problemListTabel>
        </el-card>
    </div>
</template>

<script>
import problemListTabel from '_Component/problem-list/problem-list-tabel.vue'
export default {
  components: {
    problemListTabel
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="less" scoped>

</style>
