import axios from 'axios'
import {Loading} from 'element-ui'

export const state = () => ({
  // 这里是全局数据保存的地方
  pusher: {
    base_url: '/api/gettoken?',
    req_url: '/api/message/send?access_token=',
    corpid: 'wwa6e28ccb97409686',  // 企业ID
    // corpsecret : 'O-kTjsdKeP5ldE0ojjWn3Km5FvyrP4NgdtY9ub4cK0s',  // 企业微信应用的Secret
    // agentid : 1000004,  # 企业微信应用的AgentId
    corpsecret: 'PUWjJ-p2d_sI5PcvYGMpLvEWreDpJYQ2sHVqRt_l4eU',
    agentid: 1000007,
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
        'agentid': context.state.pusher.agentid,
        'safe': 0,
        'enable_id_trans': 0,
        'enable_duplicate_check': 0,
        'duplicate_check_interval': 1800
      }, ...context.state.pusher.data
    }
  },
  async get_access_token(context) {
    const urls = context.state.pusher.base_url + 'corpid=' + context.state.pusher.corpid + '&corpsecret=' + context.state.pusher.corpsecret
    const resp = await axios.get(urls)
    return resp.data['access_token']
  },

  async send_message(context, target) {
    let loading = Loading.service({target: target.$el})
    context.dispatch('get_data').then(async (data) => {
      const req_urls = context.state.pusher.req_url + await context.dispatch('get_access_token')
      await axios.post(req_urls, data).then((res) => {
        const data = res.data
        console.log(data)
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
  },


  async get_media_id(context, path, file_type) {
    const req_url = '/api/media/upload?access_token='
    const req_urls = req_url + await context.dispatch('get_access_token') + '&type=' + file_type
    const file = {'media': open(path, 'rb')} //TODO
    const res = await axios.post(req_urls, data)
    return res.data['media_id']
  },

  async get_department_users(context) {
    const req_urls = '/api/user/simplelist?' +
      'access_token=' + await context.dispatch('get_access_token') + '&department_id=1&fetch_child=1'
    const res = await axios.post(req_urls)
    return res.data['userlist']
  },
}