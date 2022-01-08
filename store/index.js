import axios from 'axios'
import {Loading} from 'element-ui'

export const state = () => ({
  // 这里是全局数据保存的地方
  pusher: {
    user: '@all',
    data: {}
  }
})

export const mutations = {
  set_user(state, user) {
    state.pusher.user = user
  },
  getTextData(state, data) {
    state.pusher.data = {
      'msgtype': 'text',
      'text': {
        'content': data
      }
    }
  },
  getTextCardData(state, data, title, url) {
    state.pusher.data = {
      'msgtype': 'textcard',
      'textcard': {
        'title': title,
        'description': data,
        'url': url,
      }
    }
  }
}

export const actions = {
  get_data(context) {
    return {
      ...{
        'touser': context.state.pusher.user,
        'toparty': '@all',
        'totag': '@all',
        'agentid': 1000007,
        'safe': 0,
        'enable_id_trans': 0,
        'enable_duplicate_check': 0,
        'duplicate_check_interval': 1800
      }, ...context.state.pusher.data
    }
  },
  async get_access_token(context) {
    const urls = '/api/token'
    return axios.get(urls)
  },

  async send_message(context, target) {
    let loading = Loading.service({target: target.$el})
    context.dispatch('get_access_token').then((res) => {
      console.log('token', res)
      const token = res.data
      context.dispatch('get_data').then((data) => {
        console.log('data', data)
        const req_urls = '/api/message/send?access_token=' + token
        axios.post(req_urls, data).then((res) => {
          console.log('msg', res)
          const data = res.data
          loading.close()
          let message, type
          if (data['errcode'] === 0) {
            message = '发送成功'
            type = 'success'
            target.$refs['form'].resetFields()
            target.$refs['users'].clear()
          }
          else if (data['errcode'] === -1) {
            message = '系统繁忙,请稍后重试'
            type = 'warning'
          }
          else {
            message = '系统出错:' + data['errmsg'].split(',')[0] + '\n错误代码:' + data['errcode']
            type = 'error'
          }
          target.$message({
            showClose: true,
            message: message,
            type: type
          })
        })
      })
    })
  },


  async get_media_id(context, path, file_type) {
    return context.dispatch('get_access_token').then((res) => {
      const token = res.data
      const req_urls = '/api/media/upload?access_token=' + token + '&type=' + file_type
      const file = {'media': open(path, 'rb')} //TODO
      return axios.post(req_urls, data)//return res.data['media_id']
    })
  },

  async get_department_users(context) {
    return context.dispatch('get_access_token').then((res) => {
        console.log('token', res)
      const token = res.data
        console.log('the_token', token)
        const req_urls = '/api/user/simplelist?' +
          'access_token=' + token + '&department_id=1&fetch_child=1'
        console.log(req_urls)
        return axios.post(req_urls)
      }
    )
  },
}
