<template>
  <div class="container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="文本推送" name="first">
        <TextPusher></TextPusher>
      </el-tab-pane>
      <el-tab-pane label="标题+内容" name="second">标题+内容</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TextPusher from '~/components/TextPusher'

export default {
  name: 'bagajam',
  components: {TextPusher},
  data() {
    return {
      activeName: 'first'
    }
  },
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding-top: 80px;
  text-align: center;
}
</style>
