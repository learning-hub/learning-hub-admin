<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>比赛管理</el-breadcrumb-item>
      <el-breadcrumb-item>比赛列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <el-alert :title="'当前搜索框只能搜索'+waringdata" type="warning"> </el-alert>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="单人赛" name="first">
            <singleContestTable></singleContestTable>
        </el-tab-pane>
        <el-tab-pane label="团队赛" name="second">
            <teamContestTable></teamContestTable>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import singleContestTable from '_Component/contest-list/single-contest-table.vue'
import teamContestTable from '_Component/contest-list/team-contest-table.vue'
export default {
  components: {
    singleContestTable,
    teamContestTable
  },
  data () {
    return {
      // 在哪个页面
      activeName: 'first',
      // 警示提示数据
      waringdata: '单人赛'
    }
  },
  methods: {
    handleClick (tab) {
      this.waringdata = tab.label
    }
  }
}
</script>

<style lang="less" scoped>
.el-tabs{
    margin-top: 20px;
}
</style>
