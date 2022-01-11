<template>
  <div class="container">
    <el-tabs v-model="activeIndex" @tab-click="tabClick">
      <el-tab-pane v-for="i in $store.state.pusher_map" :label="i['label']" :key="i['name']"></el-tab-pane>
      <PusherCard :select_pusher="select_pusher"></PusherCard>
    </el-tabs>
  </div>
</template>

<script>

import PusherCard from '@/components/PushCard'

export default {
  name: 'bagajam',
  components: {PusherCard},
  data() {
    return {
      activeIndex: 0,
      select_pusher: {}
    }
  },
  created() {
    this.$store.dispatch('get_pusher_map', this.activeIndex).then((res) => {
      this.select_pusher = res
    })
  },
  methods: {
    tabClick() {
      this.$store.dispatch('get_pusher_map', this.activeIndex).then((res) => {
        this.select_pusher = res
      })
    },
  }
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
