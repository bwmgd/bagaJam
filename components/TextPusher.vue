<template>
  <el-form ref="form" :rules="rules" :model="ruleForm">
    <el-card class="box-card">
      <el-form-item prop="users">
        <UserBox @send="send" ref="users"></UserBox>
      </el-form-item>
      <el-form-item prop="msgs">
        <el-input placeholder="请输入要推送的内容" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                  v-model="ruleForm.msgs"></el-input>
      </el-form-item>
    </el-card>
  </el-form>
</template>

<script>

import UserBox from '@/components/UserBox'

export default {
  name: 'TextPusher',
  components: {UserBox},
  data() {
    let validateMsg = (rule, value, callback) => {
      if (!value || value.trim() === '') {
        return callback(new Error('内容不能为空'))
      }
      return callback()
    }
    return {
      msg: '',
      options: [],
      ruleForm: {
        msgs: '',
      },
      rules: {
        msgs: [{validator: validateMsg, trigger: 'blur'}]
      },
    }
  },
  methods: {
    send(users) {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let data = {
            'message': this.ruleForm.msgs.trim()
          }
          this.$store.dispatch('send_message', [this, '/api/text', data, users])
        }
        else {
          console.log('error submit!!')
          return false
        }
      })
    },
  }
}
</script>

<style scoped>

</style>
