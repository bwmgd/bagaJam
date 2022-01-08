<template>
  <div class="container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="文本推送" name="first"></el-tab-pane>
      <el-tab-pane label="标题+内容" name="second"></el-tab-pane>
      <el-tab-pane label="角色管理" name="third"></el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth"></el-tab-pane>
      <TextPusher></TextPusher>
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
