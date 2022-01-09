import axios from 'axios'
import {Loading} from 'element-ui'
import Qs from 'qs'

export const state = () => ({
  // 这里是全局数据保存的地方
  pusher_map: [
    {name: 'TextPusher', label: '文本消息', url: '/text'},
    {name: 'TextCardPusher', label: '文本卡片消息', url: '/text_card'},
    {name: 'MpNewsPusher', label: '图文消息', url: '/text'},
    {name: 'VideoPusher', label: '视频消息', url: '/video'},
    {name: 'ImagePusher', label: '图片消息', url: '/image'},
    {name: 'FilePusher', label: '文件消息', url: '/file'}
  ],
})

export const actions = {
  get_pusher_map(context, index) {
    return context.state.pusher_map[index]
  },
  async send_message(context, [target, url, data, users]) {
    let loading = Loading.service({target: target.$el})
    if (users.length !== 0)
      data.user = users.join('|')
    let message, type = 'error'
    axios({
      method: 'post',
      url: url,
      data: Qs.stringify(data)
    })
      .then((res) => {
        console.log('msg', res)
        const data = res.data
        if (data['errcode'] === 0) {
          message = '发送成功'
          type = 'success'
          target.clear()
        }
        else if (data['errcode'] === -1) {
          message = '系统繁忙,请稍后重试'
          type = 'warning'
        }
        else {
          message = '系统出错:' + data['errmsg'].split(',')[0] + '\n错误代码:' + data['errcode']
        }
      })
      .catch((err) => {
        if (err.response) message = '服务器响应错误:' + err.response.data + '\n错误代码:' + err.response.status
        else if (err.request) message = '服务器未响应:' + err.request
        else message = '未知错误' + err.message
      })
      .finally(() => {
        target.$message({
          showClose: true,
          message: message,
          type: type
        })
        loading.close()
      })
  }
}
