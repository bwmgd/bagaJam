import axios from 'axios'
import {Loading} from 'element-ui'

export default class WXPusher {
  constructor() {
    console.log('init')
    this.base_url = '/api/gettoken?'
    this.req_url = '/api/message/send?access_token='
    this.corpid = 'wwa6e28ccb97409686'  // 企业ID
    // this.corpsecret = 'O-kTjsdKeP5ldE0ojjWn3Km5FvyrP4NgdtY9ub4cK0s'  // 企业微信应用的Secret
    // this.agentid = 1000004  # 企业微信应用的AgentId
    this.corpsecret = 'PUWjJ-p2d_sI5PcvYGMpLvEWreDpJYQ2sHVqRt_l4eU'
    this.agentid = 1000007
    this._user = '@all'
    this._data = {}
  }


  set user(value) {
    this._user = value
  }

  set data(value) {
    this._data = value
  }

  async get_access_token() {
    const urls = this.base_url + 'corpid=' + this.corpid + '&corpsecret=' + this.corpsecret
    const resp = await axios.get(urls)
    return resp.data['access_token']
  }

  async send_message(target) {
    let loading = Loading.service({target: target.$el})
    const data = this.get_data()
    const req_urls = this.req_url + await this.get_access_token()
    await axios.post(req_urls, data).then((res) => {
      const data = res.data
      console.log(data)
      loading.close()
      let message
      let type
      if (data['errcode'] === 0) {
        message = '发送成功'
        type = 'success'
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
  }

  get_data() {
    return {
      ...{
        'touser': this._user,
        'toparty': '@all',
        'totag': '@all',
        'msgtype': 'text',
        'agentid': this.agentid,
        'safe': 0,
        'enable_id_trans': 0,
        'enable_duplicate_check': 0,
        'duplicate_check_interval': 1800
      }, ...this._data
    }
  }

  async get_media_id(path, file_type) {
    const req_url = '/api/media/upload?access_token='
    const req_urls = req_url + await this.get_access_token() + '&type=' + file_type
    const file = {'media': open(path, 'rb')} //TODO
    const res = await axios.post(req_urls, data)
    console.log(res)
    return res.data['media_id']
  }

  async get_department_users() {

    const req_urls = '/api/user/simplelist?' +
      'access_token=' + await this.get_access_token() + '&department_id=1&fetch_child=1'
    const res = await axios.post(req_urls)
    return res.data['userlist']
  }

  getTextData(data) {
    this.data = {
      'text': {
        'content': data
      }
    }
  }
}
