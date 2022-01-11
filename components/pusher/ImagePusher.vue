<template>
  <div>
    <el-upload ref="upload" action="" list-type="picture-card" name="files" :file-list="fileList" multiple
               :auto-upload="false" :on-preview="previewPicture" :on-remove="removePicture" :on-change="changePicture"
               :accept="this.$store.state.IMAGE_TYPE.join(',')" :http-request="httpRequest" :on-success="uploadSuccess"
               :class="{disabled:uploadDisabled}">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-image-viewer v-if="showViewer" :on-close="closeViewer" :url-list="urlList" :initial-index="initialIndex"/>
  </div>
</template>

<script>
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'

export default {
  name: 'ImagePusher',
  components: {ElImageViewer},
  data() {
    return {
      dialogImageUrl: '',
      showViewer: false,
      fileList: [],
      urlList: [],
      initialIndex: 0,
      target: undefined,
      api: '',
      users: [],
      limit: 9,
      uploadDisabled: false,
      picCount: 0,
      uploadedFiles: [],
    }
  },
  watch: {
    picCount(count) {
      console.log('count', count, 'list', this.fileList.length)
      this.uploadDisabled = count >= this.limit
    }
  },
  methods: {
    closeViewer() {
      this.showViewer = false
    },
    previewPicture(file) {
      this.initialIndex = 0
      this.fileList.forEach((item, index) => {
        if (file.name === item.name)
          this.initialIndex = index
      })
      this.urlList = this.fileList.map((x) => x.url)
      this.showViewer = true
    },
    beforeUploadPicture(file) {
      const file_type = file.name.substring(file.name.lastIndexOf('.')).toLowerCase()
      const isIMAGE = this.$store.state.IMAGE_TYPE.indexOf(file_type) !== -1
      const isLt10M = file.size / 1024 / 1024 / 10 < 1
      const map = this.fileList.map((x) => x.name)
      const index = this.uploadedFiles.map((x) => x.file.name).indexOf(file.name)
      let isFName = true
      let uploaded = 1
      if (index === -1)
        isFName = map.indexOf(file.name) === map.length - 1
      else {
        if (this.uploadedFiles[index].flag) {
          uploaded = -1
          this.uploadedFiles[index].flag = false
        }
        else
          isFName = false
      }
      const isLT9F = (this.picCount + uploaded) <= this.limit
      if (!isIMAGE)
        this.$message.error('只能上传jpg/png文件!')
      if (!isLt10M)
        this.$message.error('上传文件大小不能超过 10MB!')
      if (!isFName)
        this.$message.error('不能上传重名文件')
      if (!isLT9F)
        this.$message.error('最多上传' + this.limit + '张图片')
      return isIMAGE && isLt10M && isFName && isLT9F
    },
    changePicture(file, fileList) {
      this.fileList = fileList
      console.log('change', this.fileList)
      if (this.beforeUploadPicture(file))
        this.picCount++
      else
        fileList.splice(-1, 1)
    },
    removeFiles(file) {
      this.fileList = this.fileList.filter((item) => {
        if (item.name === file.name) {
          this.picCount--
          return false
        }
        return true
      })
    },
    removePicture(file) {
      this.removeFiles(file)
      this.uploadedFiles = this.uploadedFiles.filter((item) => {
        return item.file.name !== file.name
      })
    },
    send(target, api, users) {
      this.target = target
      this.api = api
      this.users = users
      this.$refs.upload.submit()
    },
    httpRequest(params) {
      const data = {file: params.file}
      this.$store.dispatch('send_message', [this.target, this.api, data, this.users, params.onSuccess])
    },
    uploadSuccess(response, file) {
      this.removeFiles(file)
      this.uploadedFiles.push({file: file, flag: true})
    },
    clear() {
      this.fileList = []
      this.uploadedFiles = []
      this.picCount = 0
      this.$refs.upload.clearFiles()
    }
  }
}
</script>

<style>
.disabled .el-upload--picture-card {
  display: none !important;
}
</style>
