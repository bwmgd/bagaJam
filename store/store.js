import WXPusher from '@/store/modules/WXPusher'

export const state = () => ({
  // 这里是全局数据保存的地方
  pusher: new WXPusher()
})
export const mutations = {}
