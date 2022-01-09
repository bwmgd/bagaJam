<template>
  <el-card class="box-card">
    <el-row type="flex" justify="space-between" class="user">
      <el-col :span="16">
        <el-select v-model="users" multiple filterable placeholder="请选择用户标签,留空为全体" class="select">
          <el-option v-for="i in options" :key="i" :value="i"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="send">发送</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="info" @click="clear">清空</el-button>
      </el-col>
    </el-row>
    <keep-alive>
      <component :is="select_pusher['name']" :ref="select_pusher['name']"></component>
    </keep-alive>
    <!--    <component is="TextPusher" ref="TextPusher"></component>-->
  </el-card>
</template>

<script>
import axios from 'axios'
import TextPusher from '@/components/pusher/TextPusher'
import TextCardPusher from '@/components/pusher/TextCardPusher'
import MpNewsPusher from '@/components/pusher/MpNewsPusher'
import VideoPusher from '@/components/pusher/VideoPusher'
import ImagePusher from '@/components/pusher/ImagePusher'
import FilePusher from '@/components/pusher/FilePusher'

export default {
  name: 'PusherCard',
  components: {TextPusher, TextCardPusher, MpNewsPusher, VideoPusher, ImagePusher, FilePusher},
  props: ['select_pusher'],
  data() {
    return {
      options: [],
      users: [],
    }
  },
  methods: {
    send() {
      const data = this.$refs[this.select_pusher['name']].getData()
      this.$store.dispatch('send_message', [
        this, '/api' + this.select_pusher['url'], data, this.users
      ])
    },
    clear() {
      this.users = []
      this.$refs[this.select_pusher['name']].$refs['form'].resetFields()
    }
  },
  async created() {
    axios.get('/api/department').then((res) => {
      return this.options = res.data
    })
  }
}
</script>

<style scoped>
.box-card {
  margin: 0 40px 0 40px;
}

.user {
  margin-bottom: 3vh;
}

.select {
  display: flex;
  margin-right: 20px;
}
</style>
