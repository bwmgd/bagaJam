<template>
  <el-form ref="form" :rules="rules" :model="ruleForm">
    <el-form-item prop="msgs">
      <el-input placeholder="请输入要推送的内容" type="textarea" :autosize="{ minRows: 2, maxRows: 6}"
                v-model="ruleForm.msgs"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'TextPusher',
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
    getData() {
      let data = {
        'message': this.ruleForm.msgs.trim()
      }
      this.$refs['form'].validate((valid) => {
        if (!valid) {
          data = false
          console.log('error submit!!')
          return false
        }
      })
      return data
    },
  }
}
</script>

<style scoped>

</style>
