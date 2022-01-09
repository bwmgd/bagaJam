<template>
  <el-form ref="form" :rules="rules" :model="ruleForm">
    <el-form-item prop="title">
      <el-input placeholder="请输入标题" v-model="ruleForm.title"></el-input>
    </el-form-item>
    <el-form-item prop="url">
      <el-input placeholder="请输入网址,留空则为八嘎酱主页" v-model="ruleForm.url">
        <el-select slot="prepend" v-model="protocol" class="protocol">
          <el-option value="http://"></el-option>
          <el-option value="https://"></el-option>
        </el-select>
      </el-input>
    </el-form-item>
    <el-form-item prop="msgs">
      <el-input placeholder="请输入卡片描述" type="textarea" :autosize="{ minRows: 2, maxRows: 6}"
                v-model="ruleForm.msgs"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'TextCardPusher',
  data() {
    let validateMsg = (rule, value, callback) => {
      if (!value || value.trim() === '') {
        return callback(new Error('内容不能为空'))
      }
      return callback()
    }
    let validateURL = (rule, value, callback) => {
      const url_regex =
        /([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
      if (!value || value.trim() === '') {
        return callback()
      }
      if (!url_regex.test(value))
        return callback(new Error('网址格式错误'))
      return callback
    }
    return {
      ruleForm: {
        msgs: '',
        title: '',
        url: ''
      },
      rules: {
        msgs: [{validator: validateMsg, trigger: 'blur'}],
        url: [{validator: validateURL, trigger: 'blur'}],
        title: [{validator: validateMsg, trigger: 'blur'}],
      },
      protocol: 'http://'
    }
  },
  methods: {
    getData() {
      let url = 'https://bwmgd.ml'
      if (this.ruleForm.url && this.ruleForm.url.trim() !== '') {
        url = this.protocol + this.ruleForm.url.trim()
      }
      let data = {
        'message': this.ruleForm.msgs.trim(),
        'title': this.ruleForm.title.trim(),
        'url': url
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
.protocol {
  width: 8em;
}
</style>
