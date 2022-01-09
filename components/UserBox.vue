<template>
  <el-row :gutter="20" class="user">
    <el-col :span="16">
      <el-select v-model="users" multiple filterable placeholder="请选择用户标签,留空为全体">
        <el-option v-for="i in options" :key="i" :value="i"></el-option>
      </el-select>
    </el-col>
    <el-col :span="8">
      <el-button type="primary" @click="$emit('send',users)">发送</el-button>
    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios'

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
    axios.get('/api/department').then((res) => {
      console.log('userlist', res)
      return this.options = res.data
    })
  }
}
</script>

<style scoped>

</style>
