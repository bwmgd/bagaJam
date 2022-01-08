<template>
  <el-row :gutter="20" class="user">
    <el-col :span="16">
      <el-select v-model="users" multiple filterable placeholder="请选择用户标签,留空为全体">
        <el-option v-for="i in options" :key="i['userid']" :value="i['userid']"></el-option>
      </el-select>
    </el-col>
    <el-col :span="8">
      <el-button type="primary" @click="$emit('send',users)">发送</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'UserBox',
  data() {
    return {
      options: [],
      users: [],
    }
  },
  methods: {
    clear() {
      this.users = []
    }
  },
  async created() {
    this.$store.dispatch('get_department_users').then((res) => {
      console.log('userlist', res)
      return this.options = res.data['userlist']
    })
  }
}
</script>

<style scoped>

</style>
