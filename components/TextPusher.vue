<template>
  <el-card class="box-card">
    <el-row :gutter="20">
      <el-col :span="16">
        <el-select v-model="user" multiple filterable placeholder="请选择用户标签,留空为全体" class="user">
          <el-option v-for="i in options" :key="i['userid']" :value="i['userid']"></el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" @click="send">发送</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-input v-model="msg" placeholder="请输入要推送的内容" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
    </el-row>

  </el-card>
</template>

<script>

export default {
  name: 'TextPusher',
  data() {
    return {
      msg: '',
      user: [],
      options: [],
      pusher: this.$store.state.WXPusher.pusher
    }
  },
  methods: {
    send() {
      if (!this.msg || this.msg.trim() === '') {
        this.$message({
          showClose: true,
          message: '内容不能为空',
          type: 'warning'
        })
        return
      }
      if (this.user.length !== 0)
        this.$store.commit('WXPusher/set_user', this.user.join('|'))
      this.$store.commit('WXPusher/getTextData', this.msg.trim())
      this.$store.dispatch('WXPusher/send_message', this)
    }
  },
  async created() {
    this.options = await this.$store.dispatch('WXPusher/get_department_users')
  }
}
</script>

<style scoped>
.user {
  margin-bottom: 20px;
}
</style>
